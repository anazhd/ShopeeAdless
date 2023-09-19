
# ShopeeAdless
Remove Shopee Ad Listing so you wont get confused by stupid non related products on the listing.  

### Nanoblock/Ublock/ABP (smaller overall footprint)
You can easily use this without TamperMonkey. Add this to your Filter
```css
shopee.com.my##div.col-xs-2-4.shopee-search-item-result__item:has(div[data-sqe="ad"])
```
