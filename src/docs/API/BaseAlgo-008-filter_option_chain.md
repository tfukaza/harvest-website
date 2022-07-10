---
layout: class
title: Harvest | Doc
---

# filter_option_chain
## name
filter_option_chain(self, symbol, type, lower_exp, upper_exp, lower_strike, upper_strike)
## desc
Returns a DataFrame of options that satisfies the criteria specified. The lower_exp and upper_exp input can either be a string in the format "YYYY-MM-DD" or a datetime object.
## param
- symbol(str): Symbol of stock.
- type(str): 'call' or 'put
- lower_exp(str): Minimum expiration date of the option, inclusive
- upper_exp(str): Maximum expiration date of the option, inclusive
- lower_strike(float): The minimum strike price of the option, inclusive
- upper_strike(float): The maximum strike price of the option, inclusive

## returns
A DataFrame, with an index of strings representing the OCC symbol of options, and the following columns

|symbol	               | type            |	strike               |
|----------------------|-----------------|-----------------------|
|(str) ticker of stock | 'call' or 'put' |	(float) strike price |


