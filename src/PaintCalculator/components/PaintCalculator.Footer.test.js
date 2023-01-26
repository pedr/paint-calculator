import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import PaintCalculatorFooter from './PaintCalculator.Footer'
import { LanguageProvider } from '../../languageContext'

describe('PaintCalculator.Footer', () => {

  it('On button press, call callback function handleOnSubmit', () => {
    // ARRANGE
    const errors = []
    const handleOnSubmit = jest.fn()
    const result = []
    render(
      <LanguageProvider>
        <PaintCalculatorFooter errors={errors} handleOnSubmit={handleOnSubmit} result={result} />
      </LanguageProvider>
    )

    userEvent.click(screen.getByRole('button'))

    expect(handleOnSubmit).toHaveBeenCalledTimes(1);
  })

  it('If errors array lenght is more than 0, show error message', () => {
    // ARRANGE
    const errors = [ true ]
    const handleOnSubmit = jest.fn()
    const result = []
    render(
      <LanguageProvider>
        <PaintCalculatorFooter errors={errors} handleOnSubmit={handleOnSubmit} result={result} />
      </LanguageProvider>
    )

    expect(screen.getByRole('alert')).toBeVisible();
  })

  it('If errors array lenght is 0, error message should not be visible', () => {
    // ARRANGE
    const errors = []
    const handleOnSubmit = jest.fn()
    const result = []
    render(
      <LanguageProvider>
        <PaintCalculatorFooter errors={errors} handleOnSubmit={handleOnSubmit} result={result} />
      </LanguageProvider>
    )

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  })
})