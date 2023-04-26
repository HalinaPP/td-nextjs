import { ISocial } from '@/types';
import { socials } from './data/socials';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISocial[]>
) {
  if (req.method === 'GET') {
    res.status(200).json(socials);
  }
}
