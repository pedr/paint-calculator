import React from 'react';
import AlertWarning from '../../../../components/AlertWarning';
import { useLanguage } from '../../../../languageContext';
import { inputFieldsForPaintCalculator } from '../../../consts';

export default function InputGroupForWallMeasures({ wallTitle, errors, handleChangeWallMeasure, wallState, wallIndex }) {
  const { texts } = useLanguage();

  return (
    <div className="wall-input-group">
      <h3>{wallTitle}</h3>
      {
        inputFieldsForPaintCalculator.map((field) => (
          <InputFieldForWallMeasures 
            key={field.propertyName}  
            value={wallState[field.propertyName]}
            onChange={handleChangeWallMeasure}
            identifier={`${wallIndex}-${field.propertyName}`}
            unit={field.unit}
            fieldName={texts.PAINT_CALCULATOR_FORM[field.textKey]}
          />
        ))
      }
      {
        errors.length ? errors.map(error => {
          const key = `${error.index}-${error.errorMessage}`
          const errorFormated = `⚠️ ${error.errorMessage}`
          return <AlertWarning key={key} isVisible message={errorFormated} />
        }) : null
      }
    </div>
  )
}


const InputFieldForWallMeasures = ({ fieldName, value, onChange, unit, identifier }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={identifier}>
        {fieldName}
      </label>
      <input
        value={value}
        onChange={onChange}
        name={identifier}
        id={identifier}
        type="text"
      />
      <span>{unit}</span>
    </div>
  )
}
