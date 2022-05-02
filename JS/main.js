(function(){


const display = document.getElementById('display');
//const btn = document.querySelectorAll('.btn');
let total = 0;
let state = 'start';
let mode = 'integer_mode';

//リセット処理
const reset = () => {
    total = 0;
    display.value = total;
    mode = 'integer_mode'; //整数モード
}


//1-9の数字を押した時
const numBtn = document.querySelectorAll('.num-btn');
numBtn.forEach(index => {
    index.addEventListener('click', () => {
        if (state === 'start') {
            total = index.dataset.indexId;
        } else if (state === 'finish') {
            reset();
            total = index.dataset.indexId;
        } else if (state === 'calculation' || state === 'cal') {
            total += index.dataset.indexId;
        }
        display.value = total;
        state = 'calculation'  //数字入力状態
    });
});

//0ボタンを押した時
const zero = document.querySelectorAll('.zero');
zero.forEach(index => {
    index.addEventListener('click', () => {
        if (state === 'start' || state === 'finish' || state === 'cal') {
            if (display.value.slice(-1) === '0') {
                return;
            }
        }
        if (state === 'start') {
            total = index.dataset.indexId;
        } else {
            total += index.dataset.indexId;
        }
        display.value = total;
    })
})

// .小数点ボタンを押した時
const point = document.getElementById('point');
point.addEventListener('click', () => {
    if (mode === 'decimal_mode') {
        return;
    }
    if (total === 0) {
        total = point.dataset.indexId;
    }
    else {
        total += point.dataset.indexId;
    }
    display.value = total;
    state = 'calculation'  //数字入力状態
    mode = 'decimal_mode'; //小数入力モードに変更
})


//「＋÷－×」ボタンを押した時
const calBtn = document.querySelectorAll('.cal-btn');
calBtn.forEach(index => {
    index.addEventListener('click', () => {
        if (state === 'start') {
            return;
        } else if (state === 'calculation') {
            total += index.dataset.indexId;
        } else if (state === 'finish') {
            total = display.value;
            total += index.dataset.indexId;
        }
        display.value = total;
        state = 'cal'; //演算記号状態
        mode = 'integer_mode'; //整数モード
    });
});


// =ボタンで計算、出力
const equalBtn = document.getElementById('equal-btn');
equalBtn.addEventListener('click', () => {
    eval(total);
    display.value = eval(total);
    state = 'finish';
    mode = 'integer_mode'; //整数モード
});


//ACボタン
const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    reset();
    state = 'start';
})

})();