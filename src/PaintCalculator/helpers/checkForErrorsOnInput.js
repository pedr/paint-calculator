import findErrorsInBusinessLogic from './findErrorsInBusinessLogic';
import castWallInputsToNumber from './castWallInputsToNumber';

export default function checkForErrorsOnInput(walls) {

  const wallWithCorrectType = castWallInputsToNumber(walls)

  const errors = wallWithCorrectType.reduce(findErrorsInBusinessLogic, [])

  return { errors, validatedInputs: wallWithCorrectType }
}
