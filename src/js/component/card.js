import React from "react";
import { Link } from "react-router-dom";

export const Card = (props) => {
  return (
    <div className="card" key={props.url}>
      <img
        src="https://picsum.photos/200/300"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>
        <h4 className="card-title">{props.name}</h4>
        <Link className="btn btn-primary" to={"/single/" + props.id}>
          Learn more!
        </Link>
      </div>
    </div>
  );
};
