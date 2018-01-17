//  set clock todayDate
function setClockForToday() {
 // use moment.js
 var findTodayDay= moment().format('dddd') +'\n' + moment().format('MMMM Do YYYY') + '\n';
 var findTodayClock = moment().format('h:mm:ss a');
 // use jquery
 $date= $( "#date" ).html(findTodayDay + findTodayClock);
}

