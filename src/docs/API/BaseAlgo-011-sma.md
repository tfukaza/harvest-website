---
layout: class
title: Harvest | Doc
---

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

