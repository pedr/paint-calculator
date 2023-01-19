// @ts-nocheck
import calculatePaintCans, { countPaintCansNecessary } from './calculatePaint'

const countPaintCansNecessaryTestCase = [
  [
    9500,
    [
      { size: 18, label: '18L', quantity: 0 },
      { size: 3.6, label: '3.6L', quantity: 0 },
      { size: 2.5, label: '2.5L', quantity: 0 },
      { size: 0.5, label: '0.5L', quantity: 1 },
    ]
  ],
  [
    500,
    [
      { size: 18, label: '18L', quantity: 0 },
      { size: 3.6, label: '3.6L', quantity: 0 },
      { size: 2.5, label: '2.5L', quantity: 0 },
      { size: 0.5, label: '0.5L', quantity: 1 },
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
      { size: 18, label: '18L', quantity: 0 },
      { size: 3.6, label: '3.6L', quantity: 0 },
      { size: 2.5, label: '2.5L', quantity: 0 },
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
      { height1: 220, height2: 220, floor: 500, doors: 1, windows: 1 },
      { height1: 220, height2: 220, floor: 500, doors: 0, windows: 0 },
      { height1: 220, height2: 220, floor: 900, doors: 0, windows: 0 },
      { height1: 220, height2: 220, floor: 900, doors: 0, windows: 0 }
    ],
    // expected
    [
      { label: "18L", quantity: 0, size: 18 },
      { label: "3.6L", quantity: 3, size: 3.6 },
      { label: "2.5L", quantity: 0, size: 2.5 },
      { label: "0.5L", quantity: 2, size: 0.5 }
    ]
  ],
  [
    // walls
    [
      { height1: 220, height2: 220, floor: 500, doors: 0, windows: 0 },
      { height1: 220, height2: 220, floor: 500, doors: 0, windows: 0 },
      { height1: 220, height2: 220, floor: 900, doors: 0, windows: 0 },
      { height1: 220, height2: 220, floor: 900, doors: 0, windows: 0 },
    ],
    // expected
    [
      { label: "18L", quantity: 0, size: 18 },
      { label: "3.6L", quantity: 3, size: 3.6 },
      { label: "2.5L", quantity: 0, size: 2.5 },
      { label: "0.5L", quantity: 4, size: 0.5 }
    ]
  ],
]


test.each(calculatePaintCansTestCase)
  ('calculatePaintCans', (walls, expected) => {
    expect(calculatePaintCans(walls)).toEqual(expected);
  });