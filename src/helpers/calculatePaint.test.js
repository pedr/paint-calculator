// @ts-nocheck
import { countPaintCansNecessary } from './calculatePaint'

const countPaintCansNecessaryTestCase = [
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

test.each(countPaintCansNecessaryTestCase)
  ('countPaintCansNecessary', (input, expected) => {
    expect(countPaintCansNecessary(input)).toEqual(expected);
  });
