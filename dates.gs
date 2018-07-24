// Date and time functions

function generateDailyTimeline() {
  var timeline = [];
  const today = new Date();
  var tempDate = new Date(startDate);
  
  timeline.push('Date');
  timeline.push(new Date(tempDate));
  
  do {
    addDays(tempDate, 1);
    timeline.push(new Date(tempDate));
  } while (tempDate < today);
  
  return timeline;
}

function generateWeeklyTimeline() {
  var timeline = [];
  const today = new Date();
  var tempDate = new Date(startDate);
  
  timeline.push('Date');
  timeline.push(new Date(tempDate));
  
  do {
    addDays(tempDate, 7);
    timeline.push(new Date(tempDate));
  } while (tempDate < today);
  
  return timeline;
}

function generateMonthlyTimeline() {
  var timeline = [];
  const today = new Date();
  var tempDate = new Date(startDate);
  
  timeline.push('Date');
  timeline.push(new Date(tempDate.setDate(1)));
  
  do {
    addMonths(tempDate, 1);
    timeline.push(new Date(tempDate));
  } while (tempDate < today);
  
  return timeline;
}



function addDays(begin, numberOfDays) {
  begin.setDate(begin.getDate() + numberOfDays);
}

function addMonths(begin, numberOfMonths) {
  begin.setMonth(begin.getMonth() + numberOfMonths);
}

function formatMMDDYYYY(dat) { // boo, no prototyping
  var mm = dat.getMonth() + 1; // getMonth() is zero-based
  var dd = dat.getDate();

  return [(mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd,
          dat.getFullYear()
         ].join('/');
}

// Returns duration in days
function getDealDuration(deal) {
  var duration = deal['Close Date'] - deal['Create Date'];
  return duration / 1000 / 60 / 60 / 24;
}

function getOpenDealDuration(deal) { // maybe merge this one with the one above later.
  var dateNow = new Date();
  var duration = dateNow - deal['Create Date'];
  return duration / 1000 / 60 / 60 / 24;
}

function initializeDailyObject() {
  return createObjectsFromArray(generateDailyTimeline());
}

function initializeWeeklyObject() {
  return createObjectsFromArray(generateWeeklyTimeline());
}

function initializeMonthlyObject() {
  return createObjectsFromArray(generateMonthlyTimeline());
}