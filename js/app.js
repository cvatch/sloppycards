// Settings for changes without much coding
var settings = {};
settings.cardAnimation = {};
settings.cardAnimation.duration = {};
settings.cardAnimation.delay = {};

// Card animation settings
settings.cardAnimation.perspectiveOrigin = "center";
settings.cardAnimation.direction = "normal";
settings.cardAnimation.flip = "left";
settings.cardAnimation.turns = "1";
settings.cardAnimation.overshoot = "0%";
settings.cardAnimation.duration.value = "750ms";
settings.cardAnimation.duration.randomness = "0%";
settings.cardAnimation.timing = "ease";
settings.cardAnimation.delay.value = "0ms";
settings.cardAnimation.delay.randomness = "0%";

var spreadSheet;
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1x4xXJVd33F6oNpUXZXMd5mhcRL-c3TntHLe-ontykdc/pubhtml';
var ruleDiv = document.getElementById("rule");
var cardDiv = document.getElementById("card");

function checkStorage() {
  if (localStorage.getItem("sloppyCards") === null) {
    initSheet();
  } else {
    spreadSheet = JSON.parse(localStorage.getItem("sloppyCards"));
    getCardType();
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
  alicejs.cheshire({"perspectiveOrigin": settings.cardAnimation.perspectiveOrigin,"direction": settings.cardAnimation.direction,"elems": ["card"],"flip": settings.cardAnimation.flip,"turns": settings.cardAnimation.turns,"overshoot": settings.cardAnimation.overshoot,"duration": {"value": settings.cardAnimation.duration.value,"randomness": settings.cardAnimation.duration.randomness},"timing": settings.cardAnimation.timing,"delay": {"value": settings.cardAnimation.delay.value,"randomness": settings.cardAnimation.delay.randomness},"iteration": "1","playstate": "running"});
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
