import React from 'react'
import styles from '@/app/styles/Login.module.css'
import Image from 'next/image'
import emailIcon from '@/public/images/@icon.svg'
import lockIcon from '@/public/images/lock_icon.svg'
import eyeIcon from '@/public/images/eye_icon.svg'

export default function Login() {
  return (
    <div className={styles.login_container}>
        <div className={styles.login_layout}>
            <div className={styles.login_title}>
                <h3>Login</h3>
            </div>
            <div className={styles.signup_option}>
                <p>Are you a new member? </p>
                <span>Sign up here.</span>
            </div>
            <form action="" className={styles.form_div}>
                <div className={styles.email_div}>
                    <label htmlFor="email">Email</label>
                    <div className={styles.input_div}>
                        <div className={styles.wrapper_input}>
                        <Image src={emailIcon} height={15} width={15} alt='@icon'/>
                        <input type="email" placeholder='emmawatson@gmail.com'/>
                        </div>
                    </div>
                </div>
                <div className={styles.password_div}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.input_div}>
                        <div className={styles.wrapper_input}>
                        <Image src={lockIcon} height={15} width={15} alt='lock_icon'/>
                        <input type="password" />
                        </div>
                        <Image src={eyeIcon} height={15} width={15} alt='eye_icon'/>


                        
                    </div>
                </div>
                <div className={styles.login_btn_div}>
                    <button>Login</button>
                </div>
                <div className={styles.reset_btn_div}>
                    <button>Reset</button>
                </div>
                <div className={styles.forget_password_div}>
                    <p>Forget Password?</p>
                </div>
            </form>
        </div>
    </div>
  )
}
