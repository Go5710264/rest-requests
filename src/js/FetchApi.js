import { md5 } from 'js-md5';

export class FetchApi {
  constructor(url, timestamp, object, handlerError) {
    this.curEndpoint = undefined;
    this.curParams = undefined;
    this.requestBody = {};
    this.url = url;
    this.xauth = md5(`Valantis_${timestamp}`);
    this.endpoints = object.endpoints;
    this.options = {};
    this.cache = {};
    this.handlerError;
  }

  request(type, data = undefined) {
    this.curEndpoint = this.endpoints[type].point;
    this.curParams = this.endpoints[type].params;
    data ? this._setRequestBody(data) : this._setRequestBody();
    this._setOptions();

    return this._fetch();
  }

  async _fetch(responseType = 'JSON') {
    this.resultRequest = await fetch(this.url, this.options)
      .then(
        (response) => {
          switch (responseType) {
            case 'TEXT':
              return response.text();
            default:
              return response.json();
          }
        },
      )
      .catch((err) => {
        console.error(err.message);
        console.error(err.status);
        this.cachingDecorator();
        return
      });

    return this.resultRequest;
  }

  cachingDecorator(){
    debugger
    this._fetch().then(response => this.handlerError(response))
    // this.handlerError(this._fetch());
  }

  _setRequestBody(paramsData) {
    if (paramsData && this.curEndpoint !== 'filter') this._correctRequestParams(paramsData);
    this.requestBody = JSON.stringify({
      action: this.curEndpoint,
      params: paramsData,
    });
  }

  _setOptions() {
    this.options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': this.xauth,
      },
      body: this.requestBody,
    };
  }

  _correctRequestParams(parameters) {
    try {
      const paramKeys = Object.keys(parameters);
      const isCorParams = this.curParams.every((param) => paramKeys.some((item) => item === param));
      if (!isCorParams) { throw new Error('Не верно указаны параметры запроса'); }
    } catch (error) {
      console.error(error);
    }
  }
}
