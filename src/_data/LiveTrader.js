const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async function() {
    console.log( "Fetching docstring data..." );
  
    return fetch("https://raw.githubusercontent.com/tfukaza/harvest/gh-pages/LiveTrader.json")
      .then(res => res.json()) // node-fetch option to transform to json
      .then(json => {
        return json
      });
  }; 
  