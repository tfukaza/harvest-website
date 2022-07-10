---
layout: class
title: Harvest | Doc
---

# get_asset_quantity
## name
get_asset_quantity(self, symbol, include_pending_buy, include_pending_sell)
## desc
Returns the quantity owned of a specified asset.
## params
- symbol(str): Symbol of asset.
- include_pending_buy(bool): Include pending buy orders in quantity.
- include_pending_sell(bool): Include pending sell orders in quantity.
## returns
Quantity of asset as float. 0 if quantity is not owned.

