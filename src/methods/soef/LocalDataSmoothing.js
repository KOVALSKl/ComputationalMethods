import LeastSquareMethod from "./LeastSquareMethod";
import Householder from "../slae/Householder";

export default function LocalDataSmoothing(x, y, m, k = 0, labels) {
  console.log(x);
  console.log(y);
  if (k !== 0) {
    return LocalDataSmoothingWithNeighbours(x, y, m, k);
  }
  return BaseLocalDataSmoothing(x, y, m, labels);
}

function LocalDataSmoothingWithNeighbours(x, y, m, k) {
  let newY = [...y];
  for (let i = k / 2; i < y.length - k / 2; i++) {
    let { system, freeMembers } = LeastSquareMethod(
      x.slice(i - k / 2, i + k / 2 + 1),
      y.slice(i - k / 2, i + k / 2 + 1),
      m
    );
    let ans = Householder(system, freeMembers).matrix;
    newY[i] = 0;
    for (let j = 0; j < m; j++) {
      newY[i] += ans[j] * x[i] ** j;
    }
  }
  return newY;
}

function BaseLocalDataSmoothing(x, y, m, labels) {
  let { system, freeMembers } = LeastSquareMethod(x, y, m);
  let ans = Householder(system, freeMembers).matrix;
  let data = new Array(labels.length).fill(0);
  for (let i = 0; i < labels.length; i++) {
    for (let j = 0; j < m; j++) {
      data[i] += ans[j] * labels[i] ** j;
    }
  }
  return data;
}
