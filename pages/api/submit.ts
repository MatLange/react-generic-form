import type { NextApiRequest, NextApiResponse } from 'next'
 
async function createItem(data: any) {
    return "4711";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body
  const id = await createItem(data)
  res.status(200).json({ id })
}