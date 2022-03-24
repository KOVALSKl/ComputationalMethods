import Vector from "../objects/Vector";
import Matrix from "../objects/Matrix";

export default function LeastSquareMethod(x, y, m) {
    let X = new Vector(x);
    let Y = new Vector(y);

    let data = [];

    for(let i = 0; i < x.length; i++) {
        for(let j = 0; j < m; j++) {
            data.push((j === 0) ? 1 : X.data[i] ** j);
        }
    }

    let F = new Matrix({
        data: data,
        rows: X.data.length
    });

    let FT = F.T();
    let sys = FT.multiplyByMatrix(F);
    let freeMembers = (FT.mutliplyByVector(Y)).round();
    return {
        system: sys,
        freeMembers: freeMembers
    }
}