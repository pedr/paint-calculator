import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { LanguageProvider } from '../../languageContext'
import PaintCalculatorHeader from './PaintCalculator.Header'
import phrases from '../../phrases'

describe('PaintCalculator.Header', () => {

  it('has the required texts', () => {
    // ARRANGE
    render(
      <LanguageProvider>
        <PaintCalculatorHeader />
      </LanguageProvider>
    )

    expect(screen.getByText(phrases.pt.PAINT_CALCULATOR_HEADER.TITLE)).toBeVisible();
    expect(screen.getByText(phrases.pt.PAINT_CALCULATOR_HEADER.INFO)).toBeVisible();
  })
})