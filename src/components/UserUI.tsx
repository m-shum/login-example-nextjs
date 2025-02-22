'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next/client'
import { TUser } from '@/types'

export default function UserUI({ user }: { user: TUser | undefined }) {
  const router = useRouter()
  const sessionCookie = getCookie('rememberUser') || getCookie('sessionUser')

  useEffect(() => {
    if (!sessionCookie) {
      router.push('/')
    }
  }, [router, sessionCookie])

  return <h1>Hello, {user?.name}!</h1>
}
