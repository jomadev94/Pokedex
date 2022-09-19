import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@modules/core/core.module';
import { Pokedex } from '@modules/core/interfaces/pokemon.interface';
import { DataService } from '@modules/core/services/data/data.service';
import { HomeComponent } from '@modules/home/pages/home/home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const pokedex: Pokedex = { count: 1, pokemons: [{ id:123, name:"pikachu", image:"pikachu.png",type:"electrico"}] };
  const mockedDataService: {
    get: () => Promise<Pokedex>;
  } = {
    get: () =>
      new Promise((resolve, reject) => {
        resolve(pokedex);
      }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule, CoreModule],
      providers: [{ provide: DataService, useValue: mockedDataService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons', () => {
    const getPokemonsSpy = spyOn(mockedDataService, 'get');
    getPokemonsSpy.and.returnValue(new Promise((resolve,reject)=>{resolve(pokedex)}));
    component.search();
    expect(mockedDataService.get).toHaveBeenCalled();
    component.pokedex.then(() => {
      expect(component.hasNext).toBeFalsy();
    });
  });

});
