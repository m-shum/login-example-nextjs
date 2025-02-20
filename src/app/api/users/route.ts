import { NextResponse, NextRequest } from 'next/server'
import { users } from '@/users'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')

  const user = users.find(({ id }) => id === userId)

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    const userResponse = {
      name: user.name,
      id: user.id,
      email: user.email,
    }

    return NextResponse.json(userResponse, { status: 200 })
  }
}
