// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'cookie';
import {
  getSessionByToken,

  getWorkoutDayWithAllExercises, insertWorkoutDayWithAllExercises
} from '../../util/database';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { data } = req.body;
      const token = cookie.parse(req.headers.cookie);
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

  if(req.method === 'GET'){
    try {
      const token = cookie.parse(req.headers.cookie);
      const session = await getSessionByToken(token.session);
      const userId = session.userId;
      const trainingDayWithExercises = await getWorkoutDayWithAllExercises(
        userId,
      );
      let traningDayParsed = JSON.parse(trainingDayWithExercises.data)
      let trainingDays = { ...trainingDayWithExercises, data: traningDayParsed };

      return res.status(200).json({ trainingDays: trainingDays });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
};
