let gridSize = 2;
let gridNumH = 400;
let gridNumW = 2 * gridNumH + 1;
let height = gridNumH * gridSize;
let width = gridNumW * gridSize;

let ca_rule = 18;
let rule_bin = new Array();

let value_o = new Array();  // 上一列
let value_n = new Array();  // 根據上一列計算出當前列

let lineId = 0;

let input, greeting, button;

function setup() {
    createCanvas(width, height);
    background(120);

    input = createInput();
    input.position(20, 65);

    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(greet);

    greeting = createElement('h2', 'input a num(0~255)');
    greeting.position(20, 5);

    textAlign(CENTER);
    textSize(50);

    // text(rule_bin, 100, 100, 100, 100);
    
}

function draw() {
    if (lineId == 0){
        ruleAnalysis(ca_rule);  // 計算規則
        for (var i = 0; i < gridNumW; i++){  // 0 to 200
            value_o[i] = 0;
        }
        value_o[gridNumH] = 1;  // 0~99 100 101~200
        fillLine(lineId, value_o);
        console.log(value_o);
    }
    lineId += 1;
    if (lineId > gridNumH){
        noLoop();
    }
    calculateNextLine();
    fillLine(lineId, value_o);
}

function greet(){
    ca_rule = int(input.value());
    lineId = 0;
    value_o = new Array();
    value_n = new Array();
    background(120);
    loop();
}

function fillGrid(x, y){
    color(255);
    noStroke();
    rect(x*gridSize, y*gridSize, gridSize, gridSize);
}

function fillLine(k, value){
    for(var i = 0; i < gridNumW; i++){
        if(value[i]==0){

        } else {  // fill
            fillGrid(i, k);
        }
    }
}
// 輸入十進位轉為二進位
function ruleAnalysis(rule){
    var value = rule.toString(2);
    var l = value.length;
    var i;
    for(i = 0; i < 8-l; i++) {
        rule_bin[i] = 0;
    }
    for(;i < 8; i++){
        rule_bin[i] = int(value[i-8+l]);
    }
    console.log(rule_bin)
}

// | prev | 111  | 110  | 101  | 100  | 011  | 010  | 001  | 000  |
// | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
// | next | 0    | 0    | 1    | 1    | 0    | 0    | 1    | 0    |

function calculateNextLine(){  // value_o -> value_n
    // deal the boundary, padding a 0
    value_o.unshift(0);
    value_o.push(0);
    for(var i = 1; i < value_o.length - 1; i++){
        switch(parseInt(value_o.slice(i-1, i+2).join(''),2)) {
        case 7:
            value_n[i-1] = rule_bin[0];
            break;
        case 6:
            value_n[i-1] = rule_bin[1];
            break;
        case 5:
            value_n[i-1] = rule_bin[2];
            break;
        case 4:
            value_n[i-1] = rule_bin[3];
            break;
        case 3:
            value_n[i-1] = rule_bin[4];
            break;
        case 2:
            value_n[i-1] = rule_bin[5];
            break;
        case 1:
            value_n[i-1] = rule_bin[6];
            break;
        case 0:
            value_n[i-1] = rule_bin[7];
            break;
        default:
            break;
        }
    }
    value_o = value_n;
}