// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSessionByToken, insertWorkoutDay } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // need userId
    // const cookies = req.headers.cookie;
    const { day, description } = req.body;
    // const token = cookie.parse(cookies ? cookies : '');
    const token = cookie.parse(req.headers.cookie || '');
    const session = await getSessionByToken(token.session);
    const userId = session.userId;
    const workoutDay = await insertWorkoutDay(day, description, userId);

    if (!workoutDay) {
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ workoutDay });
  }
}
