import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Card = (props) => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    like(props.data.type, props.data.id);
  }, [store.favorites]);

  const [favorite, setFavorite] = useState();

  function content() {
    if (props.data.type === "people") {
      return (
        <>
          <h4 className="card-title">{props.data.name}</h4>
          <p className="card-text"> Gender: {props.data.gender}</p>
          <p className="card-text"> Hair Color: {props.data.hair_color}</p>
          <p className="card-text">Eye Color: {props.data.eye_color}</p>
        </>
      );
    }
    if (props.data.type === "planets") {
      return (
        <>
          <h4 className="card-title">{props.data.name}</h4>
          <p className="card-text"> Population: {props.data.population}</p>
          <p className="card-text"> Terrain: {props.data.terrain}</p>
        </>
      );
    }
  }

  function like(type, id) {
    const isliked = store.favorites.find(
      (item) => item.type === type && item.id === id
    );
    if (isliked !== undefined) {
      setFavorite("-fill liked");
      console.log("liked");
    } else {
      setFavorite("");
    }
  }
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={`https://picsum.photos/200/100`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        {content()}

        <div className="d-flex justify-content-between">
          <Link
            className="btn btn-primary"
            to={"/" + props.data.type + "/" + props.data.type + props.data.id}
          >
            Learn more!
          </Link>
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={() => {
              actions.setFavorites(props.data.type + props.data.id)
              console.log("like button clicked");
            }}
          >
            <i
              className={
                favorite === undefined || favorite === ""
                  ? `bi bi-heart`
                  : `bi bi-heart` + favorite
              }
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};
