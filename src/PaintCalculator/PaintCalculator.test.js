import React from 'react'
import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import PaintCalculator from './PaintCalculator'
import { LanguageProvider } from '../languageContext'
import phrases from '../phrases'

function populateInputsWithGenericValues(heightLeftInputs, heightRightInputs, floorInputs) {
  userEvent.type(heightLeftInputs[0], '220')
  userEvent.type(heightLeftInputs[1], '220')
  userEvent.type(heightLeftInputs[2], '220')
  userEvent.type(heightLeftInputs[3], '220')

  userEvent.type(heightRightInputs[0], '220')
  userEvent.type(heightRightInputs[1], '220')
  userEvent.type(heightRightInputs[2], '220')
  userEvent.type(heightRightInputs[3], '220')

  userEvent.type(floorInputs[0], '440')
  userEvent.type(floorInputs[1], '440')
  userEvent.type(floorInputs[2], '440')
  userEvent.type(floorInputs[3], '440')

}

describe('PaintCalculator', () => {

  const setup = ({ calculatePaintCansService, checkForErrorsOnInputService }) => {
    render(
      <LanguageProvider>
        <PaintCalculator
          calculatePaintCansService={calculatePaintCansService}
          checkForErrorsOnInputService={checkForErrorsOnInputService}
        />
      </LanguageProvider>
    )
  }

  it('should show error message if button pressed without any inputs', () => {
    const mockCalculatePaintCansService = jest.fn(() => ([]))
    setup({
      calculatePaintCansService: mockCalculatePaintCansService,
      checkForErrorsOnInputService: undefined
    })

    userEvent.click(screen.getByRole('button'))

    expect(screen.getByText(phrases.pt.PAINT_CALCULATOR_FOOTER.ERROR)).toBeVisible();
    expect(mockCalculatePaintCansService).toHaveBeenCalledTimes(0);
  })


  it('should be able to see the results if checkForErrorsOnInputService returns no errors', () => {
    const noErrorsFoundOnInput = jest.fn(() => ({ errors: [], validatedInputs: [] }))

    setup({
      calculatePaintCansService: undefined,
      checkForErrorsOnInputService: noErrorsFoundOnInput
    })

    userEvent.click(screen.getByRole('button'))

    expect(screen.queryByText(phrases.pt.PAINT_CALCULATOR_FOOTER.ERROR)).not.toBeInTheDocument();
    expect(screen.getByTestId('paint-calculator-results')).toBeVisible();
  })

  it('should be able to see results without any errors on screen if no errors are found on a second submit', () => {
    const withErrors = { errors: [true], validatedInputs: [] }
    const withoutErrors = { errors: [], validatedInputs: [] }
    const checkForErrorsMock = jest.fn();
    
    checkForErrorsMock
      .mockReturnValueOnce(withErrors)
      .mockReturnValueOnce(withoutErrors)

    setup({
      calculatePaintCansService: undefined,
      checkForErrorsOnInputService: checkForErrorsMock
    })

    // validation error, should show error alert and no result
    userEvent.click(screen.getByRole('button'))
    expect(screen.getByText(phrases.pt.PAINT_CALCULATOR_FOOTER.ERROR)).toBeVisible();
    expect(screen.queryByTestId('paint-calculator-results')).not.toBeInTheDocument();

    // validation accepted, should show result and have no error on screen
    userEvent.click(screen.getByRole('button'))
    expect(screen.queryByText(phrases.pt.PAINT_CALCULATOR_FOOTER.ERROR)).not.toBeInTheDocument();
    expect(screen.getByTestId('paint-calculator-results')).toBeVisible();
  })

  it('should NOT be able to update input fields with non alphanumberic values', () => {
    setup({
      calculatePaintCansService: undefined,
      checkForErrorsOnInputService: undefined
    })

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
    setup({
      calculatePaintCansService: undefined,
      checkForErrorsOnInputService: undefined
    })

    const heightLeftInputs = screen.getAllByText(phrases.pt.PAINT_CALCULATOR_FORM.HEIGHT_LEFT)
    const heightRightInputs = screen.getAllByText(phrases.pt.PAINT_CALCULATOR_FORM.HEIGHT_RIGHT)
    const floorInputs = screen.getAllByText(phrases.pt.PAINT_CALCULATOR_FORM.FLOOR)
    const qtyWindowsInputs = screen.getAllByText(phrases.pt.PAINT_CALCULATOR_FORM.QTY_WINDOWS)
    const qtyDoorsInputs = screen.getAllByText(phrases.pt.PAINT_CALCULATOR_FORM.QTY_DOORS)

    userEvent.type(heightLeftInputs[0], '221')
    userEvent.type(heightLeftInputs[1], '222')
    userEvent.type(heightLeftInputs[2], '223')
    userEvent.type(heightLeftInputs[3], '224')

    userEvent.type(heightRightInputs[0], '231')
    userEvent.type(heightRightInputs[1], '232')
    userEvent.type(heightRightInputs[2], '233')
    userEvent.type(heightRightInputs[3], '234')

    userEvent.type(floorInputs[0], '441')
    userEvent.type(floorInputs[1], '442')
    userEvent.type(floorInputs[2], '443')
    userEvent.type(floorInputs[3], '444')

    userEvent.type(qtyWindowsInputs[0], '0')
    userEvent.type(qtyWindowsInputs[1], '1')
    userEvent.type(qtyWindowsInputs[2], '2')
    userEvent.type(qtyWindowsInputs[3], '3')

    userEvent.type(qtyDoorsInputs[0], '4')
    userEvent.type(qtyDoorsInputs[1], '5')
    userEvent.type(qtyDoorsInputs[2], '6')
    userEvent.type(qtyDoorsInputs[3], '7')

    expect(screen.getByDisplayValue('221')).toBeVisible();
    expect(screen.getByDisplayValue('222')).toBeVisible();
    expect(screen.getByDisplayValue('223')).toBeVisible();
    expect(screen.getByDisplayValue('224')).toBeVisible();

    expect(screen.getByDisplayValue('231')).toBeVisible();
    expect(screen.getByDisplayValue('232')).toBeVisible();
    expect(screen.getByDisplayValue('233')).toBeVisible();
    expect(screen.getByDisplayValue('234')).toBeVisible();

    expect(screen.getByDisplayValue('441')).toBeVisible();
    expect(screen.getByDisplayValue('442')).toBeVisible();
    expect(screen.getByDisplayValue('443')).toBeVisible();
    expect(screen.getByDisplayValue('444')).toBeVisible();

    expect(screen.getByDisplayValue('0')).toBeVisible();
    expect(screen.getByDisplayValue('1')).toBeVisible();
    expect(screen.getByDisplayValue('2')).toBeVisible();
    expect(screen.getByDisplayValue('3')).toBeVisible();

    expect(screen.getByDisplayValue('4')).toBeVisible();
    expect(screen.getByDisplayValue('5')).toBeVisible();
    expect(screen.getByDisplayValue('6')).toBeVisible();
    expect(screen.getByDisplayValue('7')).toBeVisible();
  })
})