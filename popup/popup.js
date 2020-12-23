const sendMessageId = document.getElementById("sendmessageid");
if (sendMessageId) {
    sendMessageId.onclick = function() {

        var SettingsObj={}
	SettingsObj["snowMax"]=parseFloat(document.getElementById("maxFlakes").value);
	SettingsObj["snowColor"]=document.getElementById("sfcolor").value;
	SettingsObj["snowEntity"]=document.getElementById("sfimg").value;
	SettingsObj["snowSpeed"]=parseFloat(document.getElementById("speed").value);
	SettingsObj["snowMaxSize"]=parseFloat(document.getElementById("maxsize").value);
	SettingsObj["snowMinSize"]=parseFloat(document.getElementById("minsize").value);
	var Settings=JSON.stringify(SettingsObj);
        chrome.tabs.executeScript(null,{code:'window.snowaction="start"'});
        chrome.tabs.executeScript(null,{code:'window.gwSettings='+Settings});
         chrome.tabs.executeScript(null,{file:'snow.js'});
      window.close();
}
}

const stopMessageId = document.getElementById("stopmessageid");
if (stopMessageId) {
    stopMessageId.onclick = function() {

        chrome.tabs.executeScript(null,{code:'window.snowaction="stop"'});
         chrome.tabs.executeScript(null,{file:'snow.js'});
      window.close();
}
}