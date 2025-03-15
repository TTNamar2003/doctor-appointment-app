"use client"
import React from 'react'
import styles from '@/app/styles/DisplayDoctor.module.css'
import SearchBar from './SearchBar'
import DoctorCard from './DoctorCard'
import { useState } from 'react'
import Filter from './Filter'
export default function DisplayDoctor() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={styles.displayDoctor_container}>
            <div className={styles.searchBar_component_div}>
                <SearchBar />
            </div>

            <section className={styles.doctor_result}>
                <h3>6 doctors available</h3>
                <p>Book appointments with minimum wait-time & verified doctor details</p>
            </section>

            <button className={styles.filter_btn} onClick={() => setIsOpen(true)}>Filters</button>
            <div className={styles.filter_cards}>
                <div className={styles.filter_component_div}>
                        <Filter/>
                </div>
                <article className={styles.cards_container}>
                    <DoctorCard />
                    <DoctorCard />
                    <DoctorCard />
                    <DoctorCard />
                    <DoctorCard />
                    <DoctorCard />
                </article>
            </div>

            {isOpen && (
                <div className={styles.overlay} onClick={() => setIsOpen(false)}>
                    <aside className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.crossBtn} onClick={() => setIsOpen(false)}>X</button>

                        <div className={styles.filter_component_div_sidebar}>
                            <Filter />
                        </div>

                    </aside>
                </div>
            )}




        </div>
    )
}

