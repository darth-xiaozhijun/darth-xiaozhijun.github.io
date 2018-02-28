/**
 * 获取每个格子距顶端的距离
 * @param i
 * @param j
 * @returns {number}
 */
function getPosTop(i,j) {
    return 20 + 120*i;
}

/**
 * 获取每个格子距左端的距离
 * @param i
 * @param j
 * @returns {number}
 */
function getPosLeft(i,j) {
    return 20 + 120*j;
}

/**
 *
 * @param number
 * @returns {string}
 */
function getNumberOfBackgroundColor(number){
    switch (number) {
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
}

/**
 *
 * @param number
 * @returns {string}
 */
function getNumberColor(number) {
    if (number <= 4){
        return "#776e65";
    }
    return "white";
}

/**
 *
 * @param board
 * @returns {boolean}
 */
function canMoveLeft(board) {
    for (var i=0; i<4; i++){
        for (var j=1; j<4; j++){
            if (board[i][j] != 0){
                //当前数字格的左边第一个值为0
                //当前数字格的值与左边第一个数字格的值相等
                if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]){  //只要当前数字格前面一个数字格为空就可以移动
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 *
 * @param row
 * @param col1
 * @param col2
 * @param board
 * @returns {boolean}
 */
function noBlokHorizontalCol(row,col1,col2,board) {
    for (var i=col1+1; i<col2; i++){  //中间的两个格子，所以是从左边第二个开始遍历，到左边第三个结束
        if (board[row][i] != 0){  //数字格不为空
            return false;
        }
    }
    return true;
}

function noBlokHorizontalRow(row1,row2,col,board) {
    for (var i=row1+1; i<row2; i++){  //中间的两个格子，所以是从左边第二个开始遍历，到左边第三个结束
        if (board[i][col] != 0){  //数字格不为空
            return false;
        }
    }
    return true;
}

function canMoveUp(board){
    for (var i=1; i<4; i++){
        for (var j=0; j<4; j++){
            if (board[i][j] != 0){
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveRight(board) {
    for (var i=0; i<4; i++){
        for (var j=2; j>=0; j--){
            if (board[i][j] != 0){
                if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }

    return false;
}

function canMoveDown(board) {
    for (var i=2; i>=0; i--){
        for (var j=0; j<4; j++){
            if (board[i][j] != 0){
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function nospace(board) {
    for (var i=0; i<4; i++){
        for (var j=0; j<4; j++){
            if (board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function nomove(board) {
    if (canMoveUp(board) || canMoveDown(board) || canMoveLeft(board) || canMoveRight(board)){
        return false;
    }
    return true;
}