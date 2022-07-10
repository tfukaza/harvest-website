---
layout: class
title: Harvest | Doc
articleTitle: BaseAlgo
css: ["../asset/prism-dark-min.css"]
---

# setup
## name
setup(self)
## desc
Method called right before algorithm begins.


# main
## name
main(self)
## desc
Main method to run the algorithm.


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


# ema
## name
ema(self, symbol, period, interval, ref, prices)
## desc
Calculate EMA
## param
- symbol(str): Symbol to perform calculation on.
- period(int): Period of EMA.
- interval(str): Interval to perform the calculation.
- ref(str): 'close', 'open', 'high', or 'low'.
- prices(list): When specified, this function will use the values provided in the list to perform calculations and ignore other parameters.
## returns
A list in numpy format, containing EMA values

# rsi
## name
rsi(self, symbol, period, interval, ref, prices)
## desc
Calculate RSI

## param
- symbol(str): Symbol to perform calculation on.
- period(int): Period of RSI.
- interval(str): Interval to perform the calculation.
- ref(str): 'close', 'open', 'high', or 'low'.
- prices(list): When specified, this function will use the values provided in the list to perform calculations and ignore other parameters.

## returns
A list in numpy format, containing RSI values

# sma
## name
sma(self, symbol, period, interval, ref, prices)
## desc
Calculate SMA
## param
Parameters
- symbol(str): Symbol to perform calculation on.
- period(int): Period of SMA.
- interval(str): Interval to perform the calculation.
- ref(str): 'close', 'open', 'high', or 'low'.
- prices(list): When specified, this function will use the values provided in the list to perform calculations and ignore other parameters.

## returns
A list in numpy format, containing SMA values

# bbands
## name
bbands(self, symbol, period, interval, ref, dev, prices)
## desc
Calculate Bollinger Bands
## param
- symbol(str): Symbol to perform calculation on.
- period(int): Period of BBands.
- interval(str): Interval to perform the calculation.
- ref(str): 'close', 'open', 'high', or 'low'.
- dev(float): Standard deviation of the bands.
- prices(list): When specified, this function will use the values provided in the list to perform calculations and ignore other parameters.

## returns
A tuple of numpy lists, each a list of BBand top, average, and bottom values

# get_account_buying_power
## name
get_account_buying_power(self)
## desc
Returns the current buying power of the user.
## returns
The current buying power as a float.



# get_account_equity
## name
get_account_equity(self)
## desc
Returns the current equity.
## returns
The current equity as a float.

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

# get_asset_avg_cost
## name
get_asset_avg_cost(self, symbol)
## desc
Returns the average cost of a specified asset.
## params
- symbol(str): Symbol of asset.
## returns
Average cost of asset. Returns None if asset is not being tracked.
## raises
Exception:If symbol is not currently owned.

# get_date
## name
get_date(self)
## desc
Returns the current date.
## returns
The current date as a datetime object

# get_datetime
## name
get_datetime(self)
## desc
Returns the current date and time. The returned datetime object is offset-naive, adjusted to the local timezone.
## returns
The current date and time as a datetime object

# get_asset_current_price
## name
get_asset_current_price(self, symbol)
## desc
Returns the current price of a specified asset.
## params
- symbol(str): Symbol of asset.
## returns
Price of asset.
## raises
Exception:If symbol is not in the watchlist.

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

# get_asset_profit_percent
## name
get_asset_profit_percent(self, symbol)
## desc
Returns the return of a specified asset.
## params
- symbol(str): Symbol of stock, crypto, or option. Options should be in OCC format.
## returns
Return of asset, expressed as a decimal.

# get_time
## name
get_time(self)
## desc
Returns the current hour and minute.

This returns the current time, which is different from the timestamp of stock prices. For example, if you are running an algorithm every 5 minutes, at 11:30am you will get price data with a timestamp of 11:25am. This function will return 11:30am.

## returns
The current time as a datetime object

# get_account_stock_positions
## name
get_account_stock_positions(self)
## desc
Returns the current stock positions.
## returns
A list of Position objects for all currently owned stocks.

# get_account_crypto_positions
## name
get_account_crypto_positions(self)
## desc
Returns the current crypto positions.
## returns
A list of Position objects for all currently owned crypto.


# get_account_option_positions
## name
get_account_option_positions(self)
## desc
Returns the current option positions.
## returns
A list of OptionPosition objects for all currently owned options.

# get_watchlist
## name
get_watchlist(self)
## desc
Returns the current watchlist.
## returns
A list of symbols.