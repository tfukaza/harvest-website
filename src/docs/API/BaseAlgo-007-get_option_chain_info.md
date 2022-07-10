---
layout: class
title: Harvest | Doc
---

# get_option_chain_info
## name
get_option_chain_info(self, symbol)
## desc
Returns data of a stock's option chain. Given a stock's symbol, this function returns a dictionary with two data. The first is a list indicating the available expiration dates of the option. The second is the multiplier, which indicates how many contracts are in a single option. For example, if you buy an option priced at $1.20 and the multiplier is 100, you will need to pay $120 to buy one option.

This function is often used in conjunction with the get_option_chain function.

## param
- symbol(str): symbol of stock.

## returns
A dict with the following keys:
- exp_dates: List of expiration dates as strings in the format "YYYY-MM-DD"
- multiplier: float. Multiplier of the option, usually 100

