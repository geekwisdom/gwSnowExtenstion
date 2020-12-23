function gwSnow(SettingsObj)
{
this.doSnow=false;
this.snowMax = 35;
this.snowColor = ["#DDD", "#EEE"];
this.snowEntity = "\u2744";
this.snowSpeed = 0.75;
this.snowMinSize = 8;
this.snowMaxSize = 24;
this.snowRefresh = 50;
this.snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";
if (SettingsObj != null)
{
if (SettingsObj.hasOwnProperty("snowMax")) this.snowMax = SettingsObj["snowMax"];
if (SettingsObj.hasOwnProperty("snowColor")) this.snowColor = JSON.parse(SettingsObj["snowColor"])	;
if (SettingsObj.hasOwnProperty("snowEntity")) this.snowEntity = decodeURI(SettingsObj["snowEntity"]);
if (SettingsObj.hasOwnProperty("snowSpeed")) this.snowSpeed = SettingsObj["snowSpeed"];
if (SettingsObj.hasOwnProperty("snowMaxSize")) this.snowMinSize = SettingsObj["snowMaxSize"];
if (SettingsObj.hasOwnProperty("snowMinSize")) this.snowMaxSize = SettingsObj["snowMinSize"];
if (SettingsObj.hasOwnProperty("snowRefresh")) this.snowMaxSize = SettingsObj["snowRefresh"];
if (SettingsObj.hasOwnProperty("snowStyles")) this.snowMaxSize = SettingsObj["snowStyles"];
}

}
gwSnow.prototype.initSnow = function (SettingsObj)
{
var snowEnabled=false;

if (SettingsObj != null)
{
if (SettingsObj.hasOwnProperty("snowMax")) this.snowMax = SettingsObj["snowMax"];
if (SettingsObj.hasOwnProperty("snowColor")) this.snowColor = JSON.parse(SettingsObj["snowColor"]);
if (SettingsObj.hasOwnProperty("snowEntity")) this.snowEntity = decodeURI(SettingsObj["snowEntity"]);
if (SettingsObj.hasOwnProperty("snowSpeed")) this.snowSpeed = SettingsObj["snowSpeed"];
if (SettingsObj.hasOwnProperty("snowMaxSize")) this.snowMinSize = SettingsObj["snowMaxSize"];
if (SettingsObj.hasOwnProperty("snowMinSize")) this.snowMaxSize = SettingsObj["snowMinSize"];
if (SettingsObj.hasOwnProperty("snowRefresh")) this.snowMaxSize = SettingsObj["snowRefresh"];
if (SettingsObj.hasOwnProperty("snowStyles")) this.snowMaxSize = SettingsObj["snowStyles"];
}



var snow = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

var randomise = function (range){
	rand = Math.floor(range * Math.random());
	return rand;
		}

var startSnow = function () {

        obj.doSnow=true;
for (i = 0; i <= obj.snowMax; i++) {
        var node=document.createElement("span");
        node.id="flake"+i;
        node.style=obj.snowStyles + "position:absolute;top:-" + obj.snowMaxSize;
        var textnode = document.createTextNode(obj.snowEntity); 

        node.appendChild(textnode);
        document.body.appendChild(node);
//	document.write("<span id='flake" + i + "' style='" + obj.snowStyles + "position:absolute;top:-" + obj.snowMaxSize + "'>" + obj.snowEntity + "</span>");
}

	var snowSize = obj.snowMaxSize - obj.snowMinSize;
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;

	for (i = 0; i <= obj.snowMax; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 15;
		pos[i] = 0.03 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + obj.snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = obj.snowColor[randomise(obj.snowColor.length)];
		snow[i].style.zIndex = 1000;
		snow[i].sink = obj.snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
	}


	moveSnow();
}

var resize=function () {
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;
}

var moveSnow = function () {
if (obj.doSnow) {
	for (i = 0; i <= obj.snowMax; i++) {
		coords[i] += pos[i];
		snow[i].posY += snow[i].sink;
		snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
		snow[i].style.top = snow[i].posY + "px";

		if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
			snow[i].posX = randomise(marginRight - snow[i].size);
			snow[i].posY = 0;
		}
	}

	setTimeout( function(){ moveSnow(); }, obj.snowRefresh);
}
}
var obj=this;
startSnow();
moveSnow();

}

gwSnow.prototype.StopSnow = function ()
{
this.doSnow=false;
var snowMax = this.snowMax;
for (i = 0; i <= snowMax; i++) {
var elem = document.getElementById('flake'+i);
elem.parentNode.removeChild(elem);
}

}

if (typeof window.gwsnow == "undefined") window.gwsnow = new gwSnow();
if (window.snowaction == "start") window.gwsnow.initSnow(window.gwSettings);
if (window.snowaction == "stop") window.gwsnow.StopSnow();
