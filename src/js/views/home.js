import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.loadCharacters("people");
    actions.loadCharacters("planets");
  }, []);

  return (
    <>
      <div className="container-fluid">
        <h1 className="characters-title">Characters</h1>
        <div className="row">
          {store.characters.map((character) => {
            return (
              <Card
                key={character.type.toString() + character.id.toString()}
                data={character}
                type="people"
              />
            );
          })}
        </div>
        <h1 className="characters-title">Planets</h1>
        <div className="row">
          {store.planets.map((planets) => {
            return (
              <Card
                key={planets.type.toString() + planets.id.toString()}
                data={planets}
                type="people"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
