---
layout: class
title: Harvest | Doc
---

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

