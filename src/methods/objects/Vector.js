import Matrix from "./Matrix";

export default class Vector {
  constructor(data) {
    this.data = data;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }

  valid(vector) {
    return vector instanceof Vector;
  }

  round() {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] = Number(this.data[i].toFixed(4));
    }
    return this;
  }

  add(vector) {
    let data = [];
    if (this.valid(vector) && vector.data.length === this.data.length) {
      for (let i = vector.data.length; i--; ) {
        data[i] = this.data[i] + vector.data[i];
      }
    }
    return new Vector(data);
  }

  sub(vector) {
    let data = [];
    if (this.valid(vector) && vector.data.length === this.data.length) {
      for (let i = vector.data.length; i--; ) {
        data[i] = this.data[i] - vector.data[i];
      }
    }
    return new Vector(data);
  }

  colToRow(vector) {
    if (this.valid(vector)) {
      let data = [];
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < vector.data.length; j++) {
          data.push(this.data[i] * vector.data[j]);
        }
      }
      return new Matrix({
        data: data,
        rows: this.data.length,
      });
    }
    return null;
  }

  rowToCol(vector) {
    if (this.valid(vector) && vector.data.length === this.data.length) {
      let sum = 0;
      for (let i = 0; i < this.data.length; i++) {
        sum += this.data[i] * vector.data[i];
      }
      return sum;
    }
    return null;
  }

  multiplyByScalar(scalar) {
    let data = this.data.map((item) => item * scalar);
    return new Vector(data);
  }
}
