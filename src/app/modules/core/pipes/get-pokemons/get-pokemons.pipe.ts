import { Pipe, PipeTransform } from '@angular/core';
import { Pokedex } from '@modules/core/interfaces/pokemon.interface';

@Pipe({
  name: 'getPokemons'
})
export class GetPokemonsPipe implements PipeTransform {

  transform(value: any | null, ...args: any[]): any[] {
    return value?.pokemons? value.pokemons:[];
  }

}
