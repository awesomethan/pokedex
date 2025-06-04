import React, { useEffect, useState } from "react";
import axios from "axios";

function PokemonCard({ name, url }) {
  const typeColours = {
    bug: "B1C12E",
    dark: "4F3A2D",
    dragon: "755EDF",
    electric: "FCBC17",
    fairy: "F4B1F4",
    fighting: "822F1F",
    fire: "E73B0C",
    flying: "A3B3F7",
    ghost: "6060B2",
    grass: "74C236",
    ground: "D3B357",
    ice: "A3E7FD",
    normal: "C8C4BC",
    poison: "934594",
    psychic: "ED4882",
    rock: "B9A156",
    steel: "B5B5C3",
    water: "3295F6",
  };

  const index = url.split("/")[url.split("/").length - 2];
  const image = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${index}.png?raw=true`;

  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [maleRatio, setMaleRatio] = useState(null);
  const [femaleRatio, setFemaleRatio] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get(url).then((res) => {
      setTypes(res.data.types);
      setStats(res.data.stats);
      setAbilities(res.data.abilities);
      setHeight(res.data.height);
      setWeight(res.data.weight);
    });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${index}`)
      .then((res) => {
        const latestEntry = [...res.data.flavor_text_entries]
          .reverse()
          .find((e) => e.language.name === "en");
        setDescription(latestEntry?.flavor_text ?? "");
        setFemaleRatio(res.data.gender_rate * 12.5);
        setMaleRatio((8 - res.data.gender_rate) * 12.5);
      });
  }, [url, index]);

  function capitalize(str) {
    return str
      .toLowerCase()
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  }

  function getIndex(index) {
    return index > 10000 ? index - 8990 : index;
  }

  return (
    <div
      className="card text-bg-danger border border-2"
      style={{ minHeight: "500px" }}
    >
      <div className="card-header">
        {getIndex(index)}
        <div className="float-end">
          {types.map((t) => (
            <div
              key={t.type.name}
              className="badge rounded-pill"
              style={{
                backgroundColor: `#${typeColours[t.type.name]}`,
                color: "white",
              }}
            >
              {capitalize(t.type.name)}
            </div>
          ))}
        </div>
      </div>

      <div className="card-body d-flex flex-column align-items-center">
        <div className="container d-flex justify-content-around">
          <div className="d-flex flex-column align-items-center">
            <h4 className="card-title text-center">{capitalize(name)}</h4>
            <img
              className="image"
              src={image}
              alt={`${capitalize(name)} sprite`}
              style={{ maxHeight: "120px" }}
            />
          </div>

          <div className="d-flex flex-column align-items-center">
            <p>
              <u>Abilities</u>
            </p>
            {abilities.length > 0 ? (
              abilities.map((ab) => (
                <div key={ab.ability.name}>{capitalize(ab.ability.name)}</div>
              ))
            ) : (
              <div style={{ visibility: "hidden" }}>Placeholder</div>
            )}
          </div>
        </div>

        {stats.length > 0
          ? stats.map((st) => (
              <div
                key={st.stat.name}
                className="d-flex justify-content-between stat"
              >
                <p>{capitalize(st.stat.name)}</p>
                <div className="progress col-9 m-1">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{ width: `${st.base_stat / 2}%` }}
                  >
                    {st.base_stat}
                  </div>
                </div>
              </div>
            ))
          : Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="d-flex justify-content-between stat"
                  style={{ visibility: "hidden" }}
                >
                  <p>Stat</p>
                  <div className="progress col-9 m-1">
                    <div className="progress-bar" style={{ width: "50%" }}>
                      50
                    </div>
                  </div>
                </div>
              ))}

        <div className="container">
          <div className="row mx-1">
            <div className="col-3 text-center">
              <p>
                <u>Height</u>
              </p>
              <p style={{ visibility: height ? "visible" : "hidden" }}>
                {height
                  ? `${(height * 0.328084).toFixed(2)} ft.`
                  : "Placeholder"}
              </p>
            </div>
            <div className="col-3 text-center">
              <p>
                <u>Weight</u>
              </p>
              <p style={{ visibility: weight ? "visible" : "hidden" }}>
                {weight
                  ? `${(weight * 0.220462).toFixed(2)} lbs.`
                  : "Placeholder"}
              </p>
            </div>
            <div className="col-6 text-center">
              <p>
                <u>Gender Ratio (M/F)</u>
              </p>
              {maleRatio != null && femaleRatio != null ? (
                <div className="progress gender-bar">
                  <div
                    className="progress-bar male"
                    role="progressbar"
                    style={{ width: `${maleRatio}%`, fontSize: "0.7rem" }}
                  >
                    {maleRatio}%
                  </div>
                  <div
                    className="progress-bar female"
                    role="progressbar"
                    style={{ width: `${femaleRatio}%`, fontSize: "0.7rem" }}
                  >
                    {femaleRatio}%
                  </div>
                </div>
              ) : (
                <div style={{ visibility: "hidden" }}>
                  <div className="progress gender-bar">
                    <div className="progress-bar" style={{ width: "50%" }}>
                      50%
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-3 pt-2 description-container">
          <p style={{ visibility: description ? "visible" : "hidden" }}>
            {description || "Placeholder"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
