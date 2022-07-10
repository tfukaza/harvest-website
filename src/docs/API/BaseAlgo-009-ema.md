---
layout: class
title: Harvest | Doc
---

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

