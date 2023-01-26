import React from 'react';
import InputGroupForWallMeasures from './components/InputGroupForWallMeasures';
import { inputGroupsForPaintCalculator } from '../../consts'
import { useLanguage } from '../../../languageContext';

export default function PaintCalculatorForm({ walls, handleChangeInput, errors }) {
  const { texts } = useLanguage();

  return (
    <div className='paint-calculator-input-container'>
      {
        inputGroupsForPaintCalculator.map((wallInputGroup, index) => {
          return (
            <InputGroupForWallMeasures 
              key={wallInputGroup.id}
              wallTitle={texts.PAINT_CALCULATOR_FORM[wallInputGroup.textKey]}
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