import { calculateAreaOfWall, calculateNegativeSpace } from './calculatePaint'

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
export default function findErrorsInBusinessLogic(errorsFound, wall, wallIndex) {
  const businessConstrains = [
    {
      rule: isNegativeAreaLessThan50PercentOfWall,
      errorMesageKey: 'OCCUPIED_AREA_TOO_BIG'
    },
    {
      rule: isWallBigEnoughForDoor,
      errorMesageKey: 'WALL_TOO_SMALL_FOR_DOOR'
    },
    {
      rule: isWallConstraintsRespected,
      errorMesageKey: 'WALL_AREA_IS_INVALID'
    },
  ]

  const wallIsNotValid = businessConstrains.filter(contrain => !contrain.rule(wall))
  return [
    ...errorsFound,
    ...wallIsNotValid.map((constrain) => ({
      errorMessageKey: constrain.errorMesageKey,
      index: wallIndex
    })
    )
  ]
}
