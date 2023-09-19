// ==UserScript==
// @name         Shopee Ad Remover
// @namespace    https://github.com/anazhd/ShopeeAdless/
// @version      2.0
// @description  Hide ads from search list.
// @author       Anazhd
// @match        *://shopee.com.my/*
// @grant        none
// @run-at       document-end
// @downloadURL https://github.com/anazhd/ShopeeAdless/raw/master/ShopeeAdless.user.js
// @updateURL https://github.com/anazhd/ShopeeAdless/raw/master/ShopeeAdless.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to hide ads
    function hideAds() {
        var adElements = document.querySelectorAll('div.col-xs-2-4.shopee-search-item-result__item:has(div[data-sqe="ad"])');
        adElements.forEach(function(element) {
            element.style.display = 'none';
        });
    }

    // Wait for the page to fully load before hiding ads
    window.addEventListener('load', function() {
        hideAds();
    });

    // Watch for DOM mutations to hide ads in dynamically loaded content
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                hideAds();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
