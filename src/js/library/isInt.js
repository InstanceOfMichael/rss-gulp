/**
 * Informs you that the STRING or NUMBER is an integer
 */
function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}
