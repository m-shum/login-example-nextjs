import styles from './LoginForm.module.scss'

export default function LoginForm() {
    return (
        <div className={styles.loginForm}>
            <form action="">
                <label className={`${styles.labelEmail, styles.row}`} htmlFor="email">Email</label>
                <input className={styles.inputEmail} type="email" name="email" id="email" placeholder="Enter email" />
                <label className={`${styles.labelPassword, styles.row}`} htmlFor="password">Password</label>
                <input className={styles.inputPassword} type="password" name="password" id="password" placeholder="Enter password" />
                <div className={styles.row}>
                    <label className={styles.checkbox} htmlFor="rememberUser">
                        <input type="checkbox" name="rememberUser" id="rememberUser" />
                        <span>Remember me</span>
                    </label>
                    <a className={styles.forgotPasswordLink}>Forgot password?</a>
                </div>
                <input className={styles.submitButton} type="submit" value="Sign In" />
            </form>
            <a className={styles.signup}>Don&apos;t have an account? Sign up</a>
        </div>
    )
}