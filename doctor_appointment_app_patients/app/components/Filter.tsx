import React from 'react'
import styles from '@/app/styles/Filter.module.css'
import FilterGroups from './FilterGroup'

export default function Filter() {
  return (
    <div className={styles.filter_container}>
        <div className={styles.reset_container}>
            <h3>Filters By: </h3>
            <button>Reset</button>
        </div>
        <div className={styles.lists_of_filter}>
            <FilterGroups groupName="Rating"/>
            <FilterGroups groupName="Year_of_Experience"/>
            <FilterGroups groupName="Gender"/>
        </div>
    </div>
  )
}
