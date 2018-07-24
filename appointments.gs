// Appointment functions
// Used to point analyze appointments and their statuses.
// Links SDR Appointments to RSM Deals

function getAppointmentCount(dataObj, reportObj, stage, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    week[stage] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row.Pipeline == 'SDR Appointments' && row['Deal Stage'] == stage);
    }).length;
  })
}

function appointmentsScheduled(dataObj, reportObj, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    week['Appts Sched'] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row.Pipeline == 'SDR Appointments' && (row['Deal Stage'] == 'Appointment Scheduled' || row['Deal Stage'] == 'Closed Won'))
    })
    .reduce(function(sum, row) {
      if (row.Amount > 0) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0)
  });
}

function appointmentsCompleted(dataObj, reportObj, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    week['Appts Complete'] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row.Pipeline == 'SDR Appointments' && row['Deal Stage'] == 'Closed Won')
    })
    .reduce(function(sum, row) {
      if (row.Amount > 0) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0)
  });
}

// When this is run, every row in dataObj will have relatedRows attribute which has an array of related deals.
function linkAppointments(dataObj) {
  linkDealToAppointments(dataObj);
  linkAppointmentToDeal(dataObj);
}

function linkDealToAppointments(dataObj) {
  
  dataObj.filter(function(row) {
    return row['Pipeline'] == 'RSM Pipeline';
  })
  .map(function(row) {
    if (row['Associated Company'] !== null) {
      row.relatedRows = [];
      row.relatedClose;
      dataObj.filter(function(searchRow) {
        return (searchRow['Associated Company'] === row['Associated Company'] && searchRow['Pipeline'] === 'SDR Appointments'); //  && searchRow['Deal Stage'] == 'Closed Won'
      })
      .map(function(matchRow) {
        row.relatedRows.push(matchRow['Deal ID']);
        row.relatedClose = matchRow['Close Date'];
      })
    }
  })
  
}

function linkAppointmentToDeal(dataObj) {
  
  dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments' && row['Deal Stage'] == 'Closed Won';
  })
  .map(function(row) {
    if (row['Associated Company'] !== null) {
      row.relatedRows = [];
      row.relatedClose;
      dataObj.filter(function(searchRow) {
        return (searchRow['Associated Company'] === row['Associated Company'] && searchRow['Pipeline'] === 'RSM Pipeline');
      })
      .map(function(matchRow) {
        row.relatedRows.push(matchRow['Deal ID']);
        row.relatedClose = matchRow['Close Date'];
        row.won = matchRow['Deal Stage'] === 'Closed Won';
      })
    }
  })
}

function getRelatedRow(row, dataObj) {
  return dataObj.find(function(rec) {
    return rec['Deal ID'] === row.relatedRow[0];
  })
}