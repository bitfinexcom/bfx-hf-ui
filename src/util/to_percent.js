/**
 * Returns a string representing percentage value 2 decimal
 *
 * @param {Number} normalized percentage ( 0..1 )
 * @return {String} percentage
 */
export default normalized => (normalized * 100).toFixed(2)
