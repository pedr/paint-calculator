
const inputGroupsForPaintCalculator = [
  { textKey: 'FIRST_WALL', id: 'first-wall', index: 0 },
  { textKey: 'SECOND_WALL', id: 'second-wall', index: 1 },
  { textKey: 'THIRD_WALL', id: 'third-wall', index: 2 },
  { textKey: 'FOURTH_WALL', id: 'fourth-wall', index: 3 },
]

const inputFieldsForPaintCalculator = [
  { textKey: 'QTY_WINDOWS', propertyName: 'windows', unit: 'un.' },
  { textKey: 'QTY_DOORS', propertyName: 'doors', unit: 'un.' },
  { textKey: 'HEIGHT_LEFT', propertyName: 'height1', unit: 'cm' },
  { textKey: 'HEIGHT_RIGHT', propertyName: 'height2', unit: 'cm' },
  { textKey: 'FLOOR', propertyName: 'floor', unit: 'cm' },
]

export {
  inputGroupsForPaintCalculator,
  inputFieldsForPaintCalculator 
}