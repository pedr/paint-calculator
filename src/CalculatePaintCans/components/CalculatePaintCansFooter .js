import React from "react"
import AlertWarning from "../../components/AlertWarning"
import PaintCansResultTable from "./PaintCansResultTable"

export default function CalculatePaintCansFooter({ errors, handleOnSubmit, result }) {
  return (
    <div className='paint-calculator-control-wrapper'>
      <AlertWarning
        isVisible={errors.length > 0}
        message="Há algo errado nos dados inseridos, verificar e corrigir."
      />
      <button onClick={handleOnSubmit}>Calcular a quantidade de tintas necessaria</button>
      <PaintCansResultTable paintCansRequired={result} />
    </div>
  )
}
