  export default class Constants {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
    this.webSocketUrl = process.env.REACT_APP_WEBSOCKET_URL;
  }
}
