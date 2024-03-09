import { md5 } from 'js-md5';

export class FetchApi {
  constructor(url, timestamp, object) {
    this.curEndpoint = undefined;
    this.curParams = undefined;
    this.requestBody = {};
    this.url = url;
    this.xauth = md5(`Valantis_${timestamp}`);
    this.endpoints = object.endpoints;
    this.options = {};
  }

  request(type, data = undefined) {
    this.curEndpoint = this.endpoints[type].point;
    this.curParams = this.endpoints[type].params;
    data ? this._setRequestBody(data) : this._setRequestBody();
    this._setOptions();

    return this._fetch();
  }

  async _fetch(responseType = 'JSON') {
    return await fetch(this.url, this.options)
      .then(
        (response) => {
          switch (responseType) {
            case 'TEXT':
              return response.text();
            default:
              return response.json();
          }
        },
        (reject) => {
          new Error(reject)
          console.log('ошибка')
        },
      )
      .catch((e) => {
        debugger
        console.log(e)
        console.log(e.message)
        console.log(e.response)
        // throw new Error(error);
        if (e.status >= 400 && e.status < 500) {
          return {
            error: e.status,
            message:
        `Ошибка доступа по адресу ${e.url},
        неправильный адрес запроса или иная ошибка на стороне клиента(браузера)`,
          };
        } 
        if (e.status >= 500) {
          return {
            error: e.status,
            message: `Ошибка на стороне сервера по адресу ${e.url},
         обратитесь в поддержку, либо попробуйте снова.`,
          };
        }
        return {
          error: e.status,
          message: ` ${e.url} - Tакого эндпоинта не существует или отказано в доступе`,
        };
      });
    // return this.response;
  }

  _setRequestBody(paramsData) {
    if (paramsData) this._correctRequestParams(paramsData);
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

  /* Попытка реализовать проверку параметров запроса */
  _correctRequestParams(parameters) {
    try {
      const paramKeys = Object.keys(parameters);
      const isCorrectParams = this.getJson(paramKeys) === this.getJson(this.curParams);
      if (!isCorrectParams) throw new Error('Не верно указаны параметры запроса, обратитесь к FETCH_API');
    } catch (error) {
      console.error(error);
    }
  }

  getJson(value) {
    return JSON.stringify(value);
  }
}
