import React from 'react'
import styles from '@/app/styles/NavButtons.module.css'
export default function NavButtons() {
    return (
        <div className={styles.navButton_container}>
            <button className={styles.btn_login}>
                <p>Login</p>
            </button>
            <button className={styles.btn_register}>
                <p>Register</p>
            </button>
        </div>
    )
}
