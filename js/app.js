var spreadSheet;
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1x4xXJVd33F6oNpUXZXMd5mhcRL-c3TntHLe-ontykdc/pubhtml';
var ruleDiv = document.getElementById("rule");
var cardDiv = document.getElementById("card");

function checkStorage() {
  if (localStorage.getItem("sloppyCards") === null) {
    initSheet();
  } else {
    spreadSheet = JSON.parse(localStorage.getItem("sloppyCards"));
  }
}

function initSheet() {
  Tabletop.init( { key: publicSpreadsheetUrl, callback: saveSheet, simpleSheet: false } );
}

function saveSheet(data, tabletop) {
  spreadSheet = data;
  getCardType();
  spreadSheet.time = new Date();
  var seen = [];
  localStorage.setItem('sloppyCards', JSON.stringify(spreadSheet, function(key, val) {
    if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
              return;
          }
          seen.push(val);
      }
      return val;
    }
  ));
}

function startAnimation(type) {
  alicejs.cheshire({"perspectiveOrigin": "center","direction": "normal","elems": ["card"],"flip": "left","turns": "1","overshoot": "0%","duration": {"value": "2500ms","randomness": "30%"},"timing": "ease","delay": {"value": "0ms","randomness": "0%"},"iteration": "1","playstate": "running"});
  var ruleCount = eval("spreadSheet." + type + ".elements.length");
  var randomNumber = Math.floor(Math.random() * ruleCount); 
  ruleDiv.innerHTML = eval("spreadSheet." + type + ".elements[randomNumber].rule");
}

function getCardType() {
  var typeCount = spreadSheet.Distrubution.elements.length;
  var random = Math.random();
  var valueCount = 0;
  for (i = 0; i < typeCount; i++) {
    valueCount += spreadSheet.Distrubution.elements[i].ratio/100;
    if(random < valueCount) {
      startAnimation(spreadSheet.Distrubution.elements[i].type);
      return;
    } 
  }
}

window.addEventListener('DOMContentLoaded', checkStorage);
cardDiv.addEventListener("click", getCardType);
