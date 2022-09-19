import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Pokedex, Pokemon } from '@modules/core/interfaces/pokemon.interface';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  
  constructor() {}

  get(
    name: string,
    page: number,
    limit: number = 10
  ): Promise<Pokedex>{
    const start=page*limit;
    const end=start + limit;
    return axios.get(`${environment.apiUri}?limit=${-1}`)
    .then(async(result)=>{
      let pokemons:Pokemon[]=result.data.results;
      if(name){
        pokemons=pokemons.filter((pokemon:Pokemon)=>pokemon.name.includes(name))
      }
      const total=pokemons.length;
      pokemons=await this.getInfo(pokemons.slice(start,end))
      return {count:total,pokemons:pokemons}
    });
  }

  getInfo(pokemons: any): Promise<Pokemon[]> {
    const promises: any[] = [];
    for (let index = 0; index < pokemons.length; index++) {
      promises.push(axios.get(pokemons[index].url));
    }
    return Promise.all(promises)
    .then(responses=>Promise.all(responses.map(response=>response.data)))
    .then(pokemons=>pokemons.map(pokemon=>({id:pokemon.id,name:pokemon.name,type:pokemon.types[0].type.name,image:pokemon.sprites.front_default})))
  }
}
