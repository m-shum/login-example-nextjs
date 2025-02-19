'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function login(prevState: any, formData: FormData) {
  const res = await fetch(`${process.env.URL}/api/login`, {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()
  if (res.ok) {
    const cookieStore = await cookies()

    cookieStore.set({
      name: 'sessionUser',
      value: encodeURIComponent(data.id),
      sameSite: 'strict',
      maxAge: 43200,
      httpOnly: true,
      // secure:true <-- would be turned on if this was running on https
    })

    if (data.rememberUser === 'on') {
      cookieStore.set({
        name: 'rememberUser',
        value: encodeURIComponent(data.id),
        sameSite: 'strict',
        maxAge: 86400,
        httpOnly: true,
        // secure:true <-- would be turned on if this was running on https
      })
    }
    redirect(`/users/${data.id}`)
    return { message: 'Success', status: 200, data }
  } else
    return {
      message: data.error,
      status: res.status,
    }
}
