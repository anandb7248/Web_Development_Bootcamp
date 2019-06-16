This library enables quick and easy access to our Bitcoin, Ethereum, Litecoin, Ripple and other cryptocurrency exchange rates.


### Install


```
npm install bitcoinaverage
```



### Setup
Get your public and private keys from our website and you are ready to run these examples.

```javascript
const ba = require('bitcoinaverage');

var publicKey = 'yourPublicKey';
var secretKey = 'yourSecretKey';

var restClient = ba.restfulClient(publicKey, secretKey);
var wsClient = ba.websocketClient(publicKey, secretKey);
```



### Ticker Data
The response received by https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD.

The symbol_set can be one of: local, global, crypto and tokens.

The symbol can be any pair from our [Full symbol list](https://apiv2.bitcoinaverage.com/constants/indices/ticker/symbols)
```javascript
var symbol_set = 'global';
var symbol = 'BTCUSD';

restClient.getTickerDataPerSymbol('global', 'BTCUSD', function(response) {
    console.log(response);
}, function(error){
    console.log(error);
}) ;
```

### Exchange Data

#### All price data from single exchange
```javascript
restClient.perExchangeData('bitstamp',
    function(response){
        console.log(response);
    },
    function(err){
        console.log(err);
    });
```

#### Data from all exchanges for one symbol
```javascript
restClient.allExchangeDataForSymbol('BTCGBP',
    function(response){
        console.log(response);
    },
    function(err){
        console.log(err);
    });
```

### Websocket
Connect to one of our websocket endpoints and get real-time updates for the Bitcoin Global Price Index.

#### Ticker websocket

```javascript
wsClient.connectToTickerWebsocket('global', 'BTCUSD', function(response) {
    console.log(response);
}, function(error){
    console.log(error)
}, function(){
    console.log("websocket closed");
});
```

### Websocket V2

Enterprise users can access our new and improved version 2 of our Websocket API.
It provides faster updates and supports multiple symbols in a single connection.

#### Ticker websocket V2

```javascript
wsClient.connectToTickerWebsocketV2('tokens', ['OMGETH', 'EOSBTC'], function(response) {
    console.log(response);
}, function(error){
    console.log(error)
}, function(){
    console.log("websocket closed");
});
```



#### Orderbook websocket
```javascript
var symbols = ['BTCUSD', 'ETHUSD'];
var exchange = 'bitfinex';
var ORDERBOOKS = {
    BTCUSD: {},
    ETHUSD: {}
};
var symbol = '';
ws.connectToOrderbookWebsocket(exchange, symbols, function(response){
    symbol = respnose.data.symbol;
    if(response.data.type === "snapshot"){
        ORDERBOOKS[symbol].asks = response.data.asks;
        ORDERBOOKS[symbol].bids = response.data.bids;
     }else{
       console.log(response.data.updates);
       for (var i = 0; i < response.data.updates.length; i++){
          var item = response.data.updates[i];
         if(item.amount === 0){
            delete(ORDERBOOKS[symbol][item.side][item.price]);
         }else{
           ORDERBOOKS[symbol][item.side][item.price] = item;
         }
       }
     }
}, function(err){
console.log(err);
});
```