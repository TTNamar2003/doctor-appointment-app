"use client";
import React from 'react'
import styles from '@/app/styles/Filter.module.css'
import FilterGroups from './FilterGroup'

interface FilterProps {
    onFilterChange: (filters: { [key: string]: string }) => void;
}

export default function Filter({ onFilterChange }: FilterProps) {
    const handleReset = () => {
        onFilterChange({
            gender: '',
            experience: '',
            rating: '',
            specialty: ''
        });
    };

    return (
        <div className={styles.filter_container}>
            <div className={styles.reset_container}>
                <h3>Filters By: </h3>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className={styles.lists_of_filter}>
                <FilterGroups groupName="Rating" onChange={(value) => onFilterChange({ rating: value })} />
                <FilterGroups groupName="Year_of_Experience" onChange={(value) => onFilterChange({ experience: value })} />
                <FilterGroups groupName="Gender" onChange={(value) => onFilterChange({ gender: value })} />
            </div>
        </div>
    )
}
