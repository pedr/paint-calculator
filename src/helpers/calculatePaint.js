
/** 
 * Calculate how many cans of each size you need given an area in centimeters
 * @param {number} squareCentimeters in centimeters
 * @return {Object[]} paintCans array of objects with size, label and quantity
 */
export function calculatePaintCans(squareCentimeters) {
  const HOW_MANY_CMS_A_LITER_CAN_PAINT = 500;

  const paintCans = [
    { size: 18, label: '18L', quantity: 0 },
    { size: 3.6, label: '3.6L', quantity: 0 },
    { size: 2.5, label: '2.5L', quantity: 0 },
    { size: 0.5, label: '0.5L', quantity: 0 },
  ];

  for (let i = 0; i < paintCans.length; i++) {
    const howManyCansForTheArea = squareCentimeters / (paintCans[i].size * HOW_MANY_CMS_A_LITER_CAN_PAINT);
    if (howManyCansForTheArea >= 1) {
      squareCentimeters -= Math.floor(howManyCansForTheArea) * paintCans[i].size * HOW_MANY_CMS_A_LITER_CAN_PAINT
      paintCans[i].quantity = Math.floor(howManyCansForTheArea)
    }
  }

  if (squareCentimeters > 0) {
    paintCans[paintCans.length - 1].quantity += 1
  }

  return paintCans
}