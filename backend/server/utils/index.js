const axios = require("axios");

module.exports = {
    emptyCheck: data => {
        return (
            data !== undefined &&
            data !== "undefined" &&
            data !== "" &&
            data !== "null" &&
            data !== null
        )
    },
    callAPI: (method, url, params) => {
        return new Promise((resolve, reject) => {
            if(method === "get") {
              axios.get(url)
                .then(res => resolve(res))
                .catch(err => reject(err));
            } else if(method === "post") {
              axios.post(url, params)
                .then(res => resolve(res))
                .catch(err => reject(err));
          }
        });
    }
}