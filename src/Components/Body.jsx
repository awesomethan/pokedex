import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import PokemonCard from "./PokemonCard";
import FadeInSection from "./FadeInSection";

function Body() {
  const [pokemon, setPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=15"
  );
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Load paginated Pokémon
  useEffect(() => {
    setLoading(true);
    axios.get(currentPage).then((res) => {
      setLoading(false);
      setNextPage(res.data.next);
      setPrevPage(res.data.previous);
      setPokemon(res.data.results);
    });
  }, [currentPage]);

  // Load all Pokémon for search filtering
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1300")
      .then((res) => {
        setAllPokemon(res.data.results);
      });
  }, []);

  function goNextPage() {
    setCurrentPage(nextPage);
  }

  function goPrevPage() {
    setCurrentPage(prevPage);
  }

  function getPages() {
    const pages = [];
    pages.push(
      <option disabled hidden>
        Choose here
      </option>
    );
    for (let i = 1; i <= 58; i++) {
      pages.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return pages;
  }

  const filteredPokemon =
    searchTerm.trim() === ""
      ? pokemon
      : allPokemon
          .filter((p) => p.name.includes(searchTerm.toLowerCase()))
          .slice(0, 15);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <span className="fs-3 text-white">Loading&nbsp;Pokémon…</span>
      </div>
    );
  }

  return (
    <div className="App">
      <Nav />
      <div className="body pt-5">
        <div className="container-fluid p-5">
          {/* Search Bar */}
          <FadeInSection>
            <div className="mb-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search Pokémon by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </FadeInSection>

          {/* Cards Grid */}
          <div className="row g-4">
            {filteredPokemon.map((p) => (
              <div key={p.name} className="col-4">
                <FadeInSection key={`${searchTerm}-${p.name}`}>
                  <PokemonCard name={p.name} url={p.url} />
                </FadeInSection>
              </div>
            ))}
          </div>

          {/* Pagination + Page Selector (hidden during search) */}
          {searchTerm.trim() === "" && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Body;
