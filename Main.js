/*
 * Global Variables
 */

// Form URL
var formID = '1EVGM-UPdhqb8aAsemktgCIy6rtcitZxIuwx11z08gBk';
// Sheet name used as destination of the form responses
var sheetName = 'Form Responses 2';
/*
 * Name of the column to be used to hold the response edit URLs 
 * It should match exactly the header of the related column, 
 * otherwise it will do nothing.
 */
var columnName = 'Edit Url' ;
// Responses starting row
var startRow = 0;


function getEditResponseUrls(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues(); 
  var columnIndex = headers[0].indexOf(columnName);
  var data = sheet.getDataRange().getValues();
  var form = FormApp.openById(formID);
  for(var i = startRow; i < data.length; i++) {
    if(data[i][0] != '' && data[i][columnIndex] == '') {
      var timestamp = data[i][0];
      var formSubmitted = form.getResponses(timestamp);
      if(formSubmitted.length < 1) continue;
      var editResponseUrl = formSubmitted[0].getEditResponseUrl();
      sheet.getRange(i+1, columnIndex+1).setValue(editResponseUrl);
     
    //  sheet.getRange(i+1, columnIndex+1).setValue(editResponseUrl);
    }
  }
}
