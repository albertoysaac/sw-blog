import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Character = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [contentType, setContentType] = useState("");
  useEffect(() => {
    let peopleName = store.character.name;
    if (store.character.name && store.character.name.length > 0) {
      setContentType("people");
    } else if (store.planet.name && store.planet.name.length > 0) {
      setContentType("planets");
    }
  }, [store.character, store.planets]);
  useEffect(() => {
    actions.loadCharacters(params.theid);
  }, []);
  return (
    <div className="character-info container-fluid">
      <div className="container">
        <div className="row">
          <div className="col">
            <img
              src={`https://picsum.photos/500/400`}
              className="card-img-top"
              alt="imagen del personaje"
            />
          </div>
          <div className="col">
            <h1 className="Title">
              {contentType === "people"
                ? store.character.name
                : store.planet.name}
            </h1>
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
            <p className="character-data">
              {contentType === "people"
                ? store.character.name
                : store.planet.name}
            </p>
          </div>
          <div className="col">
            <h3 className="character-data">
              {contentType === "people" ? "Birth Year" : "Climate"}
            </h3>
            <p className="character-data">
              {contentType === "people"
                ? store.character.birth_year
                : store.planet.climate}
            </p>
          </div>
          <div className="col">
            <h3 className="character-data">
              {contentType === "people" ? "Gender" : "Population"}
            </h3>
            <p className="character-data">
              {contentType === "people"
                ? store.character.gender
                : store.planet.population}
            </p>
          </div>
          <div className="col">
            <h3 className="character-data">
              {contentType === "people" ? "Height" : "Orbital Period"}
            </h3>
            <p className="character-data">
              {contentType === "people"
                ? store.character.height
                : store.planet.orbital_period}
            </p>
          </div>
          <div className="col">
            <h3 className="character-data">
              {contentType === "people" ? "Skin Color" : "Rotation Period"}
            </h3>
            <p className="character-data">
              {contentType === "people"
                ? store.character.skin_color
                : store.planet.rotation_period}
            </p>
          </div>
          <div className="col">
            <h3 className="character-data">
              {contentType === "people" ? "Eye color" : "Diameter"}
            </h3>
            <p className="character-data">
              {contentType === "people"
                ? store.character.eye_color
                : store.planet.diameter}
            </p>
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
