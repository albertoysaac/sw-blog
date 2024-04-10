const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: [],
      character: {},
      favorites: [],
    },
    actions: {
      setFavorites: (id) => {
        getStore().characters.filter((character) => {
          if (character.url === id) {
            let favorites = { id: character.url, name: character.name };
            if (
              getStore().favorites.filter((item) => item.id === id).length === 0
            ) {
              setStore({ favorites: [...getStore().favorites, favorites] });
              
            } else {
              getActions().removeFavorite(id);
              
            }
          }
        });
        
      },
      removeFavorite: (id) => {
        getStore().favorites.filter((favorite) => {
          if (favorite.id === id) {
            setStore({
              favorites: getStore().favorites.filter((item) => item.id !== id),
            });
          }
        });
      },
      loadCharacter: (id) => {
        const method = "GET";
        getActions()
          .queryhandler(method, "people", id)
          .then(({ status, data }) => {
            //console.log(status, data);
            if (status === 200) {
              //console.log(data);
              setStore({ character: data });
            }
          });
      },

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

        return fetch(url + mod, resquest).then((response) => {
          try {
            let requestStatus = response.status;
            //console.log(requestStatus);
            return response.json().then((data) => {
              //console.log(data);
              if (mod == "") {
                //console.log("mod: " + mod);
                return { status: requestStatus, data: data.results };
              }
              if (mod !== "") {
                return { status: requestStatus, data: data };
              }
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
