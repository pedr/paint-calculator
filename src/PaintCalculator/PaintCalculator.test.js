import React from 'react'
import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import PaintCalculator from './PaintCalculator'
import { LanguageProvider } from '../languageContext'
import phrases from '../phrases'

describe('PaintCalculator', () => {

  const setup = () => {
    render(
      <LanguageProvider>
        <PaintCalculator />
      </LanguageProvider>
    )
  }

  const invalidInputTooSmall = [
    { value: '22', onElement: '0-height1' },
    { value: '22', onElement: '0-height2' },
    { value: '44', onElement: '0-floor' },

    { value: '22', onElement: '1-height1' },
    { value: '22', onElement: '1-height2' },
    { value: '44', onElement: '1-floor' },

    { value: '22', onElement: '2-height1' },
    { value: '22', onElement: '2-height2' },
    { value: '44', onElement: '2-floor' },

    { value: '22', onElement: '3-height1' },
    { value: '22', onElement: '3-height2' },
    { value: '44', onElement: '3-floor' },
  ]

  const validInputs = [
    { value: '1', onElement: '0-doors' },
    { value: '221', onElement: '0-height1' },
    { value: '222', onElement: '0-height2' },
    { value: '441', onElement: '0-floor' },

    { value: '223', onElement: '1-height1' },
    { value: '224', onElement: '1-height2' },
    { value: '442', onElement: '1-floor' },

    { value: '225', onElement: '2-height1' },
    { value: '226', onElement: '2-height2' },
    { value: '443', onElement: '2-floor' },

    { value: '227', onElement: '3-height1' },
    { value: '228', onElement: '3-height2' },
    { value: '444', onElement: '3-floor' },
  ]

  it('should show error message if button pressed without any inputs', () => {
    setup()

    userEvent.click(screen.getByRole('button'))

    expect(screen.getByText(phrases.pt.PAINT_CALCULATOR_FOOTER.ERROR)).toBeVisible();
  })


  it('should be able to see the results if checkForErrorsOnInputService returns no errors', () => {

    setup()

    validInputs.forEach(({ value, onElement }) => {
      userEvent.type(screen.getByTestId(onElement), value)
    })
    userEvent.click(screen.getByRole('button'))

    expect(screen.queryByText(phrases.pt.PAINT_CALCULATOR_FOOTER.ERROR)).not.toBeInTheDocument();
    expect(screen.getByTestId('paint-calculator-results')).toBeVisible();
  })

  it('should clean errors from screen if the second check does not return any errors', () => {
    
    setup()

    invalidInputTooSmall.forEach(({ value, onElement }) => {
      userEvent.type(screen.getByTestId(onElement), value)
    })
    // validation error, should show error alert and no result
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText(phrases.pt.PAINT_CALCULATOR_FOOTER.ERROR)).toBeVisible();
    expect(screen.queryByTestId('paint-calculator-results')).not.toBeInTheDocument();

    // validation accepted, should show result and have no error on screen
    validInputs.forEach(({ value, onElement }) => {
      userEvent.clear(screen.getByTestId(onElement))
      userEvent.type(screen.getByTestId(onElement), value)
    })
    userEvent.click(screen.getByRole('button'))
    expect(screen.queryByText(phrases.pt.PAINT_CALCULATOR_FOOTER.ERROR)).not.toBeInTheDocument();
    expect(screen.getByTestId('paint-calculator-results')).toBeVisible();
  })

  it('should NOT be able to update input fields with non numberic values', () => {
    setup()

    const qtyWindowsInputs = screen.getAllByText(phrases.pt.PAINT_CALCULATOR_FORM.QTY_WINDOWS)
  
    userEvent.type(qtyWindowsInputs[0], '-20')
    userEvent.type(qtyWindowsInputs[1], 'asdf1')
    userEvent.type(qtyWindowsInputs[2], '12asdf90')

    expect(screen.queryByDisplayValue('-20')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('20')).toBeVisible();

    expect(screen.queryByDisplayValue('asdf1')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeVisible();

    expect(screen.queryByDisplayValue('12asdf90')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('1290')).toBeVisible();
  })

  it('should be able to update input fields', () => {
    setup()

    const specs = [
      { expectedValue: '0', onElement: '0-doors' },
      { expectedValue: '1', onElement: '0-windows' },
      { expectedValue: '221', onElement: '0-height1' },
      { expectedValue: '222', onElement: '0-height2' },
      { expectedValue: '441', onElement: '0-floor' },

      { expectedValue: '2', onElement: '1-doors' },
      { expectedValue: '3', onElement: '1-windows' },
      { expectedValue: '223', onElement: '1-height1' },
      { expectedValue: '224', onElement: '1-height2' },
      { expectedValue: '442', onElement: '1-floor' },

      { expectedValue: '4', onElement: '2-doors' },
      { expectedValue: '5', onElement: '2-windows' },
      { expectedValue: '225', onElement: '2-height1' },
      { expectedValue: '226', onElement: '2-height2' },
      { expectedValue: '443', onElement: '2-floor' },

      { expectedValue: '6', onElement: '3-doors' },
      { expectedValue: '7', onElement: '3-windows' },
      { expectedValue: '227', onElement: '3-height1' },
      { expectedValue: '228', onElement: '3-height2' },
      { expectedValue: '444', onElement: '3-floor' },
    ]

    specs.forEach(({ expectedValue, onElement }) => {
      userEvent.type(screen.getByTestId(onElement), expectedValue)
      expect(screen.getByDisplayValue(expectedValue)).toHaveAttribute('data-testid', onElement)
    })
  })
})