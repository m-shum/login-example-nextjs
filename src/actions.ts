'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import type { TFormState } from '@/types'

export async function login(
  prevState: TFormState,
  formData: FormData
): Promise<TFormState> {
  /*
  "Why is he adding all this redundant formData logic", you may ask. 
  Well, it's because while Next's docs indicate you can just use request.formData() to read it in an api route,
  the reality is that you can't – it won't get parsed (see: https://github.com/vercel/next.js/issues/73220, https://github.com/nodejs/undici/issues/2736, https://github.com/vercel/next.js/discussions/53827)
  For the sake of simplicity (and my time), I'm just sending it as a plain object to the api route handler.
  Is this the safest or best way? No. Would I do this in prod? No. But I probably wouldn't use this version of Next.js in prod either.
  */

  const email = formData.get('email')
  const password = formData.get('password')
  const rememberUser = formData.get('rememberUser')

  const payload = JSON.stringify({ email, password, rememberUser })

  const res = await fetch(`${process.env.URL}/api/login`, {
    method: 'POST',
    body: payload,
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
