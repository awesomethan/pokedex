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
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [maleRatio, setMaleRatio] = useState();
  const [femaleRatio, setFemaleRatio] = useState();
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
        res.data.flavor_text_entries.some((desc) => {
          if (desc.language.name === "en") {
            setDescription(desc.flavor_text);
            return null;
          }
          return null;
        });
        setFemaleRatio(res.data.gender_rate * 12.5);
        setMaleRatio((8 - res.data.gender_rate) * 12.5);
      });
  }, [url, index]);

  function capitalize(str) {
    str = str
      .toLowerCase()
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    return str;
  }

  function getIndex(index) {
    if (index > 10000) index -= 8990;
    return index;
  }

  function getGenderRatio() {
    if (
      0 <= maleRatio &&
      maleRatio <= 100 &&
      0 <= femaleRatio &&
      femaleRatio <= 100
    ) {
      return (
        <div className="progress gender-bar">
          <div
            className="progress-bar male"
            role="progressbar"
            style={{ width: `${maleRatio}%` }}
          >
            {maleRatio}%
          </div>
          <div
            className="progress-bar female"
            role="progressbar"
            style={{ width: `${femaleRatio}%` }}
          >
            {femaleRatio}%
          </div>
        </div>
      );
    } else {
      return <p className="text-center">100% genderless</p>;
    }
  }

  function getDescription() {
    if (description === "" && getIndex(index) != 906) {
      return null;
    } else {
      return <div className="pt-2 description-container">{description}</div>;
    }
  }

  return (
    <div className="card text-bg-danger border border-2">
      <div className="card-header">
        {getIndex(index)}
        <div className="float-end">
          {types.map((t) => (
            <div
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
              alt="IMAGE CURRENTLY UNAVAILABLE"
            />
          </div>
          <div className="d-flex flex-column align-items-center">
            <p>
              <u>Abilities</u>
            </p>
            {abilities.map((ab) => (
              <div>{capitalize(ab.ability.name)}</div>
            ))}
          </div>
        </div>
        {stats.map((st) => (
          <div className="d-flex justify-content-between stat">
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
        ))}
        <div className="container">
          <div className="row mx-1">
            <div className="col-3 text-center">
              <p>
                <u>Height</u>
              </p>
              <p>{(height * 0.328084).toFixed(2)} ft.</p>
            </div>
            <div className="col-3 text-center">
              <p>
                <u>Weight</u>
              </p>
              {(weight * 0.220462).toFixed(2)} lbs.
            </div>
            <div className="col-6">
              <p className="text-center">
                <u>Gender Ratio (Male/Female)</u>
              </p>
              {getGenderRatio()}
            </div>
          </div>
        </div>
        <div className="px-3">{getDescription()}</div>
      </div>
    </div>
  );
}

export default PokemonCard;
