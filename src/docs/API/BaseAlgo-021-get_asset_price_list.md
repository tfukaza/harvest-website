---
layout: class
title: Harvest | Doc
---

# get_asset_price_list
## name
get_asset_price_list(self, symbol, interval, ref)
## desc
Returns a list of recent prices for an asset. This function is not compatible with options.

## param
- symbol(str): Symbol of stock or crypto asset.
- interval(str): Interval of data.
- ref(str): 'close', 'open', 'high', or 'low'.

## returns
List of prices

get_asset_quantity(self, symbol, include_pending_buy, include_pending_sell)
