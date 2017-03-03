var spreadSheet;
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1x4xXJVd33F6oNpUXZXMd5mhcRL-c3TntHLe-ontykdc/pubhtml';

function initSheet() {
  Tabletop.init( { key: publicSpreadsheetUrl, callback: saveSheet, simpleSheet: false } );
}

var seen = [];
function saveSheet(data, tabletop) {
  document.getElementById("json").innerHTML = JSON.stringify(data, function(key, val) {
    if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
              return;
          }
          seen.push(val);
      }   
      return val;
    }   
  );
}

initSheet();
