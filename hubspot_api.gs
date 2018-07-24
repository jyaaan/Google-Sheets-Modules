var API_KEY = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

// Adds api key and property to url. MUST BE ADDED FIRST
function addAPIKey(query) {
  return query + '?hapikey=' + API_KEY;
}

function getAllDealPipelines() {
  
}

function formatDealsTEST() {
  var getDeals = 'https://api.hubapi.com/deals/v1/deal/paged';
  var propertyMap = getDealPropertyMap();
  var deals = [];
  var first = sendQuery(addAPIKey(getDeals) + '&limit=1&includeAssociations=true&' + formatProperties(getAllDealPropertyNames()));
  deals = deals.concat(first['deals']);
  Logger.log(deals);
  return deals.map(function(deal) {
    var tempDeal = {
      'Deal ID': deal['dealId']
    };
    for (property in propertyMap) {
//      Logger.log(property);
      tempDeal[propertyMap[property]] = '';
    }
    for (property in deal['properties']) {
//      Logger.log(deal['properties'][property]);
      if (property.indexOf('date') !== -1) {
        tempDeal[propertyMap[property]] = new Date(Number(deal['properties'][property]['value']));
      } else {
        tempDeal[propertyMap[property]] = deal['properties'][property]['value'];
      }

    }

//    var tempProps = deal['properties'].map(function(property) {
//      var tempObj = {};
//      tempObj[propertyMap[property]] = property.value;
//    });
//    Object.assign(tempDeal, tempProps);
//    Logger.log(tempDeal);
    return tempDeal;
  });
//  return deals;
}

function testIncludes() {
  var tester = 'hellodate';
  if (tester.indexOf('date') !== -1) {
    Logger.log('yes!');
  } else {
    Logger.log('no!');
  }
}

function formatDeals(deals) {
  var propertyMap = getDealPropertyMap();
  var stageMap = getAllDealPipeline();
  var ownerMap = getOwnerMap();
  return deals.filter(function(deal) {
    return deal.isDeleted == false;
  })
  .map(function(deal) {
    var tempDeal = {
      'Deal ID': deal['dealId'],
      'Associated Company': deal['associations']['associatedCompanyIds'][0] ? deal['associations']['associatedCompanyIds'][0] : null
    };
    for (property in propertyMap) {
      tempDeal[propertyMap[property]] = '';
    }
    for (property in deal['properties']) {
      if (property.indexOf('date') !== -1 || property == 'notes_last_contacted' || property == 'engagements_last_meeting_booked') {
        tempDeal[propertyMap[property]] = Number(deal['properties'][property]['value']) > 0 ? new Date(Number(deal['properties'][property]['value'])) : null;
      } else if (property.indexOf('owner') !== -1) {
        tempDeal[propertyMap[property]] = ownerMap[deal['properties'][property]['value']] ? ownerMap[deal['properties'][property]['value']] : 'Deleted';
//        tempDeal[propertyMap[property]] = ownerMap.hasOwnProperty(deal['properties'][property]['value']) ? ownerMap[deal['properties'][property]['value']] : 'Deleted';
      } else {
        var val = deal['properties'][property]['value'];
        tempDeal[propertyMap[property]] = stageMap[val] ? stageMap[val] : val;
      }
    }
    return tempDeal;
  });
}
//"31058249"

// Contacts returned in array of Obj.contacts
// Check Obj['has-more'] for more pages
// Obj['vid-offset'] returns 
function getAllContacts() {
  var getContacts = 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all';
  return addAPIKey(getContacts);
}

function getAllTables() {
  var getTables = 'https://api.hubapi.com/hubdb/api/v1/tables';
  return addAPIKey(getTables);
}

// gets all deals with all valid properties
function getAllDeals() {
  var startDate = new Date('September 1, 2017');
  var getDeals = 'https://api.hubapi.com/deals/v1/deal/paged';
  var deals = [];
  var first = sendQuery(addAPIKey(getDeals) + '&limit=250&includeAssociations=true&' + formatProperties(getAllDealPropertyNames()));
  deals = deals.concat(first['deals']);
  while (first['hasMore']) {
    first = sendQuery(addAPIKey(getDeals) + '&limit=250&includeAssociations=true&offset=' + first['offset'] + '&' + formatProperties(getAllDealPropertyNames()));
    deals = deals.concat(first['deals']);
  }
  return formatDeals(deals).filter(function(deal) {
    return deal['Create Date'] >= startDate;
  });
  
}

function testEmailAPI() {
  var endpoint = 'https://api.hubapi.com/calendar/v1/events';
//  Logger.log(addAPIKey(endpoint));
  var first = sendQuery(addAPIKey(endpoint));
  Logger.log(first);
}

function getDeals(offset) {
  if (offset) {
  
  } else {
    return sendQuery(addAPIKey(getDeals) + '&limit=250&includeAssociations=true&' + formatProperties(getAllDealPropertyNames()));
  }
}

// Sends query to HUBS and returns results as parsed JSON object
function sendQuery(query) {
  var response = UrlFetchApp.fetch(query);
  return JSON.parse(response.getContentText());
}

