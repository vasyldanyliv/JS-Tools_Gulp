// use numeral.js
var number1 = numeral(1000).format('0,0');
console.log('number',number1);

var number2 = numeral(1000);
var added = number2.add(10).value();
console.log('1000 + 10 =',added);
// 1010

var timer;
window.onload = function() {
 setClockForToday();
 timer = setInterval(setClockForToday, 1000);
};

console.log('sum', sum(5,12));
