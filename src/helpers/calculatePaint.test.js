// @ts-nocheck
import calculatePaintCans, { countPaintCansNecessary } from './calculatePaint'

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

const calculatePaintCansTestCase = [
  [
    // walls
    [
      { height1: 220, height2: 220, floor: 500 },
      { height1: 220, height2: 220, floor: 500 },
      { height1: 220, height2: 220, floor: 900 },
      { height1: 220, height2: 220, floor: 900 },
    ],
    // negativeSpace
    [
      { height: 200, width: 120, quantity: 1 },
      { height: 80, width: 190, quantity: 1 },
    ],
    // expected
    [
      { label: "18L", quantity: 64, size: 18 },
      { label: "3.6L", quantity: 0, size: 3.6 },
      { label: "2.5L", quantity: 0, size: 2.5 },
      { label: "0.5L", quantity: 4, size: 0.5 }
    ]
  ],
  [
    // walls
    [
      { height1: 220, height2: 220, floor: 500 },
      { height1: 220, height2: 220, floor: 500 },
      { height1: 220, height2: 220, floor: 900 },
      { height1: 220, height2: 220, floor: 900 },
    ],
    // negativeSpace
    [
    ],
    // expected
    [
      { label: "18L", quantity: 68, size: 18 },
      { label: "3.6L", quantity: 2, size: 3.6 },
      { label: "2.5L", quantity: 0, size: 2.5 },
      { label: "0.5L", quantity: 2, size: 0.5 }
    ]
  ],
]


test.each(calculatePaintCansTestCase)
  ('calculatePaintCans', (walls, negativeSpace, expected) => {
    expect(calculatePaintCans(walls, negativeSpace)).toEqual(expected);
  });