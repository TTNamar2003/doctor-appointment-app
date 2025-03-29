"use client";
import React, { useState } from "react";
import styles from "@/app/styles/DoctorProfile.module.css";
import Image from "next/image";
import doctorPic from "@/public/images/doctor_pic.svg";
import star from "@/public/images/one_star.svg";
import location from "@/public/images/location.svg";
import experience from "@/public/images/hourGlass.svg";
import gender from "@/public/images/gender.svg";
import sun from "@/public/images/sun.svg";
import sunset from "@/public/images/sunset.svg";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function DoctorProfile() {
  const router = useRouter();
  const { id } = useParams();
  function handleNavigate() {
    router.push(`/doctors/${id}/appointment`);
  }
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
  };

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_header}>
        <div className={styles.doctor_image}>
          <Image
            src={doctorPic}
            alt="doctor profile"
            height={200}
            width={200}
          />
        </div>
        <div className={styles.doctor_info}>
          <div className={styles.name_rating}>
            <h2>Dr. Jane Smith</h2>
            <div className={styles.rating}>
              <Image src={star} alt="rating" height={20} width={20} />
              <span>4.5</span>
            </div>
          </div>
          <div className={styles.speciality}>
            <h3>Cardiologist</h3>
          </div>
          <div className={styles.experience}>
            <Image src={experience} alt="experience" height={20} width={20} />
            <span>9 Years Experience</span>
          </div>
          <button
            className={styles.book_appointment_btn}
            onClick={handleNavigate}
          >
            Book Appointment
          </button>
        </div>
      </div>

      <div className={styles.profile_details}>
        <div className={styles.detail_section}>
          <h3>About</h3>
          <p>
            Dr. Jane Smith is a highly experienced cardiologist with expertise
            in treating various heart conditions. She has successfully treated
            over 1000 patients and is known for her patient-centric approach.
          </p>
        </div>

        <div className={styles.detail_section}>
          <h3>Education</h3>
          <div className={styles.education}>
            <p>MBBS - Harvard Medical School (2010)</p>
            <p>MD - Cardiology - Johns Hopkins University (2014)</p>
          </div>
        </div>

        <div className={styles.detail_section}>
          <h3>Specialization</h3>
          <div className={styles.specialization}>
            <span>Heart Disease</span>
            <span>Hypertension</span>
            <span>Arrhythmia</span>
          </div>
        </div>

        <div className={styles.detail_section}>
          <h3>Diseases Treated</h3>
          <div className={styles.diseases}>
            <span>Coronary Artery Disease</span>
            <span>Heart Failure</span>
            <span>Atrial Fibrillation</span>
            <span>Valvular Heart Disease</span>
            <span>Cardiomyopathy</span>
            <span>Pericardial Disease</span>
          </div>
        </div>

        <div className={styles.detail_section}>
          <h3>Location</h3>
          <div className={styles.location}>
            <Image src={location} alt="location" height={20} width={20} />
            <span>Medicare Heart Institute, Okhla Road, New Delhi</span>
          </div>
        </div>

        <div className={styles.detail_section}>
          <h3>Gender</h3>
          <div className={styles.gender}>
            <Image src={gender} alt="gender" height={20} width={20} />
            <span>Female</span>
          </div>
        </div>

        <div className={styles.detail_section}>
          <div className={styles.slots_header}>
            <h3>Available Slots</h3>
            <div className={styles.date_selector}>
              <input
                type="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={handleDateChange}
                min={today.toISOString().split("T")[0]}
                className={styles.date_input}
              />
            </div>
          </div>
          <p className={styles.selected_date}>{formattedDate}</p>
          <div className={styles.slots_container}>
            <div className={styles.slot_shift}>
              <div className={styles.shift_header}>
                <div className={styles.logo_para}>
                  <Image src={sun} alt="morning" height={24} width={24} />
                  <p>Morning</p>
                </div>
                <div className={styles.available_slots}>
                  <p>3 slots available</p>
                </div>
              </div>
              <div className={styles.slot_time}>
                <div>9:00 AM</div>
                <div>9:30 AM</div>
                <div>10:00 AM</div>
                <div>10:30 AM</div>
                <div>11:00 AM</div>
                <div>11:30 AM</div>
              </div>
            </div>

            <div className={styles.slot_shift}>
              <div className={styles.shift_header}>
                <div className={styles.logo_para}>
                  <Image src={sunset} alt="afternoon" height={24} width={24} />
                  <p>Afternoon</p>
                </div>
                <div className={styles.available_slots}>
                  <p>4 slots available</p>
                </div>
              </div>
              <div className={styles.slot_time}>
                <div>2:00 PM</div>
                <div>2:30 PM</div>
                <div>3:00 PM</div>
                <div>3:30 PM</div>
                <div>4:00 PM</div>
                <div>4:30 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
