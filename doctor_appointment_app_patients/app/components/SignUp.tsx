
import styles from '@/app/styles/SignUp.module.css';
import emailIcon from '@/public/images/@icon.svg';
import lockIcon from '@/public/images/lock_icon.svg';
import nameIcon from '@/public/images/name_icon.svg';
import eyeIcon from '@/public/images/eye_icon.svg';
import Image from 'next/image';

export default function SignUp() {
 
    return (
        <div className={styles.signUp_container}>
            <div className={styles.signUp_layout}>
                <div className={styles.signUp_title}>
                    <h3>Sign Up</h3>
                </div>
                <div className={styles.login_option}>
                    <p>Are you a new member? </p>
                    <span>Login here.</span>
                </div>
                <form className={styles.form_div}>
                    {/* Name Input with Hover Focus */}
                    <div className={styles.label_input_flex_div} >
                        <label htmlFor="name">Name</label>
                        <div className={styles.input_div}>
                            <div className={styles.wrapper_input} >
                                <Image src={nameIcon} height={15} width={15} alt="name" />
                                <input type="text" placeholder="Enter your name" />
                            </div>
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className={styles.label_input_flex_div}>
                        <label htmlFor="email">Email</label>
                        <div className={styles.input_div}>
                            <div className={styles.wrapper_input} >
                                <Image src={emailIcon} height={15} width={15} alt="@icon" />
                                <input type="email" placeholder="emmawatson@gmail.com" />
                            </div>
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className={styles.label_input_flex_div}>
                        <label htmlFor="password">Password</label>
                        <div className={styles.input_div}>
                            <div className={styles.wrapper_input} >
                                <Image src={lockIcon} height={15} width={15} alt="lock_icon" />
                                <input type="password" />
                            </div>
                            <Image src={eyeIcon} height={15} width={15} alt="eye_icon" />
                        </div>
                    </div>

                    <div className={styles.signUp_btn_div}>
                        <button>Sign Up</button>
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
    );
}
