export default function hasValuesFromArray(set, arr) {
  return arr.every((ele) => set.has(ele));
}
