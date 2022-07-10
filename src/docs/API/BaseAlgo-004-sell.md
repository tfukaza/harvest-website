---
layout: class
title: Harvest | Doc
---

# sell
## name
sell(self, symbol, quantity, in_force, extended)
## desc
Sells the specified asset. When called, a limit sell order is placed with a limit price 5% lower than the current price. This is a general function that can be used to sell stocks, crypto, and options.
## param
- symbol(str): Symbol of the asset to sell. If not specified,
- quantity(float): Quantity of asset to sell. If not specified, it will sell all currently owned quantity
- in_force(str): Duration the order is in force. Choose from 'gtc' (Good 'til canceled) or 'gtd' (). Defaults to 'gtc
- extended(str): Whether to trade in extended hours or not. Defaults to Fals
## returns
A dictionary with the following keys:
- order_id: str, ID of order
- symbol: str, symbol of asset
## raises
Exception:There is an error in the order process.

