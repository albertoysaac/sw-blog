import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container-fluid">
        <h1 className="characters-title">Characters</h1>
        <div className="row">
          {store.characters.map((character) => {
            console.log(character);
            return (
              <Card
                key={character.url}
                id={character.url}
                name={character.name}
                gender={character.gender}
                hair_color={character.hair_color}
                eye_color={character.eye_color}
                birth_year={character.birth_year}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
