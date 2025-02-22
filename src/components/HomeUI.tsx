'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next/client'

export default function HomeUI({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const sessionCookie = getCookie('rememberUser') || getCookie('sessionUser')

  useEffect(() => {
    if (sessionCookie) {
      router.push(`/users/${sessionCookie}`)
    }
  }, [router, sessionCookie])

  return <>{children}</>
}
