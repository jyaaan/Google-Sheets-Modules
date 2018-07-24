function testQuery() {
//  Logger.log(formatProperties(getAllDealPropertyNames()));
//  Logger.log(getAllDealPropertyNames());
//  Logger.log(getDealPropertyMap());
//  Logger.log(getAllDeals());
//  var allDeals = getAllDeals();
//  Logger.log(getAssociatedCompanyIds(allDeals));
//  Logger.log(sendQuery(getAllTables()));
}

function getKeyword() {
  var getKeyword = 'https://api.hubapi.com/keywords/v1/keywords';
  var results = sendQuery(addAPIKey(getKeyword));
//  Logger.log(results);
}

function getOwnerMap() {
  var getOwners = 'https://api.hubapi.com/owners/v2/owners/';
  var results = sendQuery(addAPIKey(getOwners));
  var ownerMap = {};
  results.forEach(function(result) {
    ownerMap[result['ownerId']] = result['firstName'] + ' ' + result['lastName'];
  })
  Logger.log(ownerMap);
  return ownerMap;
}

function getPropertyGroups() {
  var getProperties = 'https://api.hubapi.com/properties/v1/deals/groups';
  var results = sendQuery(addAPIKey(getProperties) + '&IncludeProperties=true');
  var tester = results.filter(function(result) {
    return result['name'] == 'dealstage';
  })
  Logger.log(tester);
}

// returns an array of property names. NOT LABELS
function getAllDealPropertyNames() {
  var getProperties = 'https://api.hubapi.com/properties/v1/deals/properties';
  var results = sendQuery(addAPIKey(getProperties));
  
  var names = results.filter(function(result) {
    return result['hidden'] === false;
  })
  .map(function(result) {
    return result['name'];
  })
  
  return names;
}

function getDealProperty() {
  var getProperty = 'https://api.hubapi.com/properties/v1/deals/properties/named/dealstage';
  var results = sendQuery(addAPIKey(getProperty));
}

