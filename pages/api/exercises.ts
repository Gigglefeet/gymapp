// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getSessionByToken,
  getWorkoutDayWithAllExercises,
  insertWorkoutDayWithAllExercises,
} from '../../util/database';

export default async function exercises(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { data } = req.body;
      const token = cookie.parse(req.headers.cookie as string);
      const session = await getSessionByToken(token.session);
      const userId = session.userId;
      const dataStringified = JSON.stringify(data);
      const trainingDay = await insertWorkoutDayWithAllExercises(
        userId,
        dataStringified,
      );
      return res.status(200).json({ trainingDay: trainingDay });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  if (req.method === 'GET') {
    try {
      const token = cookie.parse(req.headers.cookie as string);
      const session = await getSessionByToken(token.session);
      const userId = session.userId;
      const trainingDayWithExercises = await getWorkoutDayWithAllExercises(
        userId,
      );
      const trainingDayParsed = JSON.parse(trainingDayWithExercises.data);
      const trainingDays = {
        ...trainingDayWithExercises,
        data: trainingDayParsed,
      };

      return res.status(200).json({ trainingDays: trainingDays });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
