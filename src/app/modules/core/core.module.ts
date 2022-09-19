import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { GetPokemonsPipe} from '@modules/core/pipes/get-pokemons/get-pokemons.pipe';

@NgModule({
  declarations: [
    GetPokemonsPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    GetPokemonsPipe
  ]
})
export class CoreModule { }
