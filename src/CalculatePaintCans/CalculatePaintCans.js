import React, { useState } from 'react';
import calculatePaintCans, { calculateAreaOfWall, calculateNegativeSpace } from '../helpers/calculatePaint'

const inputGroups = [
  { name: 'Primeira Parede', id: 'first-wall' },
  { name: 'Segunda Parede', id: 'second-wall' },
  { name: 'Terceira Parede', id: 'third-wall' },
  { name: 'Quarta Parede', id: 'fourth-wall' },
]

const inputFields = [
  { name: 'Quantidade de janelas', propertyName: 'windows' },
  { name: 'Quantidade de portas', propertyName: 'doors' },
  { name: 'Altura esquerda', propertyName: 'height1' },
  { name: 'Altura direita', propertyName: 'height2' },
  { name: 'Chão', propertyName: 'floor' },
]

function isWallConstraintsRespected(wall) {
  const wallArea = calculateAreaOfWall(wall)
  const areaTooSmall = 10_000
  const areaTooBig = 500_000

  return wallArea > areaTooSmall && wallArea < areaTooBig
}

function isNegativeAreaLessThan50PercentOfWall(wall) {
  const wallArea = calculateAreaOfWall(wall)
  const negativeArea = calculateNegativeSpace(wall.windows, wall.doors)

  return wallArea / 2 > negativeArea
}

function isWallBigEnoughForDoor(wall) {
  if (wall.doors === 0) return true

  const DOOR_HEIGHT = 190

  return wall.height1 - 30 >= DOOR_HEIGHT && wall.height2 - 30 >= DOOR_HEIGHT
}

/**
 * @returns {Array.<{errorMessage: string, index: number}>} 
 */
function checkForErrors(errorsFound, wall, wallIndex) {
  const businessConstrains = [
    {
      rule: isNegativeAreaLessThan50PercentOfWall,
      errorMesage: 'Uma parede não pode ter mais de 50% de sua área ocupada por janela ou portas.'
    },
    {
      rule: isWallBigEnoughForDoor,
      errorMesage: 'Uma parede que possui uma porta precisa possuir pelo menos 220cm de altura.'
    },
    {
      rule: isWallConstraintsRespected,
      errorMesage: 'Uma parede precisa ter pelo menos 1m² de area e no máximo 50m²'
    },
  ]

  const wallIsNotValid = businessConstrains.filter(contrain => !contrain.rule(wall))
  return [
    ...errorsFound,
    ...wallIsNotValid.map((constrain) => ({
      errorMessage: constrain.errorMesage,
      index: wallIndex
    })
    )
  ]
}

export default function CalculatePaintCans() {

  /**
   * @typedef {Array.<{quantity: number, size: number, label: string}} PaintCansState
   * @typedef {Function} PaintCansStateSetter
   * @type {[PaintCansState, PaintCansStateSetter]}
   */
  const [paintCansRequired, setPaintCansRequired] = useState([])

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

    const allValuesToNumber = []
    for (let wall of walls) {
      const newObject = {}
      newObject.doors = castToIntOrReturnZero(wall.doors)
      newObject.windows = castToIntOrReturnZero(wall.windows)
      newObject.floor = castToIntOrReturnZero(wall.floor)
      newObject.height1 = castToIntOrReturnZero(wall.height1)
      newObject.height2 = castToIntOrReturnZero(wall.height2)
      allValuesToNumber.push(newObject)
    }

    const errors = allValuesToNumber.reduce(checkForErrors, [])
    
    return { errors, validatedInputs: allValuesToNumber }
  }

  const handleCalculateRequiredPaintCans = () => {
    const { errors, validatedInputs } = checkForErrorsOnInput()
    if (errors.length) {
      // TODO!!
      // show errors as alert for example
      return
    }

    setPaintCansRequired(calculatePaintCans(validatedInputs))
  }

  React.useEffect(() => {
    console.log(walls)
  }, [walls])

  if (!walls.length) return null

  return <div>
    <div>
      {
        inputGroups.map((element, index) => {
          return <React.Fragment key={element.id}>
            <p >{element.name}</p>
            <div>
              {inputFields.map((field) => {
                const inputIdentifier = `${index}-${field.propertyName}` 
                return <React.Fragment>
                  <label key={inputIdentifier}>
                  {field.name}
                  <input value={walls[index][field.propertyName]} onChange={handleChangeWallMeasure} name={inputIdentifier} type="number" min="0" step="1" pattern="[0-9]*" />
                </label>
                <br/>
                </React.Fragment>
              })}
            </div>
          </React.Fragment>
        })
      }
      <button onClick={handleCalculateRequiredPaintCans}>Calcular a quantidade de tintas necessaria</button>
      {JSON.stringify(paintCansRequired, null, 4)}
    </div>
  </div>
}