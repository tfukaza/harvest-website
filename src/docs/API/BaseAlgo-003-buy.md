---
layout: class
title: Harvest | Doc
---

# buy
## name
buy(self, symbol, quantity, in_force, extended)
## desc
Buys the specified asset. When called, a limit buy order is placed with a limit price 5% higher than the current price. This is a general function that can be used to buy stocks, crypto, and options.

## param
- symbol(str): Symbol of the asset to buy. If not specified,
- quantity(float): Quantity of asset to buy. If not specified, it will buy as many as possible given the current buying power
- in_force(str): Duration the order is in force. Choose from 'gtc' (Good 'til canceled) or 'gtd' ().
- extended(str): Whether to trade in extended hours or not. Default False

## returns
The following Python dictionary:
- order_id: str, ID of order
- symbol: str, symbol of asset

## raises
Exception:There is an error in the order process.

