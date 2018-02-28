var board = new Array();
var score = 0;
var hasConflicted = new Array();
$(function () {
    newgame();
});

function newgame() {
    //初始化棋盘格和数字格
    init();

    //生成两个随机位置的随机的数字
    generateOneNumber();
    generateOneNumber();
}

function restartgame() {
    $("#gameover").remove();
    updateScore(0);
    newgame();
}

function init() {
    //i表示4乘4的格子中的行
    for(var i=0; i<4; i++){
        //二维数组
        board[i] = new Array();
        hasConflicted[i] = new Array();

        //j表示4乘4的格子中的列
        for(var j=0; j<4; j++){
            //将每个格子的值初始化为0
            board[i][j] = 0;
            hasConflicted[i][j] = false;

            //通过双重遍历获取每个格子元素
            var gridCell = $("#grid-cell-" + i + "-" + j);

            //通过getPosTop()方法设置每个格子距顶端的距离
            gridCell.css("top",getPosTop(i,j));

            //通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    updateGridView();
    score = 0;
    $("#score").text(0);
}

function updateGridView() {
    //首先清空之前的数字格布局内容
    $(".number-cell").remove();

    for(var i=0; i<4; i++){
        for(var j=0; j<4;j++){
            //向棋盘格上增加数字格
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");

            var numberCell = $("#number-cell-" + i + "-" + j);

            //如果棋盘格的值为0的话,设置数字格为高宽都为0
            if (board[i][j] == 0){
                numberCell.css("width","0px");
                numberCell.css("height","0px");
                numberCell.css("top",getPosTop(i,j)+50);
                numberCell.css("left",getPosLeft(i,j)+50);
            } else {
                //如果棋盘格的值不为0的话,设置数字格为高宽为75并设置背景色和前景色及数字值
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberOfBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber() {
    //随机一个x坐标的位置
    var randx = parseInt(Math.floor(Math.random()*4));

    //随机一个y坐标的位置
    var randy = parseInt(Math.floor(Math.random()*4));

    //定义一个死循环,完成生成随机空格子
    while (true){
        //如果当前位置的值为0表示没有数字,如果有数字则换其他位置
        if (board[randx][randy] == 0){
            break;
        }
        //否则重新随机一个位置
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4))
    }
    //随机一个数字2或者4
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randNumber;

    //实现随机数字显示的动画
    showNumberWithAnimation(randx,randy,randNumber);
}