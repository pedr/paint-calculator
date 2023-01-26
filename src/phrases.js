
const phrases = {
  pt: {
    CHANGE_LANGUAGE: {
      CODE: 'en',
      NAME: 'English',
    },
    PAINT_CALCULATOR_HEADER: {
      TITLE: 'Calcule quantas latas de tintas são necessárias para pintar uma sala de quatro paredes',
      INFO: 'Todas as as unidades de medidas devem ser escritas em centímetros.'
    },
    PAINT_CALCULATOR_FORM: {
      QTY_WINDOWS: 'Qntd de janelas',
      QTY_DOORS: 'Qntd de portas',
      HEIGHT_LEFT: 'Altura esquerda',
      HEIGHT_RIGHT: 'Altura direita',
      FLOOR: 'Chão',
      FIRST_WALL: 'Primeira Parede',
      SECOND_WALL: 'Segunda Parede',
      THIRD_WALL: 'Terceira Parede',
      FOURTH_WALL: 'Quarta Parede',
      ERRORS: {
        OCCUPIED_AREA_TOO_BIG: 'Uma parede não pode ter mais de 50% de sua área ocupada por janela ou portas.',
        WALL_TOO_SMALL_FOR_DOOR: 'Uma parede que possui uma porta precisa possuir pelo menos 220cm de altura.',
        WALL_AREA_IS_INVALID: 'Uma parede precisa ter pelo menos 1m² de area e no máximo 50m²'
      }
    },
    PAINT_CALCULATOR_FOOTER: {
      BUTTON: 'Calcular a quantidade de tintas necessaria',
      ERROR: 'Há algo errado nos dados inseridos, verificar e corrigir.'
    }
  },
  en: {
    CHANGE_LANGUAGE: {
      CODE: 'pt',
      NAME: 'Português',
    },
    PAINT_CALCULATOR_HEADER: {
      TITLE: 'Calculate how many cans of paint are needed to paint a room with four walls',
      INFO: 'All measurement units must be written in centimeters.'
    },
    PAINT_CALCULATOR_FORM: {
      QTY_WINDOWS: 'Qty of windows',
      QTY_DOORS: 'Qty of doors',
      HEIGHT_LEFT: 'Left height',
      HEIGHT_RIGHT: 'Right height',
      FLOOR: 'Floor',
      FIRST_WALL: 'First Wall',
      SECOND_WALL: 'Second Wall',
      THIRD_WALL: 'Third Wall',
      FOURTH_WALL: 'Fourth Wall',
      ERRORS: {
        OCCUPIED_AREA_TOO_BIG: 'A wall cannot have more than 50% of its area occupied by windows or doors.',
        WALL_TOO_SMALL_FOR_DOOR: 'A wall that has a door must be at least 220cm high.',
        WALL_AREA_IS_INVALID: 'A wall must have an area of at least 1m² and a maximum of 50m²'
      }
    },
    PAINT_CALCULATOR_FOOTER: {
      BUTTON: 'Calculate the amount of paint cans needed',
      ERROR: 'There is something wrong with the inputed data'
    }
  }
}

export default phrases;