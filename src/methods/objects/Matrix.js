import Vector from "./Vector";

export default class Matrix {
    constructor({ data, rows = data.length, transformed = false }) {
        this.rows = rows;
        this.cols = rows;
        this.data = data;
        if (!transformed) {
            this.cols = data.length / rows;
            this.data = this.TransformData()
        };
    }

    get data() {
        return this._data;
    }

    get rows() {
        return this._rows;
    }

    get cols() {
        return this._cols;
    }

    set data(data) { this._data = data; }

    set rows(rows) { this._rows = rows; }

    set cols(cols) { this._cols = cols; }

    valid(matrix) {
        return matrix instanceof Matrix;
    }

    TransformData() {
        let matrix = [];
        for (let i = 0; i < this.data.length; i += this.cols) {
            let row = [];
            for (let j = 0; j < this.cols; j++) {
                row.push(this.data[i + j]);
            }
            matrix.push(new Vector(row));
        }
        return matrix;
    }

    T() {
        let data = [];
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                data.push(this.data[j].data[i])
            }
        }
        return new Matrix({
            data: data,
            rows: this.cols,
        });
    }

    round() {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i].round();
        }
        return this;
    }

    add(matrix) {
        if (matrix.rows !== this.rows && !this.valid(matrix)) return null;
        let data = [];
        for (let i = 0; i < this.rows; i++) {
            data[i] = this.data[i].add(matrix.data[i]);
        }
        return new Matrix({
            data: data,
            rows: this.rows,
            transformed: true
        });
    }

    sub(matrix) {
        if (matrix.rows !== this.rows && !this.valid(matrix)) return null;
        let data = [];
        for (let i = 0; i < this.rows; i++) {
            data[i] = this.data[i].sub(matrix.data[i]);
        }
        return new Matrix({
            data: data,
            rows: this.rows,
            transformed: true
        });
    }

    multiplyByMatrix(mat) {
        if (!this.valid(mat) && mat.rows !== this.rows) return null;
        let data = [];
        let matrix = mat.T();
        for (let i = 0; i < this.rows; i++) {
            let vector = new Vector([]);
            for (let j = 0; j < mat.cols; j++) {
                vector.data.push(this.data[i].rowToCol(matrix.data[j]));
            }
            data.push(vector);
        }
        return new Matrix({
            data: data,
            rows: this.rows,
            transformed: true
        });
    }

    mutliplyByVector(vector) {
        if (this.cols === vector.data.length) {
            let newVector = new Vector([]);
            for (let i = 0; i < this.rows; i++) {
                newVector.data[i] = this.data[i].rowToCol(vector);
            }
            return newVector;
        }
        return null;
    }

    multiplyByScalar(scalar) {
        let data = [];
        for (let i = 0; i < this.rows; i++) {
            data[i] = this.data[i].multiplyByScalar(scalar);
        }
        return new Matrix({
            data: data,
            rows: this.rows,
            transformed: true
        });
    }
}
