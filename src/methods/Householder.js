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

function round(matrix) {
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[0].length; j++) {
            matrix[i][j] = Number(matrix[i][j].toFixed(4));
        }
    }
}

function toRow(vector) {
    let newV = [[]];
    for (let i = 0; i < vector.length; i++) {
        newV[0].push(vector[i][0]);
    }
    return newV;
}

function toCol(vector) {
    let newV = [];
    for (let i = 0; i < vector[0].length; i++) {
        newV.push([vector[0][i]]);
    }
    return newV;
}

function transVector(vector) {
    if (vector.length > 1) return toRow(vector);
    else if (vector.length == 1) return toCol(vector);
    else return null;
}

function sub(matrix, subMatrix) {
    let mt = [];
    for (let i = 0; i < matrix.length; i++) {
        let row = [];
        for (let j = 0; j < matrix.length; j++) {
            row[j] = matrix[i][j] - subMatrix[i][j];
        }
        mt.push(row);
    }
    return mt;
}

export function housholder(mat, column) {
    let matrix = mat;
    let ansCol = column;
    let ed = [];
    
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix.length; j++) {
        row[j] = ((i === j) ? 1 : 0);
      }
      ed.push(row);
    }
    
    for(let i = 0; i < matrix.length - 1; i++) {
        let sum = 0;
        for(let j = i; j < matrix.length; j++) {
            sum += matrix[j][i] * matrix[j][i];
        }
        sum = Math.sqrt(sum);
        let s = Math.sign(-matrix[i][i]) * sum;
        let mu = 1 / Math.sqrt(2 * s * (s - matrix[i][i]));
        let w = [];
        for(let j = 0; j < matrix.length; j++) {
            if(j < i) w.push([0]);
            else w.push([(matrix[j][i] - s * ed[j][i]) * mu]);
        }
        let w_trans = transVector(w);
        for(let j = 0; j < w.length; j++) {
            w[j][0] *= 2;
        }
        round(w);
        let u = sub(ed, multi(w,w_trans));
        round(u);
        matrix = multi(u, matrix);
        round(matrix);
        ansCol = multi(u, ansCol);
        round(ansCol);
        console.log(`Iter:${i}`);
        console.log(w);
        console.log(w_trans);
        console.log(u);
        console.log(matrix);
        console.log(ansCol);
    }
    let col = Array(matrix.length).fill(0);
    for(let i = matrix.length - 1; i >= 0; i--) {
        let sum = 0;
        for(let j = matrix.length - 1; j >= i; j--) {
            if(j > i) {
                sum += matrix[i][j] * col[j];
            }
        }
        col[i] = ansCol[i][0] - sum;
        col[i] = Number((col[i] / matrix[i][i]).toFixed(3));
    }
    
    return {
        title: "Housholder",
        matrix:col
    };
};
