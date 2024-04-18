const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: [],
      character: {},
      planets: [],
      planet: {},
      favorites: [],
    },
    actions: {
      urlToID: (data) => {
        if (data.url && data.url.length > 0) {
          let id = data.url.match(/(people|planets)\/(\d+)/);
          if (id) {
            data.type = id[1];
            data.id = id[2];
          }
          console.log("Dato unitario formateado");
          return data;
        } else {
          let modifiedData = data.map((item) => {
            const id = item.url.match(/(people|planets)\/(\d+)/);
            if (id) {
              item.type = id[1];
              item.id = id[2];
            }
            return item;
          });
          console.log("Data muktiple formateada");
          return modifiedData;
        }
      },
      itsfavorite: (type, id, name) => {
        if (getStore().favorites.find((item) => item.type === type && item.id === id) === undefined) {
          const newFavorite = { type: type, id: id, name: name };
          console.log("Nuevo favorito");
          return newFavorite
        } else if (getStore().favorites.find((item) => item.type === type && item.id === id).name.length > 0) {
          console.log("Ya existe el favorito");
          getActions().removeFavorite(type + id);
        }
      },
      itsExist: (type, id) => {
        if (type === "people") {
          let character = getStore().characters.find((character) => character.id === id);
          if (character !== undefined) {
            console.log("Personaje encontrado");
            return getActions().itsfavorite(character.type, character.id, character.name);
          }
          else {
            console.log("No se encontro el personaje");
          }
        }
        if (type === "planets") {
          let planet = getStore().planets.find((planet) => planet.id === id);
          if (planet !== undefined) {
            return getActions().itsfavorite(planet.type, planet.id, planet.name);
          }
          else {
            console.log("No se encontro el planeta");
          }
        }
      },

      setFavorites: (id) => {
        const iD = id.match(/(\d+)/)[0];
        const type = id.match(/people|planets/)[0];
        let selected = getActions().itsExist(type, iD);
        if (selected !== undefined) {
          setStore({ favorites: [...getStore().favorites, selected] });
        }

      },

      removeFavorite: (id) => {
        console.log("id a eliminar: " + id);
        
        const iD = id.match(/(\d+)/)[0];
        const type = id.match(/people|planets/)[0];
        getStore().favorites.filter((favorite) => {
          if (favorite.id === iD && favorite.type === type) {
            setStore({
              favorites: getStore().favorites.filter(
                (item) => item.id !== iD && item.type !== type
              ),
            });
          }
        });
      },

      loadCharacters: (url) => {
        let type = "";
        let id = "";
        if (url.match(/\d+/)) {
          type = url.match(/people|planets/)[0];
          id = url.match(/\d+/)[0];
        } else {
          type = url;
        }
        const method = "GET";

        getActions()
          .queryManager(method, type, id)
          .then(({ status, data }) => {
            if (status === 200) {
              let modifiedData = getActions().urlToID(data);
              if (type === "people" && id === "") {
                setStore({ characters: modifiedData });
              } else if (type === "people" && id !== "") {
                setStore({ character: modifiedData });
              } else if (type === "planets" && id === "") {
                setStore({ planets: modifiedData });
              } else if (type === "planets" && id !== "") {
                setStore({ planet: modifiedData });
              }
            }
          });
      },

      queryManager: (method, type, urljson) => {
        let url = "";
        let singleObject = false;
        if (urljson === "" || urljson === null || urljson === undefined) {
          url = "https://swapi.dev/api/" + type + "/";
          singleObject = false;
        } else {
          url = "https://swapi.dev/api/" + type + "/" + urljson;
          singleObject = true;
        }

        const resquest = {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        };
        console.log("url de la query: ");
        console.log(url);

        return fetch(url, resquest).then((response) => {
          try {
            let requestStatus = response.status;

            return response.json().then((data) => {
              if (singleObject === false) {
                return { status: requestStatus, data: data.results };
              }
              if (singleObject === true) {
                console.log(data);
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
