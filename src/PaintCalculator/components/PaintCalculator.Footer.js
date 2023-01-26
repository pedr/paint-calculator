import React from "react"
import AlertWarning from "../../components/AlertWarning"
import PaintCalculatorResultTable from "./form/components/PaintCalculator.ResultTable"
import { useLanguage } from "../../languageContext"

export default function PaintCalculatorFooter({ errors, handleOnSubmit, result }) {
  const { texts } = useLanguage()

  return (
    <div className='paint-calculator-control-wrapper'>
      <AlertWarning
        isVisible={errors.length > 0}
        message={texts.PAINT_CALCULATOR_FOOTER.ERROR}
      />
      <button onClick={handleOnSubmit}>{texts.PAINT_CALCULATOR_FOOTER.BUTTON}</button>
      <PaintCalculatorResultTable paintCansRequired={result} />
    </div>
  )
}
