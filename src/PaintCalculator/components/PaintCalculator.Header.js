import React from "react"
import { useLanguage } from "../../languageContext"

export default function PaintCalculatorHeader() {
  const { texts } = useLanguage()
  return <>
    <h2>{texts.PAINT_CALCULATOR_HEADER.TITLE}</h2>
    <div className="alert-info">
      {texts.PAINT_CALCULATOR_HEADER.INFO}
    </div>
  </>
}