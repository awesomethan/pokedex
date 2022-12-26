import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonList({pokemon}) {
    return (
      <div className="row">
        {pokemon.map(p => (
            <div key={p}><PokemonCard name={p}/></div>
        ))}
      </div>
    );
}

export default PokemonList;
