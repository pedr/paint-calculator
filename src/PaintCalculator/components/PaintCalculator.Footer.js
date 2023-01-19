import React from "react"
import AlertWarning from "../../components/AlertWarning"
import PaintCalculatorResultTable from "./form/components/PaintCalculator.ResultTable"

export default function PaintCalculatorFooter({ errors, handleOnSubmit, result }) {
  return (
    <div className='paint-calculator-control-wrapper'>
      <AlertWarning
        isVisible={errors.length > 0}
        message="Há algo errado nos dados inseridos, verificar e corrigir."
      />
      <button onClick={handleOnSubmit}>Calcular a quantidade de tintas necessaria</button>
      <PaintCalculatorResultTable paintCansRequired={result} />
    </div>
  )
}
