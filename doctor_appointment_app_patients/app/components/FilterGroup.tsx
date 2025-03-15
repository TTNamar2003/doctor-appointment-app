import React from 'react'
import styles from '@/app/styles/FilterGroup.module.css'
import RadioItem from './RadioItem'

interface FilterGroupProps {
  groupName :string
}
export default function FilterGroups({ groupName } :FilterGroupProps) {
  
  return (
    <div className={styles.filterGroup_container}>
      {
        (groupName==="Year_of_Experience")?
        <p> Year of Experience</p>
        :
        <p>{groupName}</p>
      }

      {
        (groupName === 'Rating') ?
          <div className={styles.radioGroups_container}>
            <RadioItem radioName='Show all' idName='show_all_rating' name={groupName} />
            <RadioItem radioName='1 star' idName='star1' name={groupName} />
            <RadioItem radioName='2 star' idName='star2' name={groupName} />
            <RadioItem radioName='3 star' idName='star3' name={groupName} />
            <RadioItem radioName='4 star' idName='star4' name={groupName} />
            <RadioItem radioName='5 star' idName='star5' name={groupName} />
          </div>
          :
          (groupName==='Year_of_Experience')?
          <div className={styles.radioGroups_container}>
            <RadioItem radioName='15+ years' idName='years15' name={groupName} />
            <RadioItem radioName='10-15 years' idName='years10' name={groupName} />
            <RadioItem radioName='5-10 years' idName='years5' name={groupName} />
            <RadioItem radioName='3-5 years' idName='years3' name={groupName} />
            <RadioItem radioName='1-3 years' idName='years1' name={groupName} />
            <RadioItem radioName='0-1 years' idName='years0' name={groupName} />
          </div>

          : (groupName==='Gender') ?
          <div className={styles.radioGroups_container}>
          <RadioItem radioName='Male' idName='male' name={groupName} />
          <RadioItem radioName='Female' idName='female' name={groupName} />
        </div>
        :
        ""
      }

    </div>
  )
}
