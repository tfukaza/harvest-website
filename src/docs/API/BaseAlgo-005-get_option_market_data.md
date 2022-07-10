---
layout: class
title: Harvest | Doc
---

# get_option_market_data
## name
get_option_market_data(self, symbol)
## desc
Retrieves data of specified option. Note that the price returned by this function returns the price per contract, not the total price of the option position.
## param
- symbol(str):OCC symbol of optio

## returns
A dictionary:
- price: price of option
- ask: ask price
- bid: bid price

