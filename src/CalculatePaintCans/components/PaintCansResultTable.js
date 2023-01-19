import React from "react"

export default function PaintCansResultTable({ paintCansRequired }) {

  if (!paintCansRequired.length) return null

  const PaintCansResultTableRow = () => {
    return paintCansRequired.map((paintCan) => {
      return <div className='paint-calculator-results-row'>
        <span>{paintCan.label}</span>
        <span>{`${paintCan.quantity} un.`}</span>
      </div>
    })
  }

  return <div className='paint-calculator-results'>
    <div className='paint-calculator-results-row'>
      <span>Tamanho da lata</span>
      <span>Quantidade</span>
    </div>
    <PaintCansResultTableRow />
  </div>
}