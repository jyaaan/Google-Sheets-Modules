// Calculation functions

/*
  calcNBMRR(dataObj, KPI);
  calcNBMRRCount(dataObj, KPI);
  calcAvNBMRR(KPI);
  calcNBCienceNow(dataObj, KPI);
  calcNBCienceNowCount(dataObj,KPI);
  calcAvCienceNow(KPI);
  calcSumNB(dataObj, KPI);
  calcNBCount(dataObj, KPI);
  calcNBSigs(dataObj, KPI);
  calcNBSigCount(dataObj, KPI);
  appointmentsScheduled(dataObj, KPI);
  appointmentsCompleted(dataObj, KPI);
*/

function calcConversion(dataObj, reportObj, name, periodName) {
  var thisName = name;
  reportObj.map(function(period) {
    var endDate = new Date(period.Date);
    
    if (periodName == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
//    var rangeRows =  getRowsBetween(dataObj, period.Date, endDate, 'Close Date').length;
//    Logger.log('start: ' + period.Date + ' end: ' + endDate + ' count: ' + rangeRows);
    var numClosedDeals = getRowsBetween(dataObj, period.Date, endDate, 'Close Date')
    .filter(function(row) {
      return (row['Pipeline'] == 'RSM Pipeline' && row['Deal Stage'] == 'Closed Won' && row['HubSpot Owner'] === name);
    }).length;
    var numClosedAppointments = getRowsBetween(dataObj, period.Date, endDate, 'Close Date')
    .filter(function(row) {
      return row['Pipeline'] == 'SDR Appointments' && row['Deal Stage'] == 'Closed Won' && row['HubSpot Owner'] === name;
    }).length;
    period[name + ' - Deals Closed'] = numClosedAppointments === 0 ? 0 : numClosedDeals / numClosedAppointments;
  })
}

function calcOppCreation(dataObj, reportObj, name, periodName) {
  var thisName = name;
  reportObj.map(function(period) {
    var endDate = new Date(period.Date);
    
    if (periodName == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    const numOpps = getRowsBetween(dataObj, period.Date, endDate, 'Close Date')
    .filter(function(row) {
      return (row['Pipeline'] == 'RSM Pipeline' && row['HubSpot Owner'] === name);
    }).length;
    const numClosedAppointments = getRowsBetween(dataObj, period.Date, endDate, 'Close Date')
    .filter(function(row) {
      return row['Pipeline'] == 'SDR Appointments' && row['Deal Stage'] == 'Closed Won' && row['HubSpot Owner'] === name;
    }).length;
    period[name + ' - Opps created'] = numClosedAppointments === 0 ? 0 : numOpps / numClosedAppointments;
  })
}

// adds NB MRR key:value pair to reportObj
function calcNBMRR(dataObj, reportObj, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }

    week['NB MRR'] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row['Pipeline'] == 'RSM Pipeline' && row['Deal Stage'] == 'Closed Won' &&
                (row['Solution'] == 'Researcher' || row['Solution'] == 'Sales Assistant' || row['Solution'] == 'SDR Team'))
    })
    .reduce(function(sum, row) {
      return sum + row['Amount'];
    }, 0)
  });
}

function calcNBMRRCount(dataObj, reportObj, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    week['MRR Count'] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row.Pipeline == 'RSM Pipeline' && row['Deal Stage'] == 'Closed Won' &&
                (row.Solution == 'Researcher' || row.Solution == 'Sales Assistant' || row.Solution == 'SDR Team'))
    })
    .reduce(function(sum, row) {
      return row.Amount > 0 ? sum + 1 : sum;
    }, 0)
  });
}

function calcAvNBMRR(reportObj) {
  reportObj.map(function(week) {
    if (week['MRR Count'] > 0) {
      week['Av. MRR'] = Math.round(week['NB MRR'] / week['MRR Count']);
    } else {
      week['Av. MRR'] = 0;
    }
  })
}

function calcNBCienceNow(dataObj, reportObj, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    week['NB Cience Now'] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row.Pipeline == 'RSM Pipeline' && row['Deal Stage'] == 'Closed Won' && row.Solution == 'Cience Now' )
    })
    .reduce(function(sum, row) {
      return sum + row.Amount;
    }, 0)
  });
}

function calcNBCienceNowCount(dataObj, reportObj, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    week['NB Cience Now Count'] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row.Pipeline == 'RSM Pipeline' && row['Deal Stage'] == 'Closed Won' && row.Solution == 'Cience Now' )
    })
    .reduce(function(sum, row) {
      return row.Amount > 0 ? sum + 1 : sum;
    }, 0)
  });
}

function calcAvCienceNow(reportObj) {
  reportObj.map(function(week) {
    if (week['NB Cience Now Count'] > 0) {
      week['Av. Cience Now'] = Math.round(week['NB Cience Now'] / week['NB Cience Now Count']);
    } else {
      week['Av. Cience Now'] = 0;
    }
  })
}

function calcSumNB(dataObj, reportObj, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    week['Total NB'] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row.Pipeline == 'RSM Pipeline' && row['Deal Stage'] == 'Closed Won')
    })
    .reduce(function(sum, row) {
      return sum + row.Amount;
    }, 0)
  });
}

function calcNBCount(dataObj, reportObj, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    week['Total NB Count'] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row.Pipeline == 'RSM Pipeline' && row['Deal Stage'] == 'Closed Won')
    })
    .reduce(function(sum, row) {
      return row.Amount > 0 ? sum + 1 : sum;
    }, 0)
  });
}

function calcNBSigs(dataObj, reportObj, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    week['NB Sig Sum'] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row.Pipeline == 'RSM Pipeline' && row['Deal Stage'] == 'SOW Signed')
    })
    .reduce(function(sum, row) {
      return sum + row.Amount;
    }, 0)
  });
}

