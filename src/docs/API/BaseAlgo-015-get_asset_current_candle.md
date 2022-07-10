---
layout: class
title: Harvest | Doc
---

# get_asset_current_candle
## name
get_asset_current_candle(self, symbol)
## desc
Returns the most recent candle as a pandas DataFrame. This function is not compatible with options.
## params
- symbol(str): Symbol of stock or crypto asset.
## returns
Price of asset as a dataframe with the following columns:
- open
- high
- low
- close
- volume
The index is a datetime object

## raises
Exception:If symbol is not in the watchlist.

get_asset_candle_list(self, symbol)
