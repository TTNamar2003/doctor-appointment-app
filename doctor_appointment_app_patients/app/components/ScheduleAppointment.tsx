"use client";
import React from 'react'
import styles from '@/app/styles/ScheduleAppointment.module.css'
import Image from 'next/image'
import leftArrow from '@/public/images/left_arrow.svg'
import rightArrow from '@/public/images/right_arrow.svg'
import sun from '@/public/images/sun.svg'
import sunset from '@/public/images/sunset.svg'
import { useState } from 'react'
export default function ScheduleAppointment() {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());

    const nextMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    };
    const prevMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    };

    const formattedDate = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

    const getNext7Days = (date: Date) => {
        return Array.from({ length: 7 }, (_, i) => {
            const newDate = new Date(date);
            newDate.setDate(date.getDate() + i);
            return newDate;
        });
    };

    const nextWeek = () => {
        setStartDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + 7);
            return newDate;
        });
    };

    const prevWeek = () => {
        setStartDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() - 7);
            return newDate;
        });
    };
    const dates = getNext7Days(startDate);

    const today = new Date().toDateString();

    return (
        <div className={styles.appointment_container}>
            <div className={styles.appointment_div}>
                <div>
                    <h3>Schedule Appointment</h3>
                    <button>Book Appointment</button>
                </div>
                <div>
                    <button>Book Video Consult</button>
                    <button>Book Hospital Visit</button>
                </div>
                <div>
                    <select name="" id="">
                        <option value="">MedicareHeart Institute, Okhla Road</option>
                    </select>
                </div>
            </div>
            <div className={styles.month_div}>
                <Image src={leftArrow} alt="left arrow" height={23.36} width={25.28} onClick={prevMonth} style={{ cursor: "pointer" }} />
                <p>{formattedDate}</p>
                <Image src={rightArrow} alt="right arrow" height={23.36} width={25.28} onClick={nextMonth} style={{ cursor: "pointer" }} />

            </div>
            <div className={styles.calendar_div}>
                <Image src={leftArrow} alt="left arrow" height={25.28} width={23.36} onClick={prevWeek} className={styles.arrow} />

                <div className={styles.calendar_list}>
                    {dates.map((date, index) => {
                        const isToday = date.toDateString() === today;
                        return (
                            <div key={index} className={`${styles.date_div} ${isToday ? styles.today : ""}`}>
                                <p>{date.toLocaleDateString("en-US", { weekday: "short" })}</p>
                                <p>{date.toLocaleDateString("en-US", { day: "2-digit", month: "short" })}</p>
                            </div>
                        );
                    })}
                </div>

                <Image src={rightArrow} alt="right arrow" height={25.28} width={23.36} onClick={nextWeek} className={styles.arrow} />
            </div>

            <div className={styles.noon_div}>
                <div>
                    <div className={styles.logo_para}>
                        <Image src={sun} alt='sun' height={23.43} width={21.65} />
                        <p>Morning</p>
                    </div>
                    <div className={styles.available_slots}>
                        <p>2 slots</p>
                    </div>
                </div>
                <div className={styles.slot_time}>
                    <div>9:00 Am</div>
                    <div>9:30 Am</div>
                    <div>10:00 Am</div>
                    <div>10:30 Am</div>
                    <div>11:00 Am</div>
                    <div>11:30 Am</div>
                    <div>12:00 Am</div>
                    <div>12:30 Am</div>
                </div>
            </div>
            <div className={styles.noon_div}>
                <div>
                    <div className={styles.logo_para}>
                        <Image src={sunset} alt='sunset' height={23.43} width={21.65} />
                        <p>Afternoon</p>
                    </div>
                    <div className={styles.available_slots}>
                        <p>3 slots</p>
                    </div>
                </div>
                <div className={styles.slot_time}>
                    <div>9:00 Am</div>
                    <div>9:30 Am</div>
                    <div>10:00 Am</div>
                    <div>10:30 Am</div>
                    <div>11:00 Am</div>
                    <div>11:30 Am</div>
                    <div>12:00 Am</div>
                    <div>12:30 Am</div>
                </div>
            </div>
            <div className={styles.next_btn_div}>
                <button>Next</button>
            </div>
        </div>
    )
}
