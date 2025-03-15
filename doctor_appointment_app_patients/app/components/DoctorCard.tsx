import React from 'react'
import styles from '@/app/styles/DoctorCard.module.css'
import Image from 'next/image'
import doctorPic from '@/public/images/doctor_pic.svg'
import oneStar from '@/public/images/one_star.svg'
import zeroStar from '@/public/images/zero_star.svg'
import hourGlass from '@/public/images/hourGlass.svg'
import stethoscope from '@/public/images/Stethoscope.svg'
export default function DoctorCard() {
  return (
    <div className={styles.card_container}>
        <div className={styles.doctor_profile}>
            <Image src={doctorPic} alt="doctor pic" height={150} width={150}/>
            <div className={styles.doctor_description}>
                <div className={styles.name_degree_div}>
                    <h3>Dr Jane,</h3>
                    <h3>MBBS</h3>
                </div>
                <div className={styles.typeOfDoctor_YOE}>
                    <div className={styles.flex_img_para}>
                        <Image src={stethoscope} alt='symbol' height={15.01} width={17.5}/>
                        <p>Dentist</p>
                    </div>
                    <div className={styles.flex_img_para}>
                        <Image src={hourGlass} alt='symbol' height={15.01} width={17.5}/>
                        <p>9 Years</p>
                    </div>
                </div>
            </div>

            <div className={styles.rating_div}>
                <p>Ratings: </p>
                <div className={styles.stars_div}>
                    <Image src={oneStar} alt='one star' height={17.5} width={17.5}/>
                    <Image src={zeroStar} alt='zero star' height={17.5} width={17.5}/>
                    
                </div>
            </div>
        </div>
        <div className={styles.appointment_btn_div}>
            <button>Book Appointment</button>
        </div>
    </div>
  )
}
