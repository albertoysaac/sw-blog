import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Card } from "../component/card";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {store.characters.map((character) => {
            console.log(character);
            return (
              <Card
                key={character.url}
                id={character.url}
                name={character.name}
                gender={character.gender}
                hair-color={character.hair_color}
                eye_color={character.eye_color}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
