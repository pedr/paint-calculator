import React from "react"

/**
 * 
 * @param {{
 *  paintCansRequired: Array.<{ label: string, quantity: string }>
 * }} param0 
 * @returns 
 */
export default function PaintCalculatorResultTable({ paintCansRequired }) {

  if (!paintCansRequired.length) return null

  return <div className='paint-calculator-results' data-testid='paint-calculator-results'>
    <div className='paint-calculator-results-row'>
      <span>Tamanho da lata</span>
      <span>Quantidade</span>
    </div>
    {
      paintCansRequired.map((paintCan) => {
        return <div className='paint-calculator-results-row' key={paintCan.label}>
          <span>{paintCan.label}</span>
          <span>{`${paintCan.quantity} un.`}</span>
        </div>
      })
    }
  </div>
}