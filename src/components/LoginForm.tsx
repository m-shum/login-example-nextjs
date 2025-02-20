'use client'

import { useActionState, useEffect, useRef } from 'react'
import { login } from '@/actions'
import styles from './LoginForm.module.scss'
import type { TFormState } from '@/types'

const initialState: TFormState = {
  message: '',
}

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

  const emailFail = useRef(0)
  const passwordFail = useRef(0)
  const $signupLink = useRef<HTMLAnchorElement | null>(null)
  const $forgotPasswordLink = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (state.status === 404) {
      emailFail.current++
      passwordFail.current = 0
      if (emailFail.current > 2) $signupLink.current?.focus()
    }
    if (state.status === 401 && state.message === 'Incorrect password') {
      emailFail.current = 0
      passwordFail.current++
      if (passwordFail.current > 2) $forgotPasswordLink.current?.focus()
    }
  }, [state])

  return (
    <div className={styles.loginForm}>
      <h1>Hi there!</h1>
      <p>Log in to continue</p>
      <form action={formAction}>
        <p aria-live="polite" className={styles.errorMessage}>
          <span>{state?.message}</span>
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
        <div
          className={`${styles.submitButton} ${
            pending ? styles.submitButtonPending : ''
          }`}
        >
          <input
            disabled={pending}
            type="submit"
            value={pending ? '' : 'Sign In'}
          />

          {pending ? (
            <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 11, 1 A 10,10 0 1,0 11,21 A 10,10 0 1,0 11,1"
                fill="none"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <></>
          )}
        </div>
      </form>
      <a href="#" className={styles.signup} ref={$signupLink}>
        Don&apos;t have an account? <span>Sign up</span>
      </a>
    </div>
  )
}
