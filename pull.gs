
function doGet(e){
  main();
}
/* Creates a folder "AppsFlyer Reports" in the user Drive or returns the folder if one already exists */
function GetFolder(){
  var folders = DriveApp.getFolders();
while (folders.hasNext()) {
  var folder = folders.next();
  var folder_name = folder.getName();
  if(folder_name == "AppsFlyer Reports"){
    return DriveApp.getFoldersByName(folder_name).next();
    }
  }
  return DriveApp.createFolder("AppsFlyer Reports");
}



/* Call the API and stores the results file */
function main() { 
  var date = new Date();
  date.setDate(date.getDate() -2);
  var yesterday = Utilities.formatDate(date, "GMT+1", "yyyy-MM-dd");
  
 
  var file = SpreadsheetApp.create("installs " + yesterday);
  var temp = DriveApp.getFileById(file.getId());
  var tempFolder = GetFolder();
  tempFolder.addFile(temp);
  DriveApp.removeFile(temp);
  var pull_request = "[Place API endpoint HERE]" + yesterday + "&to=" + yesterday;
  var csv_text = UrlFetchApp.fetch(pull_request).getContentText();
  var csvData = Utilities.parseCsv(csv_text);
  file.getActiveSheet().getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
 
}

