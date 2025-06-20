// ==UserScript==
// @name         TrustScanner
// @namespace    http://tampermonkey.net/
// @version      v1.0.0
// @description  Warn users about potentially malicious websites by checking the domain against the FishFish API and displaying a prominent alert if flagged as malware or phishing.
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=apivoid.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function getCurrentDomain() {
    const hostname = window.location.host

    // Regex to extract the main domain
    const regex = /(?:[a-zA-Z0-9-]+\.)*([a-zA-Z0-9-]+\.[a-zA-Z]{2,})$/;

    // Match the hostname against the regex
    const match = hostname.match(regex);

    // Return the main domain or null if no match
    return match ? match[1] : null;
}

async function checkWebsite(domain) {
    const apiURL = "https://api.fishfish.gg/v1/domains/"
    const completeURL = apiURL + domain

    // API Request 
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: completeURL,
            onload: function(response) {
                if (response.status === 404) {
                    resolve("Not found");
                } else if (response.status === 200) {
                    try {
                        const data = JSON.parse(response.responseText);
                        resolve(data.category);
                    } catch(e) {
                        reject(e);
                    }
                } else {
                    reject(new Error("HTTP Status: " + response.status));
                }
            },
            onerror: function(err) {
                reject(new Error("An error occurred during the api request"));
            }
        });
    });
}

function showBanner(result) {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.minHeight = '20vh';
    div.style.padding = '2vh 1vw';
    div.style.backgroundColor = 'red';
    div.style.fontSize = '4vw';
    div.style.color = 'white';
    div.style.textAlign = 'center';
    div.style.boxSizing = 'border-box';

    div.innerHTML = `This site was flagged as\u00A0<strong>${result}</strong>. Proceed with caution!`

    document.body.prepend(div);
}

(async function() {
    'use strict';

    const result = await checkWebsite(getCurrentDomain())
    if(result === "safe") {
        console.log("Website is marked as safe")
    } else if(result === "malware" || result === "phishing") {
        showBanner(result)
    } else if(result === "Not found") {
        console.log("Website was not found in the FishFish Database. Do you think its dangerous? Visit https://fishfish.gg/")
    } else {
        console.log("ERROR: Returned result: " + result)
    }
})();