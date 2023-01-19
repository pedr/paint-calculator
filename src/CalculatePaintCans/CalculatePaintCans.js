import React, { useState } from 'react';

import CalculatePaintCansForm from './components/CalculatePaintsCanForm';
import CalculatePaintCansHeader from './components/CalculatePaintCansHeader';
import CalculatePaintCansFooter from './components/CalculatePaintCansFooter ';

import calculatePaintCans from '../helpers/calculatePaint'
import { checkForErrors } from './helpers';

export default function CalculatePaintCans() {

  /**
   * @typedef {Array.<{quantity: number, size: number, label: string}} PaintCansState
   * @typedef {Function} PaintCansStateSetter
   * @type {[PaintCansState, PaintCansStateSetter]}
   */
  const [paintCansRequired, setPaintCansRequired] = useState([])

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

  const handleChangeWallMeasure = e => {
    const newValue = e.target.value
    const [indexAsStr, property] = e.target.name.split('-')

    if (!(newValue === '') && isNaN(parseInt(newValue))) return

    const index = parseInt(indexAsStr)

    // copy the oldValues and just modify the object with the correct index
    setWalls(oldValues => {
      return [
        ...oldValues.slice(0, index),
        { ...oldValues[index], [property]: newValue },
        ...oldValues.slice(index + 1)
      ]
    })
  }

  const checkForErrorsOnInput = () => {
    // check business constrains inside the readme
    const castToIntOrReturnZero = value => value ? parseInt(value) : 0

    const wallWithCorrectType = []
    for (let wall of walls) {
      const newObject = {}
      newObject.doors = castToIntOrReturnZero(wall.doors)
      newObject.windows = castToIntOrReturnZero(wall.windows)
      newObject.floor = castToIntOrReturnZero(wall.floor)
      newObject.height1 = castToIntOrReturnZero(wall.height1)
      newObject.height2 = castToIntOrReturnZero(wall.height2)
      wallWithCorrectType.push(newObject)
    }

    const errors = wallWithCorrectType.reduce(checkForErrors, [])
    
    return { errors, validatedInputs: wallWithCorrectType }
  }

  const handleCalculateRequiredPaintCans = () => {
    setErrorsFound([])
    setPaintCansRequired([])

    const { errors, validatedInputs } = checkForErrorsOnInput()
    if (errors.length) {
      setErrorsFound(errors)
      return
    }

    setPaintCansRequired(calculatePaintCans(validatedInputs))
  }

  if (!walls.length) return null

  return (
    <div className='paint-calculator-background'>

      <CalculatePaintCansHeader />

      <CalculatePaintCansForm
        errors={errorsFound}
        handleChangeInput={handleChangeWallMeasure}
        walls={walls}
      />

      <CalculatePaintCansFooter
        errors={errorsFound}
        handleOnSubmit={handleCalculateRequiredPaintCans}
        result={paintCansRequired}
      />

    </div>
  )
}

