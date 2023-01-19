
export default function castWallInputsToNumber(walls) {
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
  
    return wallWithCorrectType;
}