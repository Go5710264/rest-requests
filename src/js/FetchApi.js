import { md5 } from "js-md5";

/**
 * Обработка обращений к серверу по REST
 */
export class FetchApi {
  set;
  endpoints = {};
  requestData;
  options={};
  method;
  currentEndpoint;
  currentParams;

  constructor(url, timestamp, object) {
    this.url = url;
    this.xauth = md5(`Valantis_${timestamp}`);
    this.endpoints = object.endpoints;
  }

  request(type, data = undefined) {
    this.currentEndpoint = this.endpoints[type].point; // тип запроса 
    if (data) this._getFormData(data);   
    this._setOptions(this.options)
    console.log(this.currentParams, data)
    return this._fetch(
        this.currentEndpoint,
      );
  }

  async _fetch(endpoint, requestData, responseType = "JSON") {
    return await fetch(this.url, requestData)
      .then(
        response => {
          switch (responseType) {
            case "TEXT":
              return response.text();
            default:
              return response.json();
          }
        },
        reject => new Error(reject)
      )
      .catch(error => {
        throw new Error(error)
        // if (e.status >= 400 && e.status < 500) {
        //   return {
        //     error: e.status,
        //     message: `Ошибка доступа по адресу ${e.url}, неправильный адрес запроса или иная ошибка на стороне клиента(браузера)`,
        //   };
        // } else if (e.status >= 500) {
        //   return {
        //     error: e.status,
        //     message: `Ошибка на стороне сервера по адресу ${e.url}, обратитесь в поддержку, либо попробуйте снова.`,
        //   };
        // } else {
        //   return {
        //     error: e.status,
        //     message: ` ${e.url} - Tакого эндпоинта не существует или отказано в доступе`,
        //   };
        // }
      });
  }

  _getFormData(params) {
    /* --- */
    let formDataParams = new FormData();
    Object.keys(params).forEach((key) =>
      formDataParams.append(key, params[key])
    );
    
    
    this.options = formDataParams;
  }

  _setOptions(params) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': this.xauth,
      },
      body: JSON.stringify({
        'action': this.currentEndpoint,
        'params': params,
      }),
    };
  }
}
