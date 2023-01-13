// @ts-nocheck
import { calculatePaintCans } from './calculatePaint'

const calculatePaintCansTestCase = [
  [
    9500,
    [
      { size: 18, label: '18L', quantity: 1 },
      { size: 3.6, label: '3.6L', quantity: 0 },
      { size: 2.5, label: '2.5L', quantity: 0 },
      { size: 0.5, label: '0.5L', quantity: 2 },
    ]
  ],
  [
    500,
    [
      { size: 18, label: '18L', quantity: 0 },
      { size: 3.6, label: '3.6L', quantity: 0 },
      { size: 2.5, label: '2.5L', quantity: 0 },
      { size: 0.5, label: '0.5L', quantity: 2 },
    ]
  ],
  [
    250,
    [
      { size: 18, label: '18L', quantity: 0 },
      { size: 3.6, label: '3.6L', quantity: 0 },
      { size: 2.5, label: '2.5L', quantity: 0 },
      { size: 0.5, label: '0.5L', quantity: 1 },
    ]
  ],
  [
    12300,
    [
      { size: 18, label: '18L', quantity: 1 },
      { size: 3.6, label: '3.6L', quantity: 1 },
      { size: 2.5, label: '2.5L', quantity: 1 },
      { size: 0.5, label: '0.5L', quantity: 1 },
    ]
  ],
]

test.each(calculatePaintCansTestCase)
  ('calculatePaintCans', (input, expected) => {
    expect(calculatePaintCans(input)).toEqual(expected);
  });
