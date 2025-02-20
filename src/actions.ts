'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import type { TFormState } from '@/types'

export async function login(
  prevState: TFormState,
  formData: FormData
): Promise<TFormState> {
  const res = await fetch(`${process.env.URL}/api/login`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  const data = await res.json()
  if (res.ok) {
    const cookieStore = await cookies()

    cookieStore.set({
      name: 'sessionUser',
      maxAge: 43200,
      value: encodeURIComponent(data.id),
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })

    if (data.rememberUser === 'on') {
      cookieStore.set({
        name: 'rememberUser',
        maxAge: 86400,
        value: encodeURIComponent(data.id),
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
    }
    redirect(`/users/${data.id}`)
  } else
    return {
      message: data.error,
      status: res.status,
    }
}

export async function getSessionCookie() {
  const cookieStore = await cookies()
  const sessionCookie =
    cookieStore.get('rememberUser') || cookieStore.get('sessionUser')

  return sessionCookie
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete('rememberUser')
  cookieStore.delete('sessionUser')
}
