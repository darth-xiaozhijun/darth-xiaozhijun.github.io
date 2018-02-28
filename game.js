//keydown事件表示键盘被按下
$(document).keydown(function (event) {       //event是keydown事件自带的
    switch (event.keyCode){
        case 37://left左
            //moveleft()方法完成向左移动的逻辑，返回值是Boolean类型，判断是否可以向左移动
            if (moveLeft()){
                //重新的生成一个数字
                setTimeout("generateOneNumber()",210);
                //判断当这次移动完成后，游戏是否结束
                setTimeout("isgameover()",300);
            }
            break;
        case 38://up上
            if (moveUp()){
                //重新生成一个数字
                setTimeout("generateOneNumber()",210);
                //判断当这次移动完成后，游戏是否结束
                setTimeout("isgameover()",300);
            }
            break;
        case 39://right右
            if (moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40://down下
            if (moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
        default:
            break;
    }
});

function moveLeft() {
    //返回值是Boolean类型，判断是否可以向左移动
    if (! canMoveLeft(board)){
        //当前的格子无法移动
        return false;
    }

    //move left完成向左移动的逻辑
    for (var i=0; i<4; i++){  //行
        for (var j=1; j<4; j++){  //列，左边第一列不能移动，所以从1开始遍历
            if (board[i][j] != 0){  //一定不是0(初始化为空的数字格)，说明当前数字格是有值的(2,4....)，需要移动
                //向左移动的逻辑
                for (var k=0; k<j; k++){  //移动遍历的是前面三个数字格的内容，第四个格子是(i,j)
                    // 向左移动逻辑还要分成两种情况
                    // 一种是当前值不为0的数字格左边的数字格必须值为0并且中间的数字格必须值也为0
                    if (board[i][k] == 0 && noBlokHorizontalCol(i,k,j,board)){
                        //才能向左移动
                        //向左移动动画
                        showMoveAnimation(i,j,i,k);//当前表格子，指定表格子
                        board[i][k] = board[i][j]; //把当前表格子的值赋值给自动表格子
                        board[i][j] = 0;//把当前表格子（想要移动的格子）的值赋值为0，表示空
                    }else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i,k,j,board) && !hasConflicted[i][k]){
                        // 一种是当前值不为0的数字格与左边的数字格值相等并且中间的数字格必须值也为0
                        //才能向左移动
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateGridView();",200);

    return true;
}

function moveUp() {
    if (!canMoveUp(board)){
        return false;
    }

    for (var i=1; i<4; i++){ //行
        for (var j=0; j<4; j++){ //列
            if (board[i][j] != 0){
                for (var k=0; k<i; k++){
                    if (board[k][j] == 0 && noBlokHorizontalRow(k,i,j,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if (board[k][j] == board[i][j] && noBlokHorizontalRow(k,i,j,board) && !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateGridView();",200);

    return true;
}

function moveRight() {
    if (!canMoveRight(board)){
        return false;
    }
    for (var i=0; i<4; i++){
        for (var j=2; j>=0; j--){
            if (board[i][j] != 0){
                for (var k=3; k>j; k--){
                    if (board[i][k] == 0 && noBlokHorizontalCol(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i,j,k,board) && !hasConflicted[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateGridView();",200);

    return true;
}

function moveDown() {
    if (! canMoveDown(board)){
        return false;
    }
    for (var i=2; i>=0; i--){
        for (var j=0; j<4; j++){
            if (board[i][j] != 0){
                for (var k=3; k>i; k--){
                    if (board[k][j] == 0 && noBlokHorizontalRow(i,k,j,board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if (board[k][j] == board[i][j] && noBlokHorizontalRow(i,k,j,board) && !hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateGridView();",200);

    return true;
}

function isgameover() {
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover() {
    // alert("游戏结束！");
    $("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p><span>"+score+
        "</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "500px");
    gameover.css("height", "500px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}