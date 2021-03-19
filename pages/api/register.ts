import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  console.log('registration api route'username, password);
  res.send({ user: {} });
}
