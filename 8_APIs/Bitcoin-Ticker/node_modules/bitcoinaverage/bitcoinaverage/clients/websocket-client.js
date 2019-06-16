'use strict';

const config = require('../config');
const common = require('../common');
const ws = require('ws');
const restfulClient = require('./restful-client');


module.exports = {
    WebsocketClient: function (publicKey, secretKey) {
        this.publicKey = publicKey;
        this.secretKey = secretKey;

        this.connect = function (url, subscriptionMessage, callbackHandlerFunction, errorHandler, closeHandler) {
            console.log('connecting...');
            var restClient = restfulClient.RestfulClient(this.publicKey, this.secretKey);
            restClient.getTicket(function (response) {
                var ticket = JSON.parse(response)['ticket'];
                var wsUrl = url + '?public_key=' + publicKey + '&ticket=' + ticket;
                var websocket = new ws(wsUrl);

                websocket.onmessage = function (msg) {
                    var res = JSON.parse(msg.data);
                    callbackHandlerFunction(res);
                };

                websocket.onopen = function () {
                    console.log('opening');
                    var msg = JSON.stringify(subscriptionMessage);
                    websocket.send(msg);
                };

                websocket.onerror = function(err) {
                  if(errorHandler) {
                      errorHandler(err)
                  }else{
                      console.log("BA websocket error");
                      console.log(err);
                  }
                };

                websocket.onclose = function(data) {
                    if(closeHandler) {
                        closeHandler(data);
                    }else{
                        console.log("BA websocket closed");
                        console.log(data);
                    }
                };
            })
        };

        this.connectV2 = function (url, subscriptionMessage, callbackHandlerFunction, errorHandler, closeHandler) {
            var ticketUrl = config.BASE_URL_V2 + 'get_ticket';
            var that = this;
            common.getResourceForFullUrl(ticketUrl, this.publicKey, this.secretKey, function (response) {
              var ticket = JSON.parse(response)['ticket'];
              var wsUrl = url + '?public_key=' + that.publicKey + '&ticket=' + ticket;
              var websocket = new ws(wsUrl);

              websocket.onmessage = function (msg) {
                var res = JSON.parse(msg.data);
                callbackHandlerFunction(res);
              };

              websocket.onopen = function () {
                console.log('opening v2');
                var msg = JSON.stringify(subscriptionMessage);
                websocket.send(msg);
              };

              websocket.onerror = function(err) {
                if(errorHandler) {
                  errorHandler(err)
                }else{
                  console.log("BA websocket v2 error");
                  console.log(err);
                }
              };

              websocket.onclose = function(data) {
                if(closeHandler) {
                  closeHandler(data);
                }else{
                  console.log("BA websocket v2 closed");
                  console.log(data);
                }
              };
            })
        };

      /**
       * Connects to BitcoinAverage websocket that provides orderbook data
       * @param exchange - the exchange to receive orderbook data from
       * @param symbols - list of symbols for which to receive orderbook data
       * @param handleResponseCallback - successful response callback
       * @param errorHandler - error callback
       * @param closeHandler - socket closed callback
       */
        this.connectToOrderbookWebsocket = function (exchange, symbols, handleResponseCallback, errorHandler, closeHandler) {
          var wsUrl = config.WEBSOCKET_PREFIX_V2 + 'orderbooks';
          var subscriptionMessage = {
            "event": "message",
            "data": {
              "operation": "subscribe",
                "symbols": symbols,
                "exchange": exchange
            }
          };
          this.connectV2(wsUrl, subscriptionMessage, handleResponseCallback, errorHandler, closeHandler);
        };

      this.connectToTickerWebsocketV2 = function (symbol_set, symbols, handleResponseCallback, errorHandler, closeHandler) {
        var wsUrl = config.WEBSOCKET_PREFIX_V2 + 'ticker';
        var subscriptionMessage = {
          "event": "message",
          "data": {
            "operation": "subscribe",
            "options": {
              "currency_list": symbols,
              "symbol_set": symbol_set
            }
          }
        };
        this.connectV2(wsUrl, subscriptionMessage, handleResponseCallback, errorHandler, closeHandler);
      };

        /**
         * Connects to the websocket which gives ticker data for the specified market and symbol.
         * Override received_message() for custom usage.
         * @param market - local or global
         * @param symbol - crypto-fiat pair (example BTCUSD)
         * @param handleResponseCallback - function which handles the received response message from the socket
         * @param errorHandler - handles error events
         * @param closeHandler - handles close events
         */
        this.connectToTickerWebsocket = function (market, symbol, handleResponseCallback, errorHandler, closeHandler) {
            var wsUrl = config.WEBSOCKET_PREFIX + 'ticker';
            var subscriptionMessage = {
                "event": "message",
                "data": {
                    "operation": "subscribe",
                    "options": {
                        "currency": symbol,
                        "market": market
                    }
                }
            };
            this.connect(wsUrl, subscriptionMessage, handleResponseCallback, errorHandler, closeHandler);
        };

        /**
         * Connects to the websocket which gives data for the given exchange.
         * @param exchangeName - lowercase exchange name (example: kraken)
         * @param handleResponseCallback - function which handles the received response message from the socket
         * @param errorHandler - handles error events
         * @param closeHandler - handles close events
         */
        this.connectToExchangeWebsocket = function (exchangeName, handleResponseCallback, errorHandler, closeHandler) {
            var wsUrl = config.WEBSOCKET_PREFIX + 'exchanges';
            var subscriptionMessage = {
                "event": "message",
                "data": {
                    "operation": "subscribe",
                    "options": {
                        "exchange": exchangeName
                    }
                }
            };
            this.connect(wsUrl, subscriptionMessage, handleResponseCallback, errorHandler, closeHandler);
        };

        return this;
    }
};

