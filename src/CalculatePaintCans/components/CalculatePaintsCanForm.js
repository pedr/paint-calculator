import React from 'react';
import WallInputGroup from './WallInputGroup';
import { inputGroupsForCalculatePaint } from '../consts'

export default function CalculatePaintCansForm({ walls, handleChangeInput, errors }) {
  return (
    <div className='paint-calculator-input-container'>
      {
        inputGroupsForCalculatePaint.map((element, index) => {
          return (
            <WallInputGroup
              key={element.id}
              wallTitle={element.name}
              wallIndex={index}
              wallState={walls[index]}
              handleChangeWallMeasure={handleChangeInput}
              errors={errors.filter(error => error.index === index)}
            />
          )
        })
      }
    </div>
  )
}