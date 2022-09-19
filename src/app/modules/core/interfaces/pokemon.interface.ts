export interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

export interface Pokedex{
  count:number,
  pokemons:Pokemon[]
}