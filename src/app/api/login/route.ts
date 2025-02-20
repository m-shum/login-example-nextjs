import { NextResponse } from 'next/server'
import { users } from '@/users'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: Request): Promise<void | Response> {
  const formData = await req.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const rememberUser = formData.get('rememberUser')

  const user = users.find(
    (user) => user.email === email || user.password === 'password'
  )

  let response = new NextResponse()

  if (!user) {
    response = NextResponse.json({ error: 'User not found' }, { status: 404 })
  } else {
    const badEmail = user.password === password && user.email !== email
    const badPassword = user.email === email && user.password !== password

    if (badEmail || badPassword) {
      const status = 401
      const error = badPassword
        ? 'Incorrect password'
        : 'Incorrect email or password'
      response = NextResponse.json({ error }, { status })
    }

    const userResponse = {
      name: user.name,
      id: user.id,
      email: user.email,
      rememberUser,
    }

    response = NextResponse.json(userResponse, { status: 200 })
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response)
    }, 1500)
  })
}
