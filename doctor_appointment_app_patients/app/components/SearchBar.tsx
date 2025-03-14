import React from 'react'
import styles from '@/app/styles/SearchBar.module.css'
import Image from 'next/image'
import searchIcon from '@/public/images/search_icon.svg'
export default function searchBar() {
  return (
    <div className={styles.searchBar_container}>
        <h3>Find a doctor at your own ease</h3>
        <div className={styles.searchBar_wrapper}> 
            <div className={styles.icon_serachBar}>
            <Image src={searchIcon} alt='serach-icon' height={20} width={20}/>
            <input type="search" placeholder='search doctors'/>
            </div>
            <button>Search</button>
        </div>
    </div>
  )
}
