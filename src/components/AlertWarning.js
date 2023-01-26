import React from 'react';

export default function AlertWarning({isVisible, message}) {

  if (!isVisible) return null

  return <div className='alert-warning' role='alert'>{message}</div>
}