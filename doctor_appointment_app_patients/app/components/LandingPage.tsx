import React from 'react'
import styles from '@/app/styles/LandingPage.module.css'
import Image from 'next/image'
import landingPageImg from '@/public/images/landingPageImg.svg'
import LandingPageContent from './LandingPageContent'
import ScheduleAppointment from './ScheduleAppointment'
export default function LandingPage() {
    return (
        <div className={styles.landingPage_container}>
            <LandingPageContent/>
            <section className={styles.landingPage_img_section}>
            {/* <Image src={landingPageImg}  alt="landing page img"  /> */}
            <div className={styles.appointment_component}>
            <ScheduleAppointment/>
            </div>
            </section>
        </div>
    )
}
