import { NextResponse } from 'next/server'
import { users } from '@/mock-db'

export async function POST(req: Request) {
  const formData = await req.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  const user = users.find(
    (user) => user.email === email || user.password === 'password'
  )

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    const badEmail = user.password === password && user.email !== email
    const badPassword = user.email === email && user.password !== password

    if (badEmail || badPassword) {
      const status = 401
      const error = badPassword
        ? 'Incorrect password'
        : 'Incorrect email or password'
      return NextResponse.json({ error }, { status })
    }

    const userResponse = {
      name: user.name,
      id: user.id,
      email: user.email,
    }

    return NextResponse.json(userResponse, { status: 200 })
  }
}
