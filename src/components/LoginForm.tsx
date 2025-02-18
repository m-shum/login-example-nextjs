'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions'
import styles from './LoginForm.module.scss'

const initialState = {
  message: '',
}

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

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
        />
        <div className={styles.row}>
          <label className={styles.checkbox} htmlFor="rememberUser">
            <input type="checkbox" name="rememberUser" id="rememberUser" />
            <span>Remember me</span>
          </label>
          <a href="#" className={styles.forgotPasswordLink}>
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
      <a href="#" className={styles.signup}>
        Don&apos;t have an account? Sign up
      </a>
    </div>
  )
}
