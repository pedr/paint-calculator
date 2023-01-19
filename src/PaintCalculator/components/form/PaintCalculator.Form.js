import React from 'react';
import InputGroupForWallMeasures from './components/InputGroupForWallMeasures';
import { inputGroupsForPaintCalculator } from '../../consts'

export default function PaintCalculatorForm({ walls, handleChangeInput, errors }) {
  return (
    <div className='paint-calculator-input-container'>
      {
        inputGroupsForPaintCalculator.map((wallInputGroup, index) => {
          return (
            <InputGroupForWallMeasures 
              key={wallInputGroup.id}
              wallTitle={wallInputGroup.name}
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