'use strict';

const restfulClient = require('./bitcoinaverage/clients/restful-client');
const websocketClient = require('./bitcoinaverage/clients/websocket-client');

module.exports = {
  restfulClient: restfulClient.RestfulClient,
  websocketClient: websocketClient.WebsocketClient
};
