import React from 'react';

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

export default function CalculatePaintCans() {

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
    </div>
  </div>
}