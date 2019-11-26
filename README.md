
# ShopeeAdless
Remove Shopee Ad Listing so you wont get confused by stupid non related products on the listing.  

### TamperMonkey
Install [TamperMonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) and then click [here](https://github.com/anazhd/ShopeeAdless/raw/master/ShopeeAdless.user.js) to install the script.

### Nanoblock/Ublock/ABP
You can easily use this without TamperMonkey. Add this on your Filter
```css
shopee.com.my##.shopee-search-item-result__item:-abp-has(> div > a > div > div > div > div[data-sqe="ad"])
```
