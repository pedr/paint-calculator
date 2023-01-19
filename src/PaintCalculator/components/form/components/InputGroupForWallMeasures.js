import React from 'react';
import AlertWarning from '../../../../components/AlertWarning';
import { inputFieldsForPaintCalculator } from '../../../consts';

export default function InputGroupForWallMeasures({ wallTitle, errors, handleChangeWallMeasure, wallState, wallIndex }) {
  return (
    <div className="wall-input-group">
      <h3>{wallTitle}</h3>
      {
        inputFieldsForPaintCalculator.map((field) => (
          <InputFieldForWallMeasures 
            value={wallState[field.propertyName]}
            onChange={handleChangeWallMeasure}
            identifier={`${wallIndex}-${field.propertyName}`}
            unit={field.unit}
            fieldName={field.name}
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
        type="number"
        min="0"
        step="1"
        pattern="[0-9]*"
      />
      <span>{unit}</span>
    </div>
  )
}
