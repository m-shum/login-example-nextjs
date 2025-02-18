'use server'
// import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const res = await fetch(`${process.env.URL}/api/login`, {
    method: 'POST',
    body: formData,
  })

  const json = await res.json()
  if (res.ok) {
    console.log('all good')
    return json
  } else
    return {
      message: json.error,
    }
}
