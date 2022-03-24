import Matrix from "../objects/Matrix";
import Vector from "../objects/Vector";

export default function Householder(matrix, freeMembers) {
    let A = matrix;
    let B = freeMembers;
    console.log(A);
    console.log(B);
    let data = [];

    for (let i = 0; i < A.rows; i++) {
        for (let j = 0; j < A.cols; j++) {
            data.push(((j === i) ? 1 : 0));
        }
    }

    let E = new Matrix({
        data: data,
        rows: A.rows,
    });

    for (let i = 0; i < A.rows - 1; i++) {
        let sum = 0;
        for (let j = i; j < A.rows; j++) {
            sum += A.data[j].data[i] ** 2;
        }
        sum = Math.sqrt(sum);
        let s = Math.sign(-A.data[i].data[i]) * sum;
        let mu = 1 / Math.sqrt(2 * s * (s - A.data[i].data[i]));
        let w = new Vector([]);

        for (let j = 0; j < A.rows; j++) {
            if (j < i) w.data.push(0);
            else w.data.push((A.data[j].data[i] - s * E.data[j].data[i]) * mu);
        }
        let pow_w = w.multiplyByScalar(2);
        pow_w.round();
        let U = E.sub(pow_w.colToRow(w));
        U.round();
        A = (U.multiplyByMatrix(A));
        B = U.mutliplyByVector(B);
        A.round();
        B.round();
    }

    let ans = new Vector((new Array()).fill(0));
    for (let i = A.rows - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = A.cols - 1; j >= i; j--) {
            if (j > i) {
                sum += A.data[i].data[j] * ans.data[j];
            }
        }
        ans.data[i] = B.data[i] - sum;
        ans.data[i] = Number((ans.data[i] / A.data[i].data[i]).toFixed(3));
    }
    return {
        title: "Housholder",
        matrix:ans.data
    };
}