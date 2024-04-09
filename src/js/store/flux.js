const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: [],
    },
    actions: {
      loadCharacters: () => {
        const method = "GET";
        getActions()
          .queryhandler(method, "people", "")
          .then(({ status, data }) => {
            if (status === 200) {
              // Modificar la url de cada objeto en el array
              const modifiedData = data.map((item) => {
                // Extraer el número de la url
                const number = item.url.match(/\d+/)[0];
                // Reemplazar la url con el número
                item.url = number;
                //console.log(item);
                return item;
              });
              setStore({ characters: modifiedData });
            }
          });
      },

      queryhandler: (method, type, mod) => {
        const url = "https://swapi.dev/api/" + type + "/";
        const resquest = {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        };

        console.log(url + mod);

        return fetch(url + mod, resquest).then((response) => {
          try {
            let requestStatus = response.status;
            console.log(requestStatus);
            return response.json().then((data) => {
              return { status: requestStatus, data: data.results };
            });
          } catch (error) {
            console.log(error.message);
          }
        });
      },
    },
  };
};
export default getState;
