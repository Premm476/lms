import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  return res.status(200).json(session.user)
}
