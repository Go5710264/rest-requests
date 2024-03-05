/**
 * Обработка обращений к серверу по REST
 */
export class FetchApi {
  set;
  endpoints = {};
  requestData;
  method;
  currentEndpoint;

  constructor(date, object) {
    this.xauth = `md5(valantis_20240305)`;
    this.endpoints = object.endpoints;
  }

  request(type, data) {
    console.log(data)

    this.currentEndpoint = this.endpoints[type].point; // тип запроса к API
    console.log(this.currentEndpoint)

    if (data) {
        // const requestData = 
    } else {
   
    }

    return this._fetch(
        this.currentEndpoint,
        this._setOptions()
    );
  }

  async _fetch(endpoint, requestData, responseType = "JSON") {
    return await fetch(`http://api.valantis.store:40000/`, requestData)
      .then((data) => {
        if (data.ok) {
          switch (responseType) {
            case "TEXT":
              return data.text();
            default:
              return data.json();
          }
        } else {
          throw data;
        }
      })
      .catch((e) => {
        if (e.status >= 400 && e.status < 500) {
          return {
            error: e.status,
            message: `Ошибка доступа по адресу ${e.url}, неправильный адрес запроса или иная ошибка на стороне клиента(браузера)`,
          };
        } else if (e.status >= 500) {
          return {
            error: e.status,
            message: `Ошибка на стороне сервера по адресу ${e.url}, обратитесь в поддержку, либо попробуйте снова.`,
          };
        } else {
          return {
            error: e.status,
            message: ` ${e.url} - Tакого эндпоинта не существует или отказано в доступе`,
          };
        }
      });
  }

  _getFormData() {
    const formData = new FormData();
    Object.keys(this.requestData.params).forEach((key) =>
      formData.append(key, this.requestData.params[key])
    );
    this.options = formData;
  }

  _setOptions() {
    return {
      method: 'POST',
      // referrerPolicy: "origin-when-cross-origin",
      // credentials: 'include',
      headers: {
        // mode: "no-cors",
        //   cache: 'no-cache',
        //   credentials: 'same-origin',
        'Content-Type': 'application/json',
        'X-Auth': 'a45cbdfd64776f5e4838b61122540faf',
      },
      body: JSON.stringify({
        'action': this.currentEndpoint,
      }),
    };
  }
}
