function run(matrix, callback) {
    const opt = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const checkNum = (i, j, num) => {
        let result = true;
    
        const areaX = Math.floor(i/3);
        const areaY = Math.floor(j/3);
        for (let x = 3 * areaX; x < 3 + 3 * areaX; x++) {
            for (let y = 3 * areaY; y < 3 + 3 * areaY; y++) {
                if (matrix[x][y] == num) {
                    result = false;
                    break;
                }
            }
            if (!result) break;
        }
    
        result = result && matrix[i].findIndex(x => x == num) < 0;
        result = result && matrix.map(x => x[j]).findIndex(x => x == num) < 0;
    
        return result;
    }

    if (Math.min(...matrix.map(x => Math.min(...x))) != 0) {
        callback(matrix);
    }
    
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        for (let j = 0; j < row.length; j++) {
            const col = row[j];
            if (col <= 0) {
                for (let k = 0; k < opt.length; k++) {
                    const value = opt[k];
                    if (checkNum(i, j, value)) {
                        matrix[i][j] = value;
                        run(matrix, callback);
                        matrix[i][j] = 0;
                    }
                }
                return;
            }
        }
    }
}

// Test
const matrix = [ [0, 0, 0, 0, 0, 3, 0, 5, 0],
                 [8, 5, 0, 0, 7, 0, 0, 0, 4],
                 [7, 0, 2, 0, 5, 0, 1, 0, 0],
                 [0, 0, 0, 0, 6, 7, 0, 0, 5],
                 [0, 8, 0, 0, 9, 1, 6, 0, 2],
                 [0, 7, 5, 0, 0, 0, 9, 0, 8],
                 [0, 0, 0, 0, 3, 0, 7, 8, 9],
                 [0, 0, 7, 0, 0, 2, 5, 0, 1],
                 [5, 0, 0, 0, 1, 0, 0, 0, 3] ];

run(matrix, result => {
    console.log(result);
});
