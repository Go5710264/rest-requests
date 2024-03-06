import { FetchApi } from "./FetchApi";

document.addEventListener("DOMContentLoaded", () => {
  let today = new Date();
  let timestamp = Intl.DateTimeFormat("ru-Ru").format(today);
  timestamp = timestamp
    .split(".")
    .reverse()
    .join("");

  const FETCH_API = new FetchApi(
    'http://api.valantis.store:40000/',
    timestamp,
    {
      endpoints: {
        getFields: { point: "get_fields" },
        getListItem: { point: "get_ids" },
      },
    },
  );

  FETCH_API.request("getFields").then((response) => console.log(response));
  // FETCH_API.request("getListItem",
  //     {
  //         "action": "get_ids",
  //         "params": {"offset": 10, "limit": 3}
  //     }
  // ).then(response => console.log(response))
});
