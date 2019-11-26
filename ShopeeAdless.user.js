// ==UserScript==
// @name         Shopee No Ad List
// @namespace    https://github.com/anazhd/ShopeeAdless/
// @version      1.4
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
        selectorTxt, /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
        actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
        bWaitOnce, /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
        iframeSelector /* Optional: If set, identifies the iframe to
                        search.
                    */
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
            /*--- Found target node(s).  Go through each and act if they
                are new.
            */
            targetNodes.each(function () {
                var jThis = jQuery(this);
                var alreadyFound = jThis.data('alreadyFound') || false;

                if (!alreadyFound) {
                    //--- Call the payload function.
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

        //--- Get the timer-control variable for this selector.
        var controlObj = waitForKeyElements.controlObj || {};
        var controlKey = selectorTxt.replace(/[^\w]/g, "_");
        var timeControl = controlObj[controlKey];

        //--- Now set or clear the timer as appropriate.
        if (btargetsFound && bWaitOnce && timeControl) {
            //--- The only condition where we need to clear the timer.
            clearInterval(timeControl);
            delete controlObj[controlKey]
        }
        else {
            //--- Set a timer, if needed.
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
        deleteAD
    );

    function deleteAD() {
        document.querySelectorAll(".shopee-search-item-result__item > div > a > div > div > div > div[data-sqe='ad']").forEach(e => e.parentNode.parentNode.parentNode.remove());
    }

});

