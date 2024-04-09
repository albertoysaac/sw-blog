import React from "react";
import { Link } from "react-router-dom";

export const Card = (props) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={`https://picsum.photos/200/20${props.id-1}`}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>
        <p className="card-text">Gender: {props.gender}</p>
        <p className="card-text">Hair Color: {props.hair_color}</p>
        <p className="card-text">Eye Color: {props.eye_color}</p>

        <Link className="btn btn-primary" to={"/single/" + props.id}>
          Learn more!
        </Link>
      </div>
    </div>
  );
};
