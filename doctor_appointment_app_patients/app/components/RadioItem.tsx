import React from 'react'
import styles from '@/app/styles/RadioItem.module.css'

interface RadioItemPorps {
    radioName :string,
    idName : string,
    name: string
}
export default function RadioItem({radioName,idName,name}:RadioItemPorps) {
  return (
    <div className={styles.radioItem_container}>
        <input type="radio" id={idName} name={name}/>
        <label htmlFor={idName}>{radioName}</label>
        
    </div>
  )
}
