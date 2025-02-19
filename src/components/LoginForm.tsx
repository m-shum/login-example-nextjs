'use client'

import { useActionState, useEffect, useRef } from 'react'
import { login } from '@/actions'
import styles from './LoginForm.module.scss'

const initialState = {
  message: '',
}

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

  const emailFail = useRef(0)
  const passwordFail = useRef(0)
  const $signupLink = useRef(null)
  const $forgotPasswordLink = useRef(null)

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
        <input
          disabled={pending}
          className={styles.submitButton}
          type="submit"
          value="Sign In"
        />
      </form>
      <a href="#" className={styles.signup} ref={$signupLink}>
        Don&apos;t have an account? <span>Sign up</span>
      </a>
    </div>
  )
}
