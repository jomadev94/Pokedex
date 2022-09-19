import { GetPokemonsPipe } from '@core/pipes/get-pokemons/get-pokemons.pipe';
import { Pokedex } from '@modules/core/interfaces/pokemon.interface';

describe('GetPokemonsPipe', () => {
  const pokedexMock: Pokedex = {
    count: 1223,
    pokemons: [
      { id: 345, image: 'pikachu.png', name: 'pikachu', type: 'electrico' },
      { id: 346, image: 'chicorita.png', name: 'chicorita', type: 'planta' },
    ],
  };
  const pipe = new GetPokemonsPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return pokemons list', () => {
    const result=pipe.transform(pokedexMock);
    expect(result).toHaveSize(2);
    expect(result).toBeTruthy();
    expect(result[0].name).toEqual("pikachu");
    expect(result[1].name).toEqual("chicorita");
  });

  it('should return empty array',()=>{
    const result=pipe.transform("algo");
    expect(result).toHaveSize(0)
  })
});