function getAllDealProperties() {
  var getProperties = 'https://api.hubapi.com/properties/v1/deals/properties/named/pipeline';
  var results = sendQuery(addAPIKey(getProperties));
//  var tester = results.filter(function(result) {
//    return result['name'] == 'pipeline';
//  })
//  Logger.log(tester[0]);
  Logger.log(results);
}
// {stages=[{probability=0.1, displayOrder=0, active=true, label=Development, closedWon=false, stageId=886750dd-2891-4d06-9e0a-ddcb75bfd57e}, {probability=0.2, displayOrder=1, active=true, label=Discovery, closedWon=false, stageId=b2583b8b-1475-451b-9240-dfad011ff591}, {probability=0.3, displayOrder=2, active=true, label=Calibration, closedWon=false, stageId=c83e87e1-6478-43fe-82b5-4819cf33d0e4}, {probability=0.4, displayOrder=3, active=true, label=Evaluation, closedWon=false, stageId=4a190b37-8c2f-4ace-a9d1-978c69acfb40}, {probability=0.7, displayOrder=4, active=true, label=Negotiation, closedWon=false, stageId=54d9ff3a-3512-4cf1-9326-c2474c82b141}, {probability=0.8, displayOrder=5, active=true, label=SOW Sent, closedWon=false, stageId=decisionmakerboughtin}, {probability=0.9, displayOrder=6, active=true, label=SOW Signed, closedWon=false, stageId=contractsent}, {probability=1, displayOrder=7, active=true, label=Closed Won, closedWon=true, stageId=closedwon}, {probability=0, displayOrder=8, active=true, label=Closed Lost, closedWon=false, stageId=closedlost}, {probability=0, displayOrder=9, active=true, label=Closed - Revisit Later, closedWon=false, stageId=d1019eb1-e626-42b3-8a3b-700faf498639}], displayOrder=0, active=true, label=RSM Pipeline, pipelineId=default, staticDefault=false}, {stages=[{probability=0.1, displayOrder=0, active=true, label=Neg Response, closedWon=false, stageId=18e874d0-7ba2-4be9-96df-e127f49927ef}, {probability=0.1, displayOrder=1, active=true, label=Positive Response, closedWon=false, stageId=9a0c361f-b352-4206-9c13-e77be9fa891d}, {probability=0.1, displayOrder=2, active=true, label=Appointment Scheduled, closedWon=false, stageId=3433e58e-8c7b-4a65-a2aa-b88d0a0ac03d}, {probability=0.1, displayOrder=3, active=true, label=Appointment Completed, closedWon=false, stageId=22603031-85f9-4b51-8d0c-9fbf6f51bc52}, {probability=0.1, displayOrder=4, active=true, label=Discovery, closedWon=false, stageId=b7407f47-a4ba-4f35-ad34-d9e26e7613ac}, {probability=0.1, displayOrder=5, active=true, label=Calibration, closedWon=false, stageId=a01ff581-f6c0-4c93-ae8c-8f79aa6aa0fd}, {probability=0.1, displayOrder=6, active=true, label=Evaluation, closedWon=false, stageId=be5bf1e1-7806-46bb-8db7-74dd4f7799cb}, {probability=0.1, displayOrder=7, active=true, label=Negotiation, closedWon=false, stageId=731ba122-d6d8-45dc-9c2f-7d90ae5e6485}, {probability=0.1, displayOrder=8, active=true, label=Contract Complete, closedWon=false, stageId=0064ba58-ce97-43d6-a47c-ebb19736fb67}, {probability=0.1, displayOrder=9, active=true, label=Order Placed, closedWon=false, stageId=2d4f9b73-71f2-4d24-bdd7-d4d539474873}, {probability=0.1, displayOrder=10, active=true, label=Closed Won, closedWon=false, stageId=1f7aa90f-09e7-42c2-943a-1daf5776e807}, {probability=0.1, displayOrder=11, active=true, label=Closed Lost, closedWon=false, stageId=b5d6528f-06db-4628-b90d-58858eb2fe80}], displayOrder=0, active=true, label=Partnerships, pipelineId=8e9a662f-d03f-448c-981d-623974003f37, staticDefault=false}, {stages=[{probability=0.1, displayOrder=0, active=true, label=Negative Response, closedWon=false, stageId=9475c9d0-4674-4051-af5e-7ec3c1df582d}, {probability=0.4, displayOrder=1, active=true, label=Positive Response, closedWon=false, stageId=980a0f87-5fe2-4ee7-8d48-f969de432dd8}, {probability=0.7, displayOrder=2, active=true, label=Appointment Scheduled, closedWon=false, stageId=c0b4eace-3296-43cf-bb57-c746ef130733}, {probability=1, displayOrder=3, active=true, label=Closed Won, closedWon=true, stageId=332b1095-52a4-460d-bccd-fabd046e64e9}, {probability=0, displayOrder=4, active=true, label=No Show - No Reschedule, closedWon=false, stageId=aea723ae-0d94-44b0-9b1b-ed5b816a6470}, {probability=0, displayOrder=5, active=true, label=Closed Lost, closedWon=false, stageId=d49e4356-1d09-4ecd-9bf9-0bc18e528ca3}], displayOrder=0, active=true, label=SDR Appointments, pipelineId=828d4471-921d-453d-a342-b02946e455b7, staticDefault=false}]
// {980a0f87-5fe2-4ee7-8d48-f969de432dd8=Positive Response, b5d6528f-06db-4628-b90d-58858eb2fe80=Closed Lost, 731ba122-d6d8-45dc-9c2f-7d90ae5e6485=Negotiation, 332b1095-52a4-460d-bccd-fabd046e64e9=Closed Won, contractsent=SOW Signed, 22603031-85f9-4b51-8d0c-9fbf6f51bc52=Appointment Completed, 54d9ff3a-3512-4cf1-9326-c2474c82b141=Negotiation, 18e874d0-7ba2-4be9-96df-e127f49927ef=Neg Response, 3433e58e-8c7b-4a65-a2aa-b88d0a0ac03d=Appointment Scheduled, a01ff581-f6c0-4c93-ae8c-8f79aa6aa0fd=Calibration, c0b4eace-3296-43cf-bb57-c746ef130733=Appointment Scheduled, 1f7aa90f-09e7-42c2-943a-1daf5776e807=Closed Won, 9a0c361f-b352-4206-9c13-e77be9fa891d=Positive Response, 2d4f9b73-71f2-4d24-bdd7-d4d539474873=Order Placed, d49e4356-1d09-4ecd-9bf9-0bc18e528ca3=Closed Lost, c83e87e1-6478-43fe-82b5-4819cf33d0e4=Calibration, 4a190b37-8c2f-4ace-a9d1-978c69acfb40=Evaluation, decisionmakerboughtin=SOW Sent, 0064ba58-ce97-43d6-a47c-ebb19736fb67=Contract Complete, b2583b8b-1475-451b-9240-dfad011ff591=Discovery, b7407f47-a4ba-4f35-ad34-d9e26e7613ac=Discovery, closedwon=Closed Won, d1019eb1-e626-42b3-8a3b-700faf498639=Closed - Revisit Later, 9475c9d0-4674-4051-af5e-7ec3c1df582d=Negative Response, closedlost=Closed Lost, 886750dd-2891-4d06-9e0a-ddcb75bfd57e=Development, be5bf1e1-7806-46bb-8db7-74dd4f7799cb=Evaluation, aea723ae-0d94-44b0-9b1b-ed5b816a6470=No Show - No Reschedule}
function getAllDealPipeline() {
  var getPipelines = 'https://api.hubapi.com/deals/v1/pipelines';
  var results = sendQuery(addAPIKey(getPipelines));
  var stageMap = {};
//  Logger.log(results);
  results.forEach(function(result) {
    stageMap[result['pipelineId']] = result['label'];
    result['stages'].forEach(function(stage) {
      stageMap[stage['stageId']] = stage['label'];
    })
  })
  Logger.log(stageMap);
  return stageMap;
}

function getDealPropertyMap() {
  var getProperties = 'https://api.hubapi.com/properties/v1/deals/properties';
  var results = sendQuery(addAPIKey(getProperties));
  var namesObj = {};
  results.filter(function(result) {
    return result['hidden'] === false;
  })
  .forEach(function(result) {
    namesObj[result['name']] = result['label'];
  })
  Logger.log(namesObj);
  return namesObj;
}

// returns array of objects { dealId: 1234, associatedCompanyIds: [] };
function getAssociatedCompanyIds (dealObj) {
  return dealObj.deals.map(function(deal) {
    return { dealId: deal.dealId, associatedCompanyIds: deal.associations.associatedCompanyIds };
  })
}

// turns an array of property names into properties=x&properties=y&...properties=zz
function formatProperties(properties) {
  var strNames = properties.map(function(property) {
    return 'properties=' + property;
  })
  .toString();
  
  return strNames.replace(/,/g , '&');
}

// Data structure examples

var contactReturn = {
  "contacts":[
    {
      "addedAt":1518483748572,
      "vid":1,
      "canonical-vid":1,
      "merged-vids":[],
      "portal-id":4307699,
      "is-contact":true,
      "profile-token":"AO_T-mMrJBJ2TAI8AyhWioI9w1_twZImRbIQ4GLC_nAQD_rVYO6U6IYjwjK_4r9eR_cE2zRNMvu2ibEzVIqBe1ytlDTcohSHnaa3mbHn6jWIQ_bFkPmqUwqKInm9vmt_sNjGwMyerz9F",
      "profile-url":"https://app.hubspot.com/contacts/4307699/lists/public/contact/_AO_T-mMrJBJ2TAI8AyhWioI9w1_twZImRbIQ4GLC_nAQD_rVYO6U6IYjwjK_4r9eR_cE2zRNMvu2ibEzVIqBe1ytlDTcohSHnaa3mbHn6jWIQ_bFkPmqUwqKInm9vmt_sNjGwMyerz9F/",
      "properties":{
        "firstname":{
          "value":"test"
        },
        "lastmodifieddate":{
          "value":"1518483825078"
        },
        "lastname":{
          "value":"testeroni"
        }
      },
      "form-submissions":[],
      "identity-profiles":[
        {
          "vid":1,
          "saved-at-timestamp":1518483748519,
          "deleted-changed-timestamp":0,
          "identities":[
            {
              "type":"EMAIL",
              "value":"test@testeroni.com",
              "timestamp":1518483748512,
              "is-primary":true
            },
            {
              "type":"LEAD_GUID",
              "value":"1218fe13-5b65-451b-85d7-1e6c4532cb9b",
              "timestamp":1518483748517
            }
          ]
        }
      ],
      "merge-audits":[]
    },
    {"addedAt":1518484171146,"vid":51,"canonical-vid":51,"merged-vids":[],"portal-id":4307699,"is-contact":true,"profile-token":"AO_T-mNWfUq_Rl03IrEo_-6u2W3ZZchk7V9_TjE-0fHLEYiHc88b0dqqja4oDzSHGximxuWFEiNOX87plyJh7unDaFfgycVEMqqr5ZWaXRrBfH5F4bSlXChnXGoZnPvhZ1T2z-EAcIye","profile-url":"https://app.hubspot.com/contacts/4307699/lists/public/contact/_AO_T-mNWfUq_Rl03IrEo_-6u2W3ZZchk7V9_TjE-0fHLEYiHc88b0dqqja4oDzSHGximxuWFEiNOX87plyJh7unDaFfgycVEMqqr5ZWaXRrBfH5F4bSlXChnXGoZnPvhZ1T2z-EAcIye/","properties":{"firstname":{"value":"Cool"},"lastmodifieddate":{"value":"1518484177965"},"company":{"value":"HubSpot"},"lastname":{"value":"Robot (Sample Contact)"}},"form-submissions":[],"identity-profiles":[{"vid":51,"saved-at-timestamp":1518484171087,"deleted-changed-timestamp":0,"identities":[{"type":"EMAIL","value":"coolrobot@hubspot.com","timestamp":1518484171033,"is-primary":true},{"type":"LEAD_GUID","value":"e59290b6-7075-4492-8a40-7b8dbb8caf14","timestamp":1518484171083}]}],"merge-audits":[]},
    {"addedAt":1518484171350,"vid":101,"canonical-vid":101,"merged-vids":[],"portal-id":4307699,"is-contact":true,"profile-token":"AO_T-mMyRdz08O70zjxcUQ6uLpdVvISiYwwraQjsi2Vvp5YWEKd350IV0HPtvzBqWmyDswML_LdqRcJMRMRdYzsvG7ujSK8MQaDKJPc7cAvkfpa2sHFr-_1Zneidt7ovN4AF8usLKcEh","profile-url":"https://app.hubspot.com/contacts/4307699/lists/public/contact/_AO_T-mMyRdz08O70zjxcUQ6uLpdVvISiYwwraQjsi2Vvp5YWEKd350IV0HPtvzBqWmyDswML_LdqRcJMRMRdYzsvG7ujSK8MQaDKJPc7cAvkfpa2sHFr-_1Zneidt7ovN4AF8usLKcEh/","properties":{"firstname":{"value":"Brian"},"lastmodifieddate":{"value":"1518484178788"},"company":{"value":"HubSpot"},"lastname":{"value":"Halligan (Sample Contact)"}},"form-submissions":[],"identity-profiles":[{"vid":101,"saved-at-timestamp":1518484171300,"deleted-changed-timestamp":0,"identities":[{"type":"EMAIL","value":"bh@hubspot.com","timestamp":1518484171033,"is-primary":true},{"type":"LEAD_GUID","value":"3b5e1054-1a03-48f0-bc0c-bafe298138b3","timestamp":1518484171297}]}],"merge-audits":[]}
  ],
  "has-more":false,"vid-offset":101
}

var dealReturn = {
  "portalId": 62515,
  // Integer; The Portal ID (Hub ID) that the record belongs to.
  "dealId": 92606338,
  // Integer; The internal ID of the deal record
  "isDeleted": false,
  // Boolean; Whether or not the record is deleted. In practice this will always be false as deleted records will not appear in the API.
  "associations": {
  // A set of lists indicating which records the deal is associated with.
    "associatedVids": [
    // A list of integers, each one will be the vid of a contact record. 
      3065624
    ],
    "associatedCompanyIds": [
    // A list of integers, each one represents the companyId of a company record.
    // Deals can only be associated with a single company, so there will only be up to one item in the list.
      184896670
    ],
    "associatedDealIds": []
    // Deals can't be associated with other deals, so this will be an empty list.
  },
  "properties": {
  // A set of objects representing the the data for the properties set for the deal.
  // Only populated properties will be included for the record; properties that have never been set for the record will not be included.
    "dealname": {
    // String; The internal name of the property
      "value": "Example Deal",
      // String; The current value of the property.
      "timestamp": 1488839786098,
      // Integer; a Unix timestamp (in milliseconds) of the time the current value was set
      "source": "CRM_UI",
      // String; The method by which the value was set. See the contacts overview page (linked above) for more details
      "sourceId": "user@hubspot.com",
      // String or null; Additional details about the source.
      // May not be set for all source types
      "versions": [
      // A list of previous versions of the property value
      // Each entry represents a change to the value of the property
      // Entries are sorted in reverse chronological order, with the current version as the first entry. 
        {
          "name": "dealname",
          // String; The internal name of the property
          "value": "Example Deal",
          // String; the value of the property
          "timestamp": 1488839786098,
          // Integer; a Unix timestamp (in milliseconds) of the time that this value was set
          "source": "CRM_UI",
          // String; The method by which this version was set. See the contacts overview page (linked above) for more details
          "sourceId": "user@hubspot.com",
          // String or null; Additional details for the source of the change.
          // This may not be set for all source types
          "sourceVid": []
          // If the value was changed as the result of a change to a related contact, this will contain a list of vids for those related contacts.
        }
      ]
    },
    "amount": {
      "value": "50",
      "timestamp": 1488839786098,
      "source": "CRM_UI",
      "sourceId": "user@hubspot.com",
      "versions": [
        {
          "name": "amount",
          "value": "50",
          "timestamp": 1488839786098,
          "sourceId": "user@hubspot.com",
          "source": "CRM_UI",
          "sourceVid": []
        }
      ]
    }
  },
  "imports": [
  // For deals that have been imported, this will contain a list of import objects
  // For deals, this will have at most a single entry, since deal imports will not deduplicate records.
    {
      "importKey": "15eae328-4462-4644-ac03-c23421af51a1",
      // String; an internal reference to a specific import
      "importDate": 1489010292230
      // Integer; a Unix timestamp (in milliseconds) of when the import occurred.
    }
  ]
}
