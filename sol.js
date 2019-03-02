/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    // a 2-dimensional array
    var conversion = "";
    var matrix = new Array();
    var marginCols = (numRows - 2 < 0) ? 0 : numRows - 2;
    var colFlag = true;
    var strLength = s.length;
    var i = 0;
    var posIndicator;
    while(i < strLength) {
        var colArray = new Array();
        if(colFlag) {
            var j = 0;
          	posIndicator = marginCols;
            while(j < numRows) {
                if(i < strLength) {
                    colArray.push(s.charAt(i));
                  	i++;
                }
                else {
                    colArray.push(" ");
                }
                j++;
            }
            colFlag = (marginCols === 0) ? true : false;
        }
        else {
            var k = 0;
            while(k < numRows) {
                if(k === posIndicator) {
                    colArray.push(s.charAt(i));
                }
                else {
                    colArray.push(" ");
                }
                k++;
            }
          	posIndicator--;
          	colFlag = (posIndicator === 0) ? true : false;
            i++;
        }
        matrix.push(colArray);
    }
    // parse matrix
    var matrixLength = matrix.length;
    var p;
    var q;
    for(p = 0; p < numRows; p++) {
        for(q = 0; q < matrixLength; q++) {
            conversion += matrix[q][p];
        }
    }
    conversion = conversion.split(' ').join('');
    return conversion;
};
