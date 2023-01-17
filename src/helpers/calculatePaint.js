/**
 * Function that will calculate which and how many paint cans are necessary for a number of walls. 
 * All input measure should be in centimeters
 * @param {Object[]} walls 
 * @param {number} walls[].height1 
 * @param {number} walls[].height2 
 * @param {number} walls[].floor
 * @param {number} walls[].windows
 * @param {number} walls[].doors
 * @param {Object[]} negativeSpace 
 * @param {number} negativeSpace[].height 
 * @param {number} negativeSpace[].width 
 * @param {number} negativeSpace[].quantity 
 */
export default function calculatePaintCans(walls, negativeSpace = []) {
  const totalArea = walls.reduce((total, wall) => {
    return total + calculateAreaOfWall(wall);
  }, 0);

  const negativeSpaceOccupied = negativeSpace.reduce((total, nSpace) => {
    return total + nSpace.width * nSpace.height * nSpace.quantity
  }, 0);

  const areaToBePainted = totalArea - negativeSpaceOccupied;

  return countPaintCansNecessary(areaToBePainted);
}

/**
 * @param {Object} wall
 * @param {number} wall.height1 
 * @param {number} wall.height2 
 * @param {number} wall.floor
 */
function calculateAreaOfWall(wall) {
  return ((wall.height1 + wall.height2) * wall.floor) / 2
}


/** 
 * Calculate how many cans of each size you need given an area in centimeters
 * @param {number} squareCentimeters in centimeters
 * @return {Object[]} paintCans array of objects with size, label and quantity
 */
export function countPaintCansNecessary(squareCentimeters) {
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