import LeastSquareMethod from "./LeastSquareMethod";
import Householder from "../slae/Householder";

export default function LocalDataSmoothing(x, y, m, k) {
    let newY = [...y];
    for (let i = k / 2; i < y.length - k / 2; i++) {
        let { system, freeMembers } = LeastSquareMethod(x.slice(i - k / 2, i + k / 2 + 1), y.slice(i - k / 2, i + k / 2 + 1), m);
        let ans = (Householder(system, freeMembers)).matrix;
        newY[i] = 0;
        for (let j = 0; j < m; j++) {
            newY[i] += ans[j] * (x[i] ** j);
        }
    }
    return newY;
}