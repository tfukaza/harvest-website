---
layout: class
title: Harvest | Doc
---

# get_option_chain
## name 
get_option_chain(self, symbol, date)
## desc
Returns the option chain for the specified symbol and expiration date. The date parameter can either be a string in the format "YYYY-MM-DD" or a datetime object. This function is often used in conjunction with the get_option_chain_info function in order to retrieve the available expiration dates.
## param
- symbol(str):symbol of stock
- date(datetime.Datetime): date of option expiration

## returns
A dataframe with the follwing columns: - exp_date(datetime.datetime): The expiration date, as offset-naive DateTime object with timezone adjusted to the timezone of the exchange being used - strike(float): Strike price - type(str): 'call' or 'put'

The index is the OCC symbol of the option.

