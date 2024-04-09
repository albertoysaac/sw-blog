import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Card = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={`https://picsum.photos/200/10${props.id - 1}`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>
        <p className="card-text">Gender: {props.gender}</p> 
        {console.log(props.hair_color)}
        <p className="card-text">Hair Color: {props.hair_color}</p>
        {console.log(props.eye_color)}
        <p className="card-text">Eye Color: {props.eye_color}</p>
        <div className="d-flex justify-content-between">
          <Link className="btn btn-primary" to={"/character/" + props.id}>
            Learn more!
          </Link>
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={() => {
              actions.setFavorites(props.id);
            }}
          >
            <i className="bi bi-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
