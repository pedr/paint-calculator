
const phrases = {
  pt: {
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
  }
}

export default phrases;