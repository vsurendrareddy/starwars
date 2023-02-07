import axios from "axios";

export default class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }

  init = () => {

    let headers = {
      Accept: "application/json",
    };

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  get = (endPoint,params) => {
    return this.init().get(endPoint, { params: params });
  };

  post = (endPoint, data) => {
    return this.init().post(endPoint, data);
  };

};
