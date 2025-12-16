// ==UserScript==
// @name         在App内下载油猴脚本
// @version      0.0.1
// @description  Stay & Addons
// @author       npc
// @exclude      *://greasyfork.org/*/scripts?q=*
// @exclude      *://greasyfork.org/*/scripts/by-site/*
// @exclude      *://sleazyfork.org/*/scripts?q=*
// @exclude      *://sleazyfork.org/*/scripts/by-site/*
// @match        *://greasyfork.org/*/scripts/*
// @match        *://sleazyfork.org/*/scripts/*
// @icon         https://raw.githubusercontent.com/KawOat9/icons/main/addons_scripts.png
// @updateURL    https://raw.githubusercontent.com/KawOat9/Scripts/main/Userscripts/App(Stay_Addons).user.js
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    let installBtn = document.querySelector("a.install-link");
    var buttonStay = document.createElement("a");
    buttonStay.append("Stay");
    buttonStay.className = installBtn.className;
	buttonStay.style.color = "#FFF";
	buttonStay.style.background = "#1E971E";
	buttonStay.style.width = "34px";
	buttonStay.style.border = "0.5px solid lightgray";
	buttonStay.style.textAlign = "center";
	buttonStay.style.paddingLeft = "8px";
	buttonStay.style.paddingRight = "8px";
    buttonStay.href = "stay://x-callback-url/install?scriptURL=" + installBtn.href;
installBtn.parentNode.insertBefore(buttonStay, installBtn.nextSibling);
    var buttonAddons = document.createElement("a");
    buttonAddons.append("Addons");
    buttonAddons.className = installBtn.className;
	buttonAddons.style.color = "#FFF";
	buttonAddons.style.background = "#1E971E";
	buttonAddons.style.width = "55px";
	buttonAddons.style.border = "0.5px solid lightgray";
	buttonAddons.style.textAlign = "center";
	buttonAddons.style.paddingLeft = "8px";
	buttonAddons.style.paddingRight = "8px";
    var encodedURL = encodeURI(installBtn.href);
    var encodedBase64URL = btoa(encodedURL);
    buttonAddons.href = "addons://installJS?command=20&url=" + encodedBase64URL;
    installBtn.parentNode.insertBefore(buttonAddons, installBtn.nextSibling.nextSibling);
    const installHelpLink = document.querySelector('a.install-help-link');
    installHelpLink.style.display = 'none';
})();