function calcNBSigCount(dataObj, reportObj, period) {
  reportObj.map(function(week) {
    var endDate = new Date(week.Date);
    if (period == 'monthly') {
      addMonths(endDate, 1);
    } else if (period == 'weekly') {
      addDays(endDate, 7);
    } else {
      addDays(endDate, 1);
    }
    
    week['NB Sig Count'] = getRowsBetween(dataObj, week.Date, endDate, 'Close Date')
    .filter(function(row) {
        return (row.Pipeline == 'RSM Pipeline' && row['Deal Stage'] == 'SOW Signed')
    })
    .reduce(function(sum, row) {
      return row.Amount > 0 ? sum + 1 : sum;
    }, 0)
  });
}

function getAvSalesCycle(dataObj) {
  
  const wonWithAppointments = dataObj.filter(function(row) {
    return row['Pipeline'] === 'RSM Pipeline' && row['Deal Stage'] === 'Closed Won' && typeof row.relatedRows !== 'undefined';
  })
  .filter(function(row) {
    return row.relatedRows.length !== 0;
  })

  var totalDays = wonWithAppointments.reduce(function(acc, curr) {
    return acc + daysDiff(curr['relatedClose'], curr['Close Date']);
  }, 0)

  return (totalDays / wonWithAppointments.length);
}

function getAppointmentCloseRate(dataObj) {
  const closedAppointmentsWithDeals = dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments' && typeof row.relatedRows !== 'undefined' && row['Deal Stage'] == 'Closed Won';
  })
  .filter(function(row) {
    return row.relatedRows.length !== 0;
  })
  
  closedAppointmentsWithDeals.map(function(row) {
    
  })
}



function getAvCloseRate(dataObj) { // ask michael. should we include closed SDR appointments without associated deals?
  const closedAppointmentsWithWonDeals = dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments' && typeof row.relatedRows !== 'undefined' && row['Deal Stage'] == 'Closed Won' && row['won'] === true;
  })
  .filter(function(row) {
    return row.relatedRows.length !== 0;
  })
  
  const closedAppointmentCount = dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments' && row['Deal Stage'] == 'Closed Won';
  }).length;

  return (closedAppointmentsWithWonDeals.length / closedAppointmentCount);
}

function getAvOppCreated(dataObj) {
  const appointmentCount = dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments';
  })
  
  const closedAppointmentsWithDeals = dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments' && typeof row.relatedRows !== 'undefined' && row['Deal Stage'] == 'Closed Won';
  })
  .filter(function(row) {
    return row.relatedRows.length !== 0;
  })
  
  return (closedAppointmentsWithDeals.length / appointmentCount.length);
}

function getDataIntegrity(dataObj) {
  const dealCount = dataObj.filter(function(row) {
    return row['Pipeline'] === 'RSM Pipeline';
  }).length;
  
  const closedDealCount = dataObj.filter(function(row) {
    return row['Pipeline'] === 'RSM Pipeline' && row['Deal Stage'] == 'Closed Won';
  }).length;
  
  const wonWithAppointments = dataObj.filter(function(row) {
    return row['Pipeline'] === 'RSM Pipeline' && row['Deal Stage'] === 'Closed Won' && typeof row.relatedRows !== 'undefined';
  })
  .filter(function(row) {
    return row.relatedRows.length !== 0;
  })
  
  const dealsWithAppointments = dataObj.filter(function(row) {
    return row['Pipeline'] === 'RSM Pipeline' && typeof row.relatedRows !== 'undefined';
  })
  .filter(function(row) {
    return row.relatedRows.length !== 0;
  })
  
  
  
  const appointmentCount = dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments';
  }).length;
  
  const closedAppointmentCount = dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments' && row['Deal Stage'] == 'Closed Won';
  }).length;
  
  const appointmentsWithDeals = dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments' && typeof row.relatedRows !== 'undefined';
  })
  .filter(function(row) {
    return row.relatedRows.length !== 0;
  })
  
  const closedAppointmentsWithDeals = dataObj.filter(function(row) {
    return row['Pipeline'] == 'SDR Appointments' && typeof row.relatedRows !== 'undefined' && row['Deal Stage'] == 'Closed Won';
  })
  .filter(function(row) {
    return row.relatedRows.length !== 0;
  })
  
  const dealIDs = appointmentsWithDeals.map(function(appt) {
    return appt['relatedRows'][0];
  })
  
  const uniqueDealIDs = spliceDupilcates(dealIDs);
  
  Logger.log('Deal count: ' + dealCount.length);
  Logger.log('Deals With Appointments: ' + dealsWithAppointments.length);
  Logger.log('Closed Deal Count: ' + closedDealCounth);
  Logger.log('Closed Deals with Appointments: ' + wonWithAppointments.length);
  Logger.log('Appointment count: ' + appointmentCount);
  Logger.log('Appointments Linked to Deals: ' + appointmentsWithDeals.length);
  Logger.log('Unique Linked Deals: ' + uniqueDealIDs.length);
  Logger.log('Closed Appointment Count: ' + closedAppointmentCount);
  Logger.log('Closed Appointments with Deals: ' + closedAppointmentsWithDeals.length);


}

function daysDiff(a, b) {
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(b.getTime() / oneDay) - Math.floor(a.getTime() / oneDay);
}

function calcAvSalescycle(filterObj) {
  return filterObj.reduce(function(sum, curr) {
    const related = dataObj.find(function(rec) {
      return rec['Deal ID'] === curr.relatedRow[0];
    })
    return sum + (Math.abs(curr['Close Date']) - Math.abs(related['Close Date']));
  }, 0) / wonWithAppointments.length;
}

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}














