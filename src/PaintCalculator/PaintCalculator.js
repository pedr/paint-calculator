import React, { useState } from 'react';

import PaintCalculatorForm from './components/form/PaintCalculator.Form';
import PaintCalculatorHeader from './components/PaintCalculator.Header';
import PaintCalculatorFooter from './components/PaintCalculator.Footer';

import calculatePaintCans from './helpers/calculatePaint'
import findErrorsInBusinessLogic from './helpers/findErrorsInBusinessLogic';
import castWallInputsToNumber from './helpers/castWallInputsToNumber';

export default function PaintCalculator() {

  /**
   * @typedef {Array.<{quantity: number, size: number, label: string}} PaintCansState
   * @typedef {Function} PaintCansStateSetter
   * @type {[PaintCansState, PaintCansStateSetter]}
   */
  const [paintCansNecessary, setPaintCansNecessary] = useState([])

  /**
   * @typedef {Array.<{errorMessage: string, index: number}} ErrorsFoundState
   * @typedef {Function} ErrorsFoundStateSetter
   * @type {[ErrorsFoundState, ErrorsFoundStateSetter]}
   */
  const [errorsFound, setErrorsFound] = useState([])

  const [walls, setWalls] = React.useState([
    { height1: '', height2: '', floor: '', windows: '', doors: '' },
    { height1: '', height2: '', floor: '', windows: '', doors: '' },
    { height1: '', height2: '', floor: '', windows: '', doors: '' },
    { height1: '', height2: '', floor: '', windows: '', doors: '' },
  ])

  /**
   * Function that is responsible to update every field from the form.
   * For that, each input field receive a name with a index position and a property name
   * that is extractd and can be used to find each value should be updated
   */
  const handleOnChangeFormInput = e => {
    const newValue = e.target.value
    const [indexAsStr, property] = e.target.name.split('-')

    if (!(newValue === '') && isNaN(parseInt(newValue))) return

    const index = parseInt(indexAsStr)

    setWalls(oldValues => {
      return [
        ...oldValues.slice(0, index),
        { ...oldValues[index], [property]: newValue },
        ...oldValues.slice(index + 1)
      ]
    })
  }

  const checkForErrorsOnInput = () => {

    const wallWithCorrectType = castWallInputsToNumber(walls)

    const errors = wallWithCorrectType.reduce(findErrorsInBusinessLogic, [])
    
    return { errors, validatedInputs: wallWithCorrectType }
  }

  const handleCalculateRequiredPaintCans = () => {
    setErrorsFound([])
    setPaintCansNecessary([])

    const { errors, validatedInputs } = checkForErrorsOnInput()
    if (errors.length) {
      setErrorsFound(errors)
      return
    }

    setPaintCansNecessary(calculatePaintCans(validatedInputs))
  }

  if (!walls.length) return null

  return (
    <div className='paint-calculator-background'>

      <PaintCalculatorHeader />

      <PaintCalculatorForm
        errors={errorsFound}
        handleChangeInput={handleOnChangeFormInput}
        walls={walls}
      />

      <PaintCalculatorFooter 
        errors={errorsFound}
        handleOnSubmit={handleCalculateRequiredPaintCans}
        result={paintCansNecessary}
      />

    </div>
  )
}

