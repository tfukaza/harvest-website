---
layout: class
title: Harvest | Doc
---

# get_time
## name
get_time(self)
## desc
Returns the current hour and minute.

This returns the current time, which is different from the timestamp of stock prices. For example, if you are running an algorithm every 5 minutes, at 11:30am you will get price data with a timestamp of 11:25am. This function will return 11:30am.

## returns
The current time as a datetime object

