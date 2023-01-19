
const inputGroupsForCalculatePaint = [
  { name: 'Primeira Parede', id: 'first-wall', index: 0 },
  { name: 'Segunda Parede', id: 'second-wall', index: 1 },
  { name: 'Terceira Parede', id: 'third-wall', index: 2 },
  { name: 'Quarta Parede', id: 'fourth-wall', index: 3 },
]

const fieldsForCalculatePaint = [
  { name: 'Qntd de janelas', propertyName: 'windows', unit: 'un.' },
  { name: 'Qntd  de portas', propertyName: 'doors', unit: 'un.' },
  { name: 'Altura esquerda', propertyName: 'height1', unit: 'cm' },
  { name: 'Altura direita', propertyName: 'height2', unit: 'cm' },
  { name: 'Chão', propertyName: 'floor', unit: 'cm' },
]

export {
  inputGroupsForCalculatePaint,
  fieldsForCalculatePaint 
}