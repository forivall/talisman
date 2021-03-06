/**
 * Talisman metrics/distance/hamming
 * ==================================
 *
 * Function computing the Hamming distance.
 *
 * [Reference]:
 * https://en.wikipedia.org/wiki/Hamming_distance
 *
 * [Article]:
 * Hamming, Richard W. (1950), "Error detecting and error correcting codes",
 * Bell System Technical Journal 29 (2): 147–160
 *
 * [Tags]: metric, vector space, string metric.
 */

/**
 * Function returning the Hamming distance between two sequences.
 *
 * @param  {mixed}  a - The first sequence to process.
 * @param  {mixed}  b - The second sequence to process.
 * @return {number}   - The Hamming distance between a & b.
 *
 * @throws {Error} The function expects sequences of equal length.
 */
export default function hamming(a, b) {

  if (a === b)
    return 0;

  if (a.length !== b.length)
    throw Error('talisman/metrics/distance/hamming: given sequences are not of equal length.');

  let distance = 0;

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i])
      distance++;
  }

  return distance;
}

/**
 * Function returning the normalized Hamming distance between two sequences.
 *
 * @param  {mixed}  a - The first sequence to process.
 * @param  {mixed}  b - The second sequence to process.
 * @return {number}   - The normalized Hamming distance between a & b.
 */
export function normalizedDistance(a, b) {

  if (a === b)
    return 0;

  if (a.length > b.length)
    [a, b] = [b, a];

  let distance = b.length - a.length;

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] !== b[i])
      distance++;
  }

  return distance / b.length;
}

/**
 * Function returning the normalized Hamming similarity between two sequences.
 *
 * @param  {mixed}  a - The first sequence to process.
 * @param  {mixed}  b - The second sequence to process.
 * @return {number}   - The normalized Hamming similarity between a & b.
 */
export function normalizedSimilarity(a, b) {
  return 1 - normalizedDistance(a, b);
}

/**
 * Function returning the Hamming distance between two numbers using only
 * bitwise operators.
 *
 * Note that this implementation uses a loop in O(k) time, k being the number
 * of bits set. There are other implementations possible using arithmetics but
 * litterature seems to agree that this does not speedup the computation and
 * since JavaScript does not have a direct access to processor low-level ops
 * such as popcount, this should be the most performant we can do now.
 *
 * @param  {mixed}  a - The first number to process.
 * @param  {mixed}  b - The second number to process.
 * @return {number}   - The Hamming distance between a & b.
 */
export function bitwise(a, b) {
  let d = 0,
      xor = a ^ b;

  while (xor) {
    d++;
    xor &= xor - 1;
  }

  return d;
}
