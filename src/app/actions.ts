'use server'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const res = await fetch(`${process.env.URL}/api/login`, {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()
  if (res.ok) {
    redirect(`/user/${data.id}`)
    // return data
  } else
    return {
      message: data.error,
      status: res.status,
    }
}
