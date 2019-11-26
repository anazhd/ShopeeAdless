// ==UserScript==
// @name         Shopee No Ad List
// @namespace    https://anazhd.com/
// @version      1.0
// @description  Remove ad from search list.
// @author       Anazhd
// @match        *://shopee.com.my/search?*
// @grant        none
// @runat        context-menu
// ==/UserScript==


(function () {
    'use strict';
    setTimeout(function () {
        document.querySelectorAll(".shopee-search-item-result__item > div > a > div > div > div > div._3ao649").forEach(e => e.parentNode.parentNode.parentNode.remove());
    }, 4000);
})();
