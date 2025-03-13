import React from 'react'
import styles from '@/app/styles/LandingPage.module.css'
import Image from 'next/image'
import landingPageImg from '@/public/images/landingPageImg.svg'
export default function LandingPage() {
    return (
        <div className={styles.landingPage_container}>
            <section className={styles.landingPage_text_section}>
                <div className={styles.text_section_content}>
                <h3>
                    Health in Your Hands.
                </h3>
                <p>
                    Take control of your healthcare with CareMate. Book appointments with ease,
                    explore health blogs, and stay on top of your well-being, all in one place.
                </p>
                </div>

                <div className={styles.text_section_btn_div}>
                        <button>Get Started</button>
                </div>
            </section>
            <section className={styles.landingPage_img_section}>
            <Image src={landingPageImg}  alt="landing page img"  />
            </section>
        </div>
    )
}
