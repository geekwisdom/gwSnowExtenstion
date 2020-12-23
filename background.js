chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  alert ("Clicked!");
  chrome.tabs.executeScript({
    file:snow.js
  });
});