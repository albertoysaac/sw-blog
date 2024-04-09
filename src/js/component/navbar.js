import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
              >
                Favorites {store.favorites.length}
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {store.favorites.map((item) => {
                  return (
                    <li key={item.id}>
                      <div className="d-flex justify-content-between p-1">
                        {item.name}
                        <button
                          onClick={() => {
                            actions.removeFavorite(item.id);
                          }}
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
