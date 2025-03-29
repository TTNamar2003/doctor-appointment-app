import React from 'react'
import styles from '@/app/styles/FilterGroup.module.css'
import RadioItem from './RadioItem'

interface FilterGroupProps {
  groupName :string
  onChange: (value: string) => void
}
export default function FilterGroups({ groupName, onChange } :FilterGroupProps) {
  
  const handleRadioChange = (value: string) => {
    onChange(value)
  }

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
            <RadioItem radioName='Show all' idName='show_all_rating' name={groupName} onChange={() => handleRadioChange('')} />
            <RadioItem radioName='1 star' idName='star1' name={groupName} onChange={() => handleRadioChange('1')} />
            <RadioItem radioName='2 star' idName='star2' name={groupName} onChange={() => handleRadioChange('2')} />
            <RadioItem radioName='3 star' idName='star3' name={groupName} onChange={() => handleRadioChange('3')} />
            <RadioItem radioName='4 star' idName='star4' name={groupName} onChange={() => handleRadioChange('4')} />
            <RadioItem radioName='5 star' idName='star5' name={groupName} onChange={() => handleRadioChange('5')} />
          </div>
          :
          (groupName==='Year_of_Experience')?
          <div className={styles.radioGroups_container}>
            <RadioItem radioName='15+ years' idName='years15' name={groupName} onChange={() => handleRadioChange('15+')} />
            <RadioItem radioName='10-15 years' idName='years10' name={groupName} onChange={() => handleRadioChange('10-15')} />
            <RadioItem radioName='5-10 years' idName='years5' name={groupName} onChange={() => handleRadioChange('5-10')} />
            <RadioItem radioName='3-5 years' idName='years3' name={groupName} onChange={() => handleRadioChange('3-5')} />
            <RadioItem radioName='1-3 years' idName='years1' name={groupName} onChange={() => handleRadioChange('1-3')} />
            <RadioItem radioName='0-1 years' idName='years0' name={groupName} onChange={() => handleRadioChange('0-1')} />
          </div>

          : (groupName==='Gender') ?
          <div className={styles.radioGroups_container}>
            <RadioItem radioName='Show all' idName='show_all_gender' name={groupName} onChange={() => handleRadioChange('')} />
            <RadioItem radioName='Male' idName='male' name={groupName} onChange={() => handleRadioChange('Male')} />
            <RadioItem radioName='Female' idName='female' name={groupName} onChange={() => handleRadioChange('Female')} />
          </div>
        :
        ""
      }

    </div>
  )
}
