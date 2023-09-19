
# ShopeeAdless
Remove Shopee Ad Listing so you wont get confused by stupid non related products on the listing.  

## TamperMonkey
Install [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) and then click [here](https://github.com/anazhd/ShopeeAdless/raw/master/ShopeeAdless.user.js) to install the script.

## Nanoblock/Ublock/ABP (smaller overall footprint)
### This is very buggy and some page wont render
You can easily use this without TamperMonkey. Add this to your Filter
```css
shopee.com.my##div.col-xs-2-4.shopee-search-item-result__item:has(div[data-sqe="ad"])
```
