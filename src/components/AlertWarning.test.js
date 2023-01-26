import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AlertWarning from './AlertWarning'

describe('components/AlertWarning', () => {

  test('should show message if isVisible is true', () => {
    // ARRANGE
    const message = 'mock-message'
    const isVisible = true
    render(<AlertWarning isVisible={isVisible} message={message} />)

    expect(screen.getByText(message)).toBeVisible();

  })

  test('should NOT show message if isVisible is false', () => {
    // ARRANGE
    const message = 'mock-message'
    const isVisible = false
    render(<AlertWarning isVisible={isVisible} message={message} />)

    expect(screen.queryByText(message)).not.toBeInTheDocument();
  })
})