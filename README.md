# Google-Sheets-Modules
If I have to deal with Excel formulas any longer...

These Google Apps Script files are used to connect a Google Sheet to a Hubspot account via API for the purpose of deeper analysis and reporting. These reports were created and updated every hour and fed into a dashboard made in Google Data Studio.

Linking of appointments to deals is possible with scripts in the appointments.gs file and allows for a better understanding of deal cycle lengths and sales/marketing touchpoints.

Usage is simple: add your account's API key in order and run Generate Reports from the Cience tab (feel free to rename). Remember to set a recurring job to run Refresh Deal Data to keep this up to date. There may be timeouts based on the size of your Hubspot instance as well as your Google suite account (individual scripts are limited by execution time much like in SFDC).
