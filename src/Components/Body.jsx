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
          <div className="position-relative mt-5 px-4">
            {/* Centered button group */}
            <div
              className="position-absolute top-50 start-50 translate-middle"
              style={{ zIndex: 1 }}
            >
              <div className="btn-group">
                <button
                  className="btn btn-outline-light px-4 py-2 mx-2"
                  onClick={goPrevPage}
                  disabled={!prevPage}
                  style={{ fontSize: "1.25rem", minWidth: "120px" }}
                >
                  Previous
                </button>
                <button
                  className="btn btn-outline-light px-4 py-2 mx-2"
                  onClick={goNextPage}
                  disabled={!nextPage}
                  style={{ fontSize: "1.25rem", minWidth: "120px" }}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Right-side selector */}
            <div className="d-flex justify-content-end">
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="nav-list" className="text-white mb-0">
                  <strong>Go to page:</strong>
                </label>
                <select
                  name="nav-list"
                  id="nav-list"
                  className="form-select form-select-sm w-auto"
                  defaultValue=""
                  onChange={(e) =>
                    setCurrentPage(
                      `https://pokeapi.co/api/v2/pokemon?offset=${
                        (e.target.value - 1) * 15
                      }&limit=15`
                    )
                  }
                >
                  <option value="" disabled>
                    Choose a page
                  </option>
                  <optgroup label="Pages">{getPages()}</optgroup>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
