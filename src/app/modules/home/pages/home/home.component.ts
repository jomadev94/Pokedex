import { Component, OnInit } from '@angular/core';
import { Pokedex } from '@modules/core/interfaces/pokemon.interface';
import { DataService } from '@core/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  name:string="";
  currentPage:number=0;
  hasNext:boolean=true;
  pokedex!:Promise<Pokedex>;
  load:boolean=false;

  constructor(private dataService:DataService) {
    this.search();
  }

  ngOnInit(): void {
  }

  onChange(){
    this.currentPage=0;
    this.search();
  }

  search(){
    this.load=true;
    this.pokedex=this.dataService.get(this.name,this.currentPage);
    this.pokedex.then(poke=>{
      this.load=false;
      this.hasNext=poke.count > 10 && Math.floor(poke.count/10) > this.currentPage;
    })
  }

  prev(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.search();
    }
  }

  next(){
    if(this.hasNext){
      this.currentPage++;
      this.search();
    }
  }

}
