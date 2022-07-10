---
layout: class
title: Harvest | Doc
---

# get_asset_candle_list
## name
get_asset_candle_list(self, symbol)
## desc
Returns the candles of an asset as a pandas DataFrame. This function is not compatible with options.
## params
- symbol(str): Symbol of stock or crypto asset.
## returns
Prices of asset as a dataframe with the following columns:
- open
- high
- low
- close
- volume
The index is a datetime object

## raises
Exception:If symbol is not in the watchlist.

