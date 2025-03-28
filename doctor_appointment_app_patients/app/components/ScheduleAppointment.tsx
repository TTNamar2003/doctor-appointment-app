"use client";
import React from "react";
import styles from "@/app/styles/ScheduleAppointment.module.css";
import Image from "next/image";

import sun from "@/public/images/sun.svg";
import sunset from "@/public/images/sunset.svg";
import leftArrowIcon from "@/public/images/leftArrowIcon.png";
import rightArrowIcon from "@/public/images/rightArrowIcon.png";
import { useState } from "react";
export default function ScheduleAppointment() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  };
  const prevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  };

  const formattedDate = currentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const getNext7Days = (date: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + i);
      return newDate;
    });
  };

  const nextWeek = () => {
    setStartDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  //   const prevWeek = () => {
  //     setStartDate((prev) => {
  //       const newDate = new Date(prev);
  //       newDate.setDate(prev.getDate() - 7);
  //       return newDate;
  //     });
  //   };
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
        <div className={` ${styles.leftArrowDiv} ${styles.arrowImageDiv} `}>
          <Image
            src={leftArrowIcon}
            alt="left arrow"
            height={8.21}
            width={12.72}
            onClick={prevMonth}
            className={styles.arrow}
          />
        </div>
        <p>{formattedDate}</p>
        <div className={styles.arrowImageDiv}>
          <Image
            src={rightArrowIcon}
            alt="right arrow"
            height={8.21}
            width={12.72}
            onClick={nextMonth}
            className={styles.arrow}
          />
        </div>
      </div>
      <div className={styles.calendar_div_wrapper}>
        <div className={styles.calendar_div}>
          <div className={styles.calendar_list}>
            {dates.map((date, index) => {
              const isToday = date.toDateString() === today;
              return (
                <div
                  key={index}
                  className={`${styles.date_div} ${
                    isToday ? styles.today : ""
                  }`}
                >
                  <p>
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <p>
                    {date.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                </div>
              );
            })}
          </div>

          <div className={styles.arrowImageDiv}>
            <Image
              src={rightArrowIcon}
              alt="right arrow"
              height={8.21}
              width={12.72}
              onClick={nextWeek}
              className={styles.arrow}
            />
          </div>
        </div>
      </div>

      <div className={styles.noon_div}>
        <div>
          <div className={styles.logo_para}>
            <Image src={sun} alt="sun" height={23.43} width={21.65} />
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
            <Image src={sunset} alt="sunset" height={23.43} width={21.65} />
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
  );
}
