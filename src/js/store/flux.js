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
        if(data.url && data.url.length > 0){
          let id = data.url.match(/(people|planets)\/(\d+)/);
          if (id) {
            data.type = id[1];
            data.id = id[2];
          }
          return data;
        }else{
          let modifiedData = data.map((item) => {
            const id = item.url.match(/(people|planets)\/(\d+)/);
            if (id) {
              item.type = id[1];
              item.id = id[2];
            }

            return item;
          });
          return modifiedData;
        }
        
      },

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
              if (type === "people"&& id === "") {
                setStore({ characters: modifiedData });
              }
              else if (type === "people" && id !== "") {
                setStore({ character: modifiedData });
              }
              else if (type === "planets" && id === "") {
                setStore({ planets: modifiedData });
              }
              else if (type === "planets" && id !== "") {
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

        // const flag =
        //   urljson !== "" || urljson !== null || urljson !== undefined
        //     ? true
        //     : false;
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
