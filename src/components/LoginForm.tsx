'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie } from 'cookies-next/client'
import styles from './LoginForm.module.scss'
import { users } from '@/users'
import type { TFormState } from '@/types'

export default function LoginForm() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [formState, setFormState] = useState<TFormState>()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)

    const formData = new FormData(e.currentTarget)

    const email = formData.get('email')
    const password = formData.get('password')
    const rememberUser = formData.get('rememberUser')

    const user = users.find(
      (user) => user.email === email || user.password === 'password'
    )

    const formState = { message: 'User not found', status: 404 }

    if (!user) {
      setPending(false)
      setFormState({ message: 'User not found', status: 404 })
      return
    } else {
      const badEmail = user.email !== email
      const badPassword = user.email === email && user.password !== password

      if (badEmail) {
        formState.message = 'Incorrect email or password'
      }
      if (badPassword) {
        formState.message = 'Incorrect password'
      }

      if (badEmail || badPassword) {
        setPending(false)
        formState.status = 401
        setFormState(formState)
        return
      }

      setCookie('sessionUser', user.id, {
        maxAge: 43200,
      })

      if (rememberUser) {
        setCookie('rememberUser', user.id, {
          maxAge: 86400,
        })
      }

      setFormState({ message: null, status: 200 })

      return new Promise((resolve) => {
        setTimeout(() => {
          setPending(false)
          router.push(`/users/${user.id}`)
          resolve(user)
        }, 1500)
      })
    }
  }

  const emailFail = useRef(0)
  const passwordFail = useRef(0)
  const $signupLink = useRef<HTMLAnchorElement | null>(null)
  const $forgotPasswordLink = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (formState?.status === 404) {
      emailFail.current++
      passwordFail.current = 0
      if (emailFail.current > 2) $signupLink.current?.focus()
    }
    if (
      formState?.status === 401 &&
      formState?.message === 'Incorrect password'
    ) {
      emailFail.current = 0
      passwordFail.current++
      if (passwordFail.current > 2) $forgotPasswordLink.current?.focus()
    }
  }, [formState])

  return (
    <div className={styles.loginForm}>
      <h1>Hi there!</h1>
      <p>Log in to continue</p>
      <form onSubmit={handleLogin}>
        <p aria-live="polite" className={styles.errorMessage}>
          <span>{formState?.message}</span>
        </p>
        <label
          className={`${(styles.labelEmail, 'visually-hidden')}`}
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={styles.inputEmail}
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          required
          aria-required="true"
        />
        <label
          className={`${(styles.labelPassword, 'visually-hidden')}`}
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={styles.inputPassword}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          required
          aria-required="true"
        />
        <div className={styles.row}>
          <label className={styles.checkbox} htmlFor="rememberUser">
            <input type="checkbox" name="rememberUser" id="rememberUser" />
            <span>Remember me</span>
          </label>
          <a
            href="#"
            className={styles.forgotPasswordLink}
            ref={$forgotPasswordLink}
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          disabled={pending}
          className={`${styles.submitButton} ${
            pending ? styles.submitButtonPending : ''
          }`}
        >
          <div
            style={{
              transition: 'opacity 0.5s ease-in-out',
              opacity: pending ? 1 : 0,
            }}
          >
            {pending && (
              <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 11, 1 A 10,10 0 1,0 11,21 A 10,10 0 1,0 11,1"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            )}
          </div>
          <div
            style={{
              transition: 'opacity 0.5s ease-in-out',
              opacity: pending ? 0 : 1,
            }}
          >
            {!pending && <span>Sign In</span>}
          </div>
        </button>
      </form>
      <a href="#" className={styles.signup} ref={$signupLink}>
        Don&apos;t have an account? <span>Sign up</span>
      </a>
    </div>
  )
}
