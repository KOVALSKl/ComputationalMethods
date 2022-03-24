function vectorSum(v1, v2) {
    let v3 = [];
    for (let i = 0; i < v1.length; i++) {
        v3[i] = v1[i] + v2[i];
    }
    return v3;
}

function vectorSub(v1, v2) {
    let v3 = [];
    for (let i = 0; i < v1.length; i++) {
        v3[i] = v1[i] - v2[i];
    }
    return v3;
}

function multiplyByScalar(v1, scalar) {
    let v2 = [];
    for (let i = 0; i < v1.length; i++) {
        v2[i] = v1[i] * scalar;
    }
    return v2;
}

function scalarMultiply(v1, v2) {
    let scalar = 0;
    for (let i = 0; i < v1.length; i++) {
        scalar += v1[i] * v2[i];
    }
    return scalar;
}

function multiplyMatrixByVector(matrix, vector) {
    let ansVec = [];
    for (let i = 0; i < matrix.length; i++) {
        ansVec.push(scalarMultiply(matrix[i], vector));
    }
    return ansVec;
}

function multi(matrix, multiMatrix) {
    let ansMatrix = [];
    if (matrix[0].length === multiMatrix.length) {
        for (let i = 0; i < matrix.length; i++) {
            let row = [];
            for (let k = 0; k < multiMatrix[0].length; k++) {
                row[k] = 0;
                for (let j = 0; j < multiMatrix.length; j++) {
                    row[k] += matrix[i][j] * multiMatrix[j][k];
                }
            }
            ansMatrix.push(row);
        }
    }
    return ansMatrix;
}

function round(v1) {
    for (let i = 0; i < v1.length; i++) {
        v1[i] = Number(v1[i].toFixed(4));
    }
    return v1;
}

function getVectorNorm(vector) {
    let length = 0;
    for (let i = 0; i < vector.length; i++) {
        length += vector[i] * vector[i];
    }
    return Math.sqrt(length);
}

function normalize(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let norm = getVectorNorm(matrix[i]);
        matrix[i] = multiplyByScalar(matrix[i], (1 / norm));
    }
}

function T(matrix) {
    for (let i = 0; i < matrix.length - 1; i++) {
        for (let j = i + 1; j < matrix.length; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
}

export function gramSchmidt(mat, column) {
    let matrix = mat;
    T(matrix);

    let ansCol = [];

    for(let i = 0; i < column.length; i++) ansCol.push(column[i][0]);

    let Q = [matrix[0]];

    for (let j = 1; j < matrix.length; j++) {
        let scal = -scalarMultiply(matrix[j], Q[0]) / scalarMultiply(Q[0], Q[0]);
        let sumVec = multiplyByScalar(Q[0], scal);
        for (let i = 1; i < j; i++) {
            scal = -scalarMultiply(matrix[j], Q[i]) / scalarMultiply(Q[i], Q[i]);
            let vector = multiplyByScalar(Q[i], scal);
            sumVec = (j === 1) ? sumVec : vectorSum(sumVec, vector);
        }
        Q.push(round(vectorSum(matrix[j], sumVec)));
    }

    normalize(Q);
    for (let i = 0; i < Q.length; i++) {
        round(Q[i]);
    }
    //   console.log(Q);
    T(matrix);
    matrix = multi(Q, matrix);
    for (let i = 0; i < matrix.length; i++) {
        round(matrix[i]);
    }
    ansCol = multiplyMatrixByVector(Q, ansCol);
    round(ansCol);
    //   console.log(matrix);
    //   console.log(ansCol);


    let col = Array(matrix.length).fill(0);
    for (let i = matrix.length - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = matrix.length - 1; j >= i; j--) {
            if (j > i) {
                sum += matrix[i][j] * col[j];
            }
        }
        //   console.log(`sum=${sum}`);
        //   console.log(`ansCol=${ansCol[i]}`);
        col[i] = ansCol[i] - sum;
        col[i] = Number((col[i] / matrix[i][i]).toFixed(3));
    }

    console.log(col);
    return {
        title: "Gram-Schmidt Orthogonalization",
        matrix:col
    };
}