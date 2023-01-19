import React from 'react';
import AlertWarning from '../../components/AlertWarning';
import { fieldsForCalculatePaint } from '../consts';


const WallInputGroup = ({ wallTitle, errors, handleChangeWallMeasure, wallState, wallIndex }) => {
  return (
    <div className="wall-input-group">
      <h3>{wallTitle}</h3>
      {
        fieldsForCalculatePaint.map((field) => (
          <InputFieldForPaintCalculator
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


const InputFieldForPaintCalculator = ({ fieldName, value, onChange, unit, identifier }) => {
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

export default WallInputGroup