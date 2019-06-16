'use strict';

const config = require('../config');
const common = require('../common');

module.exports = {
    RestfulClient: function (publicKey, secretKey) {
        this.publicKey = publicKey;
        this.secretKey = secretKey;

        /**
         * This is a generic function which is used by the other functions.
         * You can also use this function with a specific url as parameter and providing a function which will handle the response.
         * Example: to print the data from https://apiv2.bitcoinaverage.com/constants/symbols, you need to call:
         * restfulClient.getResource('constants/symbols', function(response) {
         *     console.log(response);
         * });
         * @param resourcePath - the resource's path, without the domain name
         * @param handleResponseCallback
         * @param errorCallback - callback function which handles the response
          - callback function which handles errors
         * @returns {*}
         */
        this.getResource = function (resourcePath, handleResponseCallback, errorCallback) {
            var fullUrl = config.BETA_PREFIX + resourcePath;
            return common.getResourceForFullUrl(fullUrl, this.publicKey, this.secretKey, handleResponseCallback, errorCallback);
        };

        /**
         * Get all symbols (local and global) and process them with handleResponseCallback callback.
         * @param handleResponseCallback
         * @param errorCallback - callback function which handles the response
         */
        this.allSymbols = function (handleResponseCallback, errorCallback) {
            return this.getResource('constants/symbols', handleResponseCallback, errorCallback);
        };

        /**
         * Symbols for a specific market
         * @param market - global or local
         * @param handleResponseCallback
         * @param errorCallback
         
         * @returns {*}
         */
        this.symbolsPerMarket = function (market, handleResponseCallback, errorCallback) {
            var url = 'constants/symbols/' + market;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * Symbols for local market.
         * @param handleResponseCallback
         * @param errorCallback
         
         */
        this.symbolsLocal = function (handleResponseCallback, errorCallback) {
            return this.symbolsPerMarket('local', handleResponseCallback, errorCallback);
        };

        /**
         * Symbols for global market.
         * @param handleResponseCallback
         * @param errorCallback
         
         */
        this.symbolsGlobal = function (handleResponseCallback, errorCallback) {
            return this.symbolsPerMarket('global', handleResponseCallback, errorCallback);
        };

        /**
         * Fiat exchange rates used in the current indices calculations
         * @param market
         * @param handleResponseCallback
         * @param errorCallback
         
         */
        this.exchangeRates = function (market, handleResponseCallback, errorCallback) {
            var url = 'constants/exchangerates/' + market;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * local fiat exchange rates used in the current indices calculations
         * @param handleResponseCallback
         * @param errorCallback
         
         */
        this.exchangeRatesLocal = function (handleResponseCallback, errorCallback) {
            return this.exchangeRates('local', handleResponseCallback, errorCallback);
        };

        /**
         * global fiat exchange rates used in the current indices calculations
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.exchangeRatesGlobal = function (handleResponseCallback, errorCallback) {
            return this.exchangeRates('global', handleResponseCallback, errorCallback);
        };

        /**
         * our server time that can be used as a check when using API Key authentication
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.serverTime = function (handleResponseCallback, errorCallback) {
            return this.getResource('constants/time', handleResponseCallback, errorCallback);
        };

        /**
         * If no query parameters are sent, then returns ticker data for every supported symbol.
         * If crypto(s) and/or fiat(s) are sent as parameters, then only the ticker for those values is sent.
         * @param market - local or global
         * @param crypto - example: BTC
         * @param fiat - example: USD,EUR
         * @param handleResponseCallback
         * @param errorCallback
         
         */
        this.tickerAll = function (market, crypto, fiat, handleResponseCallback, errorCallback) {
            var url = 'indices/' + market + '/ticker/all?crypto=' + crypto + '&fiat=' + fiat;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * If no query parameters are sent, then returns ticker data for every supported symbol.
         * If crypto(s) and fiat(s) are sent as parameters, then only the local ticker for those values is sent.
         * @param crypto - example: BTC
         * @param fiat - example: USD,EUR
         * @param handleResponseCallback
         * @param errorCallback
         
         */
        this.tickerAllLocal = function (crypto, fiat, handleResponseCallback, errorCallback) {
            if(arguments.length >= 3){
                return this.tickerAll('local', crypto, fiat, handleResponseCallback, errorCallback);
            }
            if(arguments.length === 2){
                //We have only two callbacks as params
                handleResponseCallback = arguments[0];
                errorCallback = arguments[1];
                return this.tickerAll('local', '', '', handleResponseCallback, errorCallback);
            }
            if(arguments.length === 1){
                //We have only success callback
                handleResponseCallback = arguments[0];
                return this.tickerAll('local', '', '', handleResponseCallback, null);
            }
        };

        /**
         * If no query parameters are sent, then returns ticker data for every supported symbol.
         * If crypto(s) and/or fiat(s) are sent as parameters, then only the global ticker for those values is sent.
         * @param crypto - example: BTC
         * @param fiat - example: USD,EUR
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.tickerAllGlobal = function (crypto, fiat, handleResponseCallback, errorCallback) {
            if(arguments.length >= 3){
                return this.tickerAll('global', crypto, fiat, handleResponseCallback, errorCallback);
            }
            if(arguments.length === 2){
                //We have only two callbacks as params
                handleResponseCallback = arguments[0];
                errorCallback = arguments[1];
                return this.tickerAll('global', '', '', handleResponseCallback, errorCallback);
            }
            if(arguments.length === 1){
                //We have only success callback
                handleResponseCallback = arguments[0];
                return this.tickerAll('global', '', '', handleResponseCallback, null);
            }
        };

        /**
         * ticker data for specified symbol
         * @param market - local or global
         * @param symbol - example: BTCUSD
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.getTickerDataPerSymbol = function (market, symbol, handleResponseCallback, errorCallback) {
            var url = 'indices/' + market + '/ticker/' + symbol;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * local ticker data for specified symbol
         * @param symbol - example: BTCUSD
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.tickerLocalPerSymbol = function (symbol, handleResponseCallback, errorCallback) {
            return this.getTickerDataPerSymbol('local', symbol, handleResponseCallback, errorCallback);
        };

        /**
         * global ticker data for specified symbol
         * @param symbol - example: BTCUSD
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.tickerGlobalPerSymbol = function (symbol, handleResponseCallback, errorCallback) {
            return this.getTickerDataPerSymbol('global', symbol, handleResponseCallback, errorCallback);
        };

        /**
         * basic ticker denoting last and daily average price for the specified crypto/fiat values
         * @param market - local or global
         * @param crypto - comma separated list of crypto symbols (ex. 'BTC,ETH') or empty string '' if want to include all symbols
         * @param fiat - comma separated list of fiat symbols (ex. 'USD' (or empty string '' if want to include all symbols)
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.tickerShort = function (market, crypto, fiat, handleResponseCallback, errorCallback) {
            crypto = crypto || '';
            fiat = fiat || '';
            var url = 'indices/' + market + '/ticker/short?crypto=' + crypto + '&fiat=' + fiat;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * basic local ticker denoting last and daily average price for the specified crypto/fiat values
         * @param market - local or global
         * @param crypto - comma separated list of crypto symbols (ex. 'BTC,ETH') or empty string '' if want to include all symbols
         * @param fiat - comma separated list of fiat symbols (ex. 'USD' (or empty string '' if want to include all symbols)
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.tickerShortLocal = function (crypto, fiat, handleResponseCallback, errorCallback) {
            return this.tickerShort('local', crypto, fiat, handleResponseCallback, errorCallback);
        };

        /**
         * basic global ticker denoting last and daily average price for the specified crypto/fiat values
         * @param market - local or global
         * @param crypto - comma separated list of crypto symbols (ex. 'BTC,ETH') or empty string '' if want to include all symbols
         * @param fiat - comma separated list of fiat symbols (ex. 'USD' (or empty string '' if want to include all symbols)
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.tickerShortGlobal = function (crypto, fiat, handleResponseCallback, errorCallback) {
            return this.tickerShort('global', crypto, fiat, handleResponseCallback, errorCallback);
        };

        /**
         * This endpoint can be used to generate a custom index in a certain currency.
         * With the includeOrExclude parameter (“include” or “exclude”),
         * you can choose to generate an index removing the specified exchanges, or only including
         the few that you require.
         * @param symbol - ex. BTCUSD
         * @param exchanges - ex. bitstamp,bitfinex
         * @param includeOrExclude - include or exclude
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.tickerCustomGenericHandler = function (symbol, exchanges, includeOrExclude, handleResponseCallback, errorCallback) {
            var url = 'indices/ticker/custom/' + includeOrExclude + '/' + symbol + '?exchanges=' + exchanges;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * returns ticker values using only the exchanges added as argument in a comma separated format
         * @param symbol - ex. BTCUSD
         * @param exchanges - ex. bitstamp,bitfinex
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.tickerCustomInclude = function (symbol, exchanges, handleResponseCallback, errorCallback) {
            return this.tickerCustomGenericHandler(symbol, exchanges, 'include', handleResponseCallback, errorCallback);
        };

        /**
         * Returns ticker values using all exchanges except the ones added as argument in a comma separated format.
         * @param symbol - ex. BTCUSD
         * @param exchanges - ex. bitfinex,bitstamp
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.tickerCustomExclude = function (symbol, exchanges, handleResponseCallback, errorCallback) {
            return this.tickerCustomGenericHandler(symbol, exchanges, 'exclude', handleResponseCallback, errorCallback);
        };

        /**
         * ticker values and price changes
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.tickerChangesAllLocal = function (handleResponseCallback, errorCallback) {
            var url = 'indices/local/ticker/changes/all';
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * ticker values and price changes for given market and symbol
         * @param market - local or global
         * @param symbol
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.tickerChangesGeneric = function (market, symbol, handleResponseCallback, errorCallback) {
            var url = 'indices/' + market + '/ticker/' + symbol + '/changes';
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * local ticker values and price changes for given symbol
         * @param symbol - ex. BTCUSD
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.tickerChangesLocal = function (symbol, handleResponseCallback, errorCallback) {
            return this.tickerChangesGeneric('local', symbol, handleResponseCallback, errorCallback);
        };

        /**
         * global ticker values and price changes for given symbol
         * @param symbol - ex. BTCUSD
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.tickerChangesGlobal = function (symbol, handleResponseCallback, errorCallback) {
            return this.tickerChangesGeneric('global', symbol, handleResponseCallback, errorCallback);
        };


        /**
         * historical ticker data
         * @param market - local or global
         * @param symbol
         * @param period - alltime, monthly or daily
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.getHistory = function (market, symbol, period, handleResponseCallback, errorCallback) {
            period = period || '';
            var url = 'indices/' + market + '/history/' + symbol + '?period=' + period;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * historical data for local ticker
         * @param symbol
         * @param period
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.historyLocal = function (symbol, period, handleResponseCallback, errorCallback) {
            return this.getHistory('local', symbol, period, handleResponseCallback, errorCallback);
        };

        /**
         * historical data for global ticker
         * @param symbol
         * @param period
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.historyGlobal = function (symbol, period, handleResponseCallback, errorCallback) {
            return this.getHistory('global', symbol, period, handleResponseCallback, errorCallback);
        };

        /**
         * historical ticker data since timestamp
         * @param market - local or global
         * @param symbol - example: BTCUSD
         * @param since - Unix timestamp in seconds
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.dataSinceTimestamp = function (market, symbol, since, handleResponseCallback, errorCallback) {
            since = since || '';
            var url = 'indices/' + market + '/history/' + symbol + '?since=' + since;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * local historical ticker data since timestamp
         * @param symbol - example: BTCUSD
         * @param since - Unix timestamp in seconds
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.dataSinceTimestampLocal = function (symbol, since, handleResponseCallback, errorCallback) {
            return this.dataSinceTimestamp('local', symbol, since, handleResponseCallback, errorCallback);
        };

        /**
         * global historical ticker data since timestamp
         * @param symbol - example: BTCUSD
         * @param since - Unix timestamp in seconds
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.dataSinceTimestampGlobal = function (symbol, since, handleResponseCallback, errorCallback) {
            return this.dataSinceTimestamp('global', symbol, since, handleResponseCallback, errorCallback);
        };

        /**
         * price at specified timestamp (unix format)
         * @param market - local or global
         * @param symbol
         * @param timestamp - Unix timestamp (in seconds)
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.priceAtTimestamp = function (market, symbol, timestamp, handleResponseCallback, errorCallback) {
            var url = 'indices/' + market + '/history/' + symbol + '?at=' + timestamp;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * local price at the specified timestamp for local ticker
         * @param symbol
         * @param timestamp
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.priceAtTimestampLocal = function (symbol, timestamp, handleResponseCallback, errorCallback) {
            return this.priceAtTimestamp('local', symbol, timestamp, handleResponseCallback, errorCallback);
        };

        /**
         * local price at the specified timestamp for global ticker
         * @param symbol
         * @param timestamp
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.priceAtTimestampGlobal = function (symbol, timestamp, handleResponseCallback, errorCallback) {
            return this.priceAtTimestamp('global', symbol, timestamp, handleResponseCallback, errorCallback);
        };

        /**
         * a list of all exchanges with their integrated symbols and data.
         * Data can be filtered by crypto or fiat currency
         * @param crypto
         * @param fiat
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.allExchangesData = function (crypto, fiat, handleResponseCallback, errorCallback) {
            crypto = crypto || '';
            fiat = fiat || '';
            var url = 'exchanges/all?crypto=' + crypto + '&fiat=' + fiat;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * Returns a list of all exchanges with their integrated symbols and data.
         * By specifying symbol, data will be filtered and only shown for that symbol.
         * @param symbol
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.allExchangeDataForSymbol = function (symbol, handleResponseCallback, errorCallback) {
            var url = 'exchanges/all?symbol=' + symbol;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * Returns specified exchange’s symbols and data as parameter for the callback function.
         * @param exchangeName
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.perExchangeData = function (exchangeName, handleResponseCallback, errorCallback) {
            var url = 'exchanges/' + exchangeName;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * Return a total of integrated exchanges along with ignored, included and inactive status counts
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.exchangeCount = function (handleResponseCallback, errorCallback) {
            return this.getResource('exchanges/count', handleResponseCallback, errorCallback);
        };

        /**
         * Returns a list of exchanges that failed our sanity checks.
         * Provides what value failed and on what orderbook
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.outlierExchanges = function (handleResponseCallback, errorCallback) {
            return this.getResource('exchanges/outliers', handleResponseCallback, errorCallback);
        };

        /**
         * Returns exchanges that are either ignored or inactive according to specified state parameter.
         * With ignored exchanges a “ignore_reason” is provided
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.ignoredExchanges = function (handleResponseCallback, errorCallback) {
            return this.getResource('exchanges/ignored', handleResponseCallback, errorCallback);
        };

        /**
         * Returns list of inactive exchanges.
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.inactiveExchanges = function (handleResponseCallback, errorCallback) {
            return this.getResource('exchanges/incactive', handleResponseCallback, errorCallback);
        };

        /**
         * Returns a list of currencies and their weights that are used to produce our Global Bitcoin Price Index
         * @param handleResponseCallback
         * @param errorCallback
         * @returns {*}
         */
        this.currencyWeights = function (handleResponseCallback, errorCallback) {
            return this.getResource('weighting/currencies', handleResponseCallback, errorCallback);
        };

        /**
         * Returns a list of exchanges, their symbols, and their associated weights
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.exchangeWeights = function (handleResponseCallback, errorCallback) {
            return this.getResource('weighting/exchanges', handleResponseCallback, errorCallback);
        };

        /**
         * Return conversion from "from" currency to "to" currency,
         * where one of "from" and "to" is valid crypto and the other valid fiat.
         * @param market - global or local
         * @param from - fiat or crypto
         * @param to - fiat or crypto (different than from)
         * @param amount - amount of "from" currency you want to convert
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.performConversion = function (market, from, to, amount, handleResponseCallback, errorCallback) {
            var url = 'convert/' + market + '?from=' + from + '&to=' + to + '&amount=' + amount;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * Performing conversion using the local ticker values.
         * @param from - fiat or crypto
         * @param to - fiat or crypto (different than from)
         * @param amount - amount of "from" currency you want to convert
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.performConversionLocal = function (from, to, amount, handleResponseCallback, errorCallback) {
            return this.performConversion('local', from, to, amount, handleResponseCallback, errorCallback);
        };

        /**
         * Performing conversion using the global ticker values.
         * @param from - fiat or crypto
         * @param to - fiat or crypto (different than from)
         * @param amount - amount of "from" currency you want to convert
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.performConversionGlobal = function (from, to, amount, handleResponseCallback, errorCallback) {
            return this.performConversion('global', from, to, amount, handleResponseCallback, errorCallback);
        };

        /**
         * Returns the price for the specified symbol at the time the hash transaction was confirmed.
         * @param symbol - crypto-fiat pair (example BTCUSD)
         * @param hash - valid transaction hash
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.blockchainTxPrice = function (symbol, hash, handleResponseCallback, errorCallback) {
            var url = 'blockchain/tx_price/' + symbol + '/' + hash;
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        /**
         * Returns ticket used in the websocket authentication process.
         * @param handleResponseCallback
         * @param errorCallback
         */
        this.getTicket = function (handleResponseCallback, errorCallback) {
            var url = 'websocket/get_ticket';
            return this.getResource(url, handleResponseCallback, errorCallback);
        };

        return this;

    }
};
