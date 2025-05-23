import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import PokemonCard from "./PokemonCard";
import FadeInSection from "./FadeInSection";

function Body() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=15"
  );

  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(currentPage).then((res) => {
      setLoading(false);
      setNextPage(res.data.next);
      setPrevPage(res.data.previous);
      setPokemon(res.data.results);
    });
  }, [currentPage]);

  function goNextPage() {
    setCurrentPage(nextPage);
  }
  function goPrevPage() {
    setCurrentPage(prevPage);
  }

  if (loading) {
    return "Loading Pokemon...";
  }

  function getPages() {
    const pages = [];
    pages.push(
      <option disabled hidden>
        Choose here
      </option>
    );
    for (let i = 1; i <= 58; i++) {
      pages.push(<option value={i}>{i}</option>);
    }
    return pages;
  }

  return (
    <div className="App">
      <Nav />
      <div className="body pt-5">
        <div className="container-fluid p-5">
          <div className="row g-4">
            {pokemon.map((p) => (
              <div key={p.name} className="col-4">
                <FadeInSection>
                  <PokemonCard name={p.name} url={p.url} />
                </FadeInSection>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-5">
            <div className="btn-group col-3">
              {prevPage && (
                <button
                  className="btn btn-outline-light button"
                  onClick={goPrevPage}
                >
                  <h5>Previous</h5>
                </button>
              )}
              {nextPage && (
                <button
                  className="btn btn-outline-light button"
                  onClick={goNextPage}
                >
                  <h5>Next</h5>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end page-container">
          <label htmlFor="nav-list" className="text-white">
            <h3>Go to page:</h3>
          </label>
          <select
            name="nav-list"
            id="nav-list"
            className="text-box"
            defaultValue="Choose here"
            onChange={(e) =>
              setCurrentPage(
                `https://pokeapi.co/api/v2/pokemon?offset=${
                  (e.target.value - 1) * 15
                }&limit=15`
              )
            }
          >
            <optgroup>{getPages()}</optgroup>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Body;
