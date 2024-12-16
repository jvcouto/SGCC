export default function splitArrayIntoChunks<R>(
  array: Array<R>,
  chunkSize: number
): Array<Array<R>> {
  const result = [];
  for (let i = 0; i < array?.length || 0; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result as Array<Array<R>>;
}
