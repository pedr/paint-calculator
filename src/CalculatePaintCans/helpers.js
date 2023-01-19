import { calculateAreaOfWall, calculateNegativeSpace } from '../helpers/calculatePaint'

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
export function checkForErrors(errorsFound, wall, wallIndex) {
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
