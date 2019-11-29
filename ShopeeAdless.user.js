// ==UserScript==
// @name         Shopee No Ad List
// @namespace    https://github.com/anazhd/ShopeeAdless/
// @version      1.5
// @description  Remove ad from search list.
// @author       Anazhd
// @match        *://shopee.com.my/*
// @grant        none
// @run-at       document-start
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @downloadURL https://github.com/anazhd/ShopeeAdless/raw/master/ShopeeAdless.user.js
// @updateURL https://github.com/anazhd/ShopeeAdless/raw/master/ShopeeAdless.user.js
// ==/UserScript==

$(document).ready(function () {

    function waitForKeyElements(
        selectorTxt,
        actionFunction,
        bWaitOnce,
        iframeSelector
    ) {
        var targetNodes, btargetsFound;

        if (typeof iframeSelector == "undefined") {
            targetNodes = jQuery(selectorTxt);
        } else {
            targetNodes = jQuery(iframeSelector).contents()
                .find(selectorTxt);
        }

        if (targetNodes && targetNodes.length > 0) {
            btargetsFound = true;
            targetNodes.each(function () {
                var jThis = jQuery(this);
                var alreadyFound = jThis.data('alreadyFound') || false;

                if (!alreadyFound) {
                    var cancelFound = actionFunction(jThis);
                    if (cancelFound)
                        btargetsFound = false;
                    else
                        jThis.data('alreadyFound', true);
                }
            });
        }
        else {
            btargetsFound = false;
        }

        var controlObj = waitForKeyElements.controlObj || {};
        var controlKey = selectorTxt.replace(/[^\w]/g, "_");
        var timeControl = controlObj[controlKey];

        if (btargetsFound && bWaitOnce && timeControl) {
            clearInterval(timeControl);
            delete controlObj[controlKey]
        }
        else {
            if (!timeControl) {
                timeControl = setInterval(function () {
                    waitForKeyElements(selectorTxt,
                        actionFunction,
                        bWaitOnce,
                        iframeSelector
                    );
                },
                    300
                );
                controlObj[controlKey] = timeControl;
            }
        }
        waitForKeyElements.controlObj = controlObj;
    }

    waitForKeyElements(
        ".shopee-search-item-result__item > div > a > div > div > div > div[data-sqe='ad']",
        deleteAd
    );

    function deleteAd() {
        document.querySelectorAll(".shopee-search-item-result__item > div > a > div > div > div > div[data-sqe='ad']").forEach(e => e.parentNode.parentNode.parentNode.remove());
    }

});
