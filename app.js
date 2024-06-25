const buttons = document.querySelectorAll("button")
const inputDisplay = document.querySelector(".input") 
const resultDisplay = document.querySelector(".result")


let fiNum = '0';
let seNum = '';
let listFunctions = { '+' : add, '-' : subtract, '*' : multiply, '/' : divide, 'clear' : clearDisplay, 'backspace' : backspace, 'toggleSign' : toggleSign, 'percent' : percent, 'calc' : calc, '.' : addDot};
let operator = '';
let resultado = '';
let fiDot = false;
let seDot = false;


function add(a,b) {
    return a + b 
}
function subtract(a,b) {
    return a - b
}
function multiply(a,b) {
    return a * b
}
function divide(a,b) {
    return a / b

}
function upDisplay() {
    inputDisplay.textContent = `${fiNum} ${operator}`;
    resultDisplay.textContent = `${seNum}`;
    fiNum.search(/\./) == -1 ? fiDot = false : fiDot = true;
    seNum.search(/\./) == -1 ? seDot = false : seDot = true;
    seNum == 'undefined' ? seNum = '' : seNum = seNum;
}
function clearDisplay() {
    seNum = operator = '';
    fiNum = '0';
    upDisplay('');
}
function backspace() {
    if ( operator == '' ) {
        fiNum = fiNum.slice(0,-1);
        fiNum == '' ? fiNum = '0' : fiNum = fiNum;
    } else if ( seNum != '' ) {
        seNum = seNum.slice(0,-1);
    } else {
        operator = '';
    }
    upDisplay();
}
function toggleSign() {
    if ( operator == '' ) {
        fiNum = (fiNum * (-1)).toString() ;
    } else if ( seNum != '' ) {
        seNum = (seNum * (-1)).toString();
    } 
}
function percent() {
    if ( fiNum != '' && seNum != '' && operator.search('=') == -1) {
        const valorPercent = ( seNum / 100 ) * fiNum;
        seNum = valorPercent;
        calc();
    }
}
function calc() {
    if (fiNum != '' && seNum != '' && operator.length == 1) {
        resultado = listFunctions[operator](parseFloat(fiNum), parseFloat(seNum));
        resultado = Math.round( resultado * 10000 ) / 10000
        operator += ` ${seNum} =`;
        isNaN(resultado) ? resultado = 'undefined' : resultado = resultado;
        seNum = resultado.toString();
    }
}
function newOperation() {
    fiNum = seNum.toString();
    seNum = '';    
}
function addDot() {
    if ( operator == '' && fiDot == false ) {
        fiNum += '.';
    } else if ( seNum != '' && seDot == false ) {
        seNum += '.';
    } 
}


buttons.forEach( buttons => {
    buttons.addEventListener( 'click', () => {

        if ( buttons.getAttribute('class').search('especial') >= 0 ) {
            listFunctions[buttons.getAttribute('id')]();
        } else if ( buttons.getAttribute('id') == 'numbers' ) {  // Type numbers
            if ( operator == '' ) {
                if ( fiNum.length < 15 ) { 
                    fiNum == '0' ? fiNum = '' : fiNum = fiNum;
                    fiNum += buttons.getAttribute('value');
                }
            } else {
                if ( seNum.length < 15 ) {
                    seNum += buttons.getAttribute('value');
                }
            }           
        } else if ( buttons.getAttribute('class') == 'calButt operator') { // Type operatos
            if ( operator.slice(-1) == '=' ){
                operator = buttons.getAttribute('value');
                newOperation();
            } else if ( fiNum != '' ) {
                operator = buttons.getAttribute('value');
            } 
        }
        upDisplay();
    });
});

window.addEventListener('keydown', function(e) {

    // document.querySelectorAll('button')[0].getAttribute('data-key') eliminar todos los typeos q no esten en la lista permitida

    const key = document.querySelector(`button[data-key='${e.key}']`);
    if ( key != null ) {
        key.click();
    }
});

upDisplay()