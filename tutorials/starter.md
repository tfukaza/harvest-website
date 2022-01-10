---
layout: tutorial_article
title: Harvest | Tutorials
article_title: Startup Guide
css: [tutorial_page.css, ../asset/prism.css]
---

## Introduction
This is a beginner friendly startup guide to set up 
your first algorithmic trading system using Harvest. 
Through this tutorial, you will code an algorithm 
which trades Twitter stocks using the moving average crossover strategy.

We won't go too deep into details of the framework nor
trading concepts, and instead focus will be on getting
the code up and running.
    
## What You Need
- Python 3.9 or newer
- A code editing software

You should also take this time to set up a way to 
manage your Python versions and packages, using libraries
like `virtualenv` and `conda`. This is especially important
since as of 2021, Python that comes pre-installed with 
computers are usually Python 3.8 or older, meaning you
will have to upgrade it. This can be a surprisingly difficult
process, so take your time!

## Installing
First things first, let's install the library. 

```bash
pip install harvest-python
```

Next, we install additional libraries depending on which
broker you want to use. Harvest will do this automatically,
using the following command:

```bash
pip install harvest-python[API]
```

Where API is replaced by one of the following supported by Harvest:
- Robinhood
- Alpaca
- Polygon
- Kraken

## The Code
Once you have everything installed, we are ready to begin writing the code. For this example we will use Robinhood, but the code is still mostly the same if you decide to use other brokers. 

For this tutorial, there are three components of Harvest 
you need to know:
- Trader: The main class responsible for managing the other classes.
- API: The class that communicates with the brokerage you are using.
- Algo: The class where you define your algorithm.

Create a file called `algo.py` and begin coding in it.

We begin by importing the aforementioned components, 
or, modules, as they are called in Python.

```python
from harvest.algo import BaseAlgo
from harvest.trader import LiveTrader
from harvest.api.robinhood import Robinhood
```

Next we start writing out algorithm. Algorithms are created by extending the BaseAlgo class.

```python
class MyAlgo(BaseAlgo):
    pass
```

There are three methods in the Algo class that you can define. 
- config: Method to initialize parameters for your algorithm.
- setup: Method called right before the algorithm starts. We won't be using this for this tutorial.
- main: Method that runs the main logic of the algorithm.

We first define the config method.

```python
class MyAlgo(BaseAlgo):
    
    def config(self):
        self.watchlist=["TWTR"]
        self.interval="5MIN"
```

`watchlist` is a list of stock symbols we want to track. Since 
we are only tracking Twitter stocks, which has the symbol TWTR,
we set it to `["TWTR"]`.

`interval` specifies the rate we want to run the algorithm at. 
For this algorithm, we arbitrarily decide to check Twitter 
stock prices every `5MIN`.


Next we define the actual logic. 

```python
    def main(self):
```

In short, the moving average crossover strategy works by calculating the average value of the stock over a certain period of time - one for a relatively short period, and another much longer. This strategy states that when the value of the shorter average crosses below the longer average it is a buy, and when it crosses over it's a sell. 

So we first need to calculate the two averages. This can be done by calling BaseAlgo class's `sma` function. We pass in the `period` parameter to specify how to calculate the average.

```python
    def main(self):
        short_avg = self.sma(period=20)
        long_avg = self.sma(period=50)
```

`sma` returns a list of the SMA values. Now we need to check if the latest values in the two lists cross over. For example, if short_avg is [20,30,40] and long_avg is [30,31,32], then we need to trigger a sell. Lucky for you, Harvest comes with a method to do just this - `crossover()`! This returns True if the first list just crossed over the second list. 

```python
    def main(self):
        short_avg = self.sma(period=20)
        long_avg = self.sma(period=50)
        if self.crossover(short_avg, long_avg):
            self.sell()
        elif self.crossover(long_avg, short_avg):
            self.buy()
```

The `buy` and `sell` methods are pretty self-explanatory. When `buy` is called without any parameters, it will take the first stock in the watchlist (TWTR) and buy as many as it can. Likewise, `sell` will 
sell all owned stocks of the first stock in watchlist. 


Finally, we create an instance of the trader class to use this algorithm, and run it. 

```python
if __name__ == "__main__":
    t = LiveTrader( Robinhood() )
```

This creates the Trader class, and also tells it that 
we will be using Robinhood to get stock data and place orders.

Lastly, we specify an instance of the `MyAlgo` class to the trader,
and run it.

```python
    t.set_algo(MyAlgo())
    t.run()
```

Below is the final code after putting everything together.

```python
from harvest.algo import BaseAlgo
from harvest.trader import LiveTrader
from harvest.api.robinhood import Robinhood

class MyAlgo(BaseAlgo):
    
    def config(self):
        self.watchlist=["TWTR"]
        self.interval="5MIN"

    def main(self):
        short_avg = self.sma(period=20)
        long_avg = self.sma(period=50)
        if self.crossover(short_avg, long_avg):
            self.sell()
        elif self.crossover(long_avg, short_avg):
            self.buy()
    
if __name__ == "__main__":
    t = LiveTrader( RobinhoodBroker() )
    t.set_algo( MyAlgo() )
    t.run()
```

## Running the code
You can now run your code:
```bash
python algo.py
```

If this is the first time running your code, a program will start up to guide you through the process of connecting the algorithm to your broker.

Note that buying and selling stocks within the same day is called day-trading, and comes with legal restrictions. So after running the algorithm for a few minutes, make sure to shut it down before it makes too many trades. 

