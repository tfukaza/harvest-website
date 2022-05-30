---
layout: tutorial_article
title: Harvest | Doc
css: [docs.css]
articleTitle: Installation
---
    
<div class="alert alert-warning shadow-lg mt-8">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Harvest requires Python 3.9 or newer</span>
  </div>
</div>

Use pip to install the library.
```bash
pip install harvest-python
```

Install additional libraries for any brokerages you want to use:
```bash
pip install harvest-python[API]
```
Replace `API` with one of the following brokerages supported by Harvest:
- Robinhood
- Alpaca
- Polygon
- Kraken