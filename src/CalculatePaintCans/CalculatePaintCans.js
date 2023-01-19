import React, { useState } from 'react';
import calculatePaintCans, { calculateAreaOfWall, calculateNegativeSpace } from '../helpers/calculatePaint'

const inputGroups = [
  { name: 'Primeira Parede', id: 'first-wall' },
  { name: 'Segunda Parede', id: 'second-wall' },
  { name: 'Terceira Parede', id: 'third-wall' },
  { name: 'Quarta Parede', id: 'fourth-wall' },
]

const inputFields = [
  { name: 'Qntd de janelas', propertyName: 'windows', unit: 'un.' },
  { name: 'Qntd  de portas', propertyName: 'doors', unit: 'un.' },
  { name: 'Altura esquerda', propertyName: 'height1', unit: 'cm' },
  { name: 'Altura direita', propertyName: 'height2', unit: 'cm' },
  { name: 'Chão', propertyName: 'floor', unit: 'cm' },
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
    setErrorsFound([])
    const { errors, validatedInputs } = checkForErrorsOnInput()
    if (errors.length) {
      setErrorsFound(errors)
      return
    }

    setPaintCansRequired(calculatePaintCans(validatedInputs))
  }

  React.useEffect(() => {
    console.log(walls)
  }, [walls])

  if (!walls.length) return null

  return <div className='paint-calculator-background'>
    <div className='paint-calculator-input-container'>
      {
        inputGroups.map((element, index) => {
          return <div className="wall-input-group" key={element.id}>
            <h3>{element.name}</h3>
            {inputFields.map((field) => {
              const inputIdentifier = `${index}-${field.propertyName}`
              return <div className="input-wrapper" key={inputIdentifier}>
                <label htmlFor={inputIdentifier}>
                  {field.name}
                </label>
                <input value={walls[index][field.propertyName]} onChange={handleChangeWallMeasure} name={inputIdentifier} type="number" min="0" step="1" pattern="[0-9]*" />
                <span>{field.unit}</span>
              </div>
            })}
            {
              errorsFound && errorsFound.filter(error => error.index === index).length ? errorsFound.filter(error => error.index === index).map(error => {
                const key = `${error.index}-${error.errorMessage}`
                return <div className="alert-warning" key={key}>{`⚠️  ${error.errorMessage}`}</div>
              }) : null
            }
          </div>
        })
      }
    </div>
    <div className='paint-calculator-control-wrapper'>
      {
        errorsFound && errorsFound.length ? (
          <div className='alert-warning'>
            Há algo errado nos dados inseridos, verificar e corrigir.
          </div>
        ) : null
      }
      <button onClick={handleCalculateRequiredPaintCans}>Calcular a quantidade de tintas necessaria</button>

      {paintCansRequired.length ?
        <div className='paint-calculator-results'>
          <div className='paint-calculator-results-row'>
            <span>Tamanho da lata</span>
            <span>Quantidade</span>
          </div>
          {
            paintCansRequired.map((paintCan) => {
              return <div className='paint-calculator-results-row'>
                <span>{paintCan.label}</span>
                <span>{`${paintCan.quantity} un.`}</span>
              </div>
            })
          }
        </div>
        : null}

    </div>
  </div>
}