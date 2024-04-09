import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Character = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  useEffect(() => {
    actions.loadCharacter(params.theid);
  }, []);
  return (
    <div className="character-info container-fluid">
      <div className="container">
        <div className="row">
          <div className="col">
            <img
              src={`https://picsum.photos/500/40${params.theid}`}
              className="card-img-top"
              alt="imagen del personaje"
            />
          </div>
          <div className="col">
            <h1 className="Title">{store.character.name}</h1>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              nihil molestias quaerat quidem aut commodi temporibus tempore
              voluptatum numquam laboriosam voluptates soluta quos sit ipsam
              nobis id, minus reiciendis incidunt ducimus neque odio laudantium
              dolorum qui. Animi labore sint beatae, numquam aliquam dignissimos
              laboriosam amet earum tenetur minima nostrum. Sit perspiciatis,
              facere deleniti ducimus asperiores nam excepturi praesentium natus
              molestiae voluptate. Nulla temporibus sint pariatur alias qui
              tempore recusandae non quos inventore incidunt numquam, ab
              reiciendis veniam ut deserunt enim tenetur quidem voluptates,
              nesciunt unde eaque magni adipisci nisi? Quidem nisi explicabo
              recusandae ipsam incidunt eligendi ex. Nemo, molestiae vel?
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3 className="character-data">Name</h3>
            <p className="character-data">{store.character.name}</p>
          </div>
          <div className="col">
            <h3 className="character-data">birth Year</h3>
            <p className="character-data">{store.character.birth_year}</p>
          </div>
          <div className="col">
            <h3 className="character-data">Gender</h3>
            <p className="character-data">{store.character.gender}</p>
          </div>
          <div className="col">
            <h3 className="character-data">Height</h3>
            <p className="character-data">{store.character.height}</p>
          </div>
          <div className="col">
            <h3 className="character-data">Skin Color</h3>
            <p className="character-data">{store.character.skin_color}</p>
          </div>
          <div className="col">
            <h3 className="character-data">Eye color</h3>
            <p className="character-data">{store.character.eye_color}</p>
          </div>
        </div>

        <Link to="/">
          <span className="btn btn-primary btn-lg" href="#" role="button">
            Back home
          </span>
        </Link>
      </div>
    </div>
  );
};

Character.propTypes = {
  match: PropTypes.object,
};
