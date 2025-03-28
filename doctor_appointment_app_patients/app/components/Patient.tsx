"use client";
import React, { useState } from 'react';
import styles from '@/app/styles/Patient.module.css';

interface PatientInfo {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    healthDescription: string;
}

export default function Patient() {
    const [patientInfo, setPatientInfo] = useState<PatientInfo>({
        name: '',
        age: 0,
        gender: 'other',
        healthDescription: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPatientInfo(prev => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Patient Information:', patientInfo);
        // Handle form submission here
    };

    return (
        <div className={styles.patient_container}>
            <div className={styles.patient_header}>
                <h2>Patient Information</h2>
            </div>

            <form onSubmit={handleSubmit} className={styles.patient_form}>
                <div className={styles.form_group}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={patientInfo.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                <div className={styles.form_row}>
                    <div className={styles.form_group}>
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={patientInfo.age}
                            onChange={handleInputChange}
                            placeholder="Enter your age"
                            min="0"
                            max="120"
                            required
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={patientInfo.gender}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="healthDescription">Health Description</label>
                    <textarea
                        id="healthDescription"
                        name="healthDescription"
                        value={patientInfo.healthDescription}
                        onChange={handleInputChange}
                        placeholder="Describe your health condition, symptoms, or concerns..."
                        rows={4}
                        required
                    />
                </div>

                <button type="submit" className={styles.submit_button}>
                    Save Information
                </button>
            </form>
        </div>
    );
} 