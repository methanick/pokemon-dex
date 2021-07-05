import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PokemonService } from "../pokemon.service";
import _ from "lodash";
import { Table } from 'primeng-lts/table';

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.css"],
})
export class PokemonListComponent implements OnInit {
  pokemonList = [];
  originalPokemonList = [];
  url = "https://pokeapi.co/api/v2/pokemon?limit=20";
  loading = false;
  totalRecords = 0;
  searchName = ''
  previous
  next

  @ViewChild('dt',null) table: Table;


  constructor(
    private http: HttpClient,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.loadPekemon(this.url);
  }

  loadPekemon(url) {
    this.loading = true;
    this.pokemonList = []
    this.pokemonService.listPokemon(url).subscribe((res: any) => {
      if (res) {
        this.totalRecords = res.count;
        this.previous = res.previous
        this.next = res.next
        console.log(res);
        res.results.forEach(async (pokemon) => {
          console.log(pokemon);
          this.pokemonService.listPokemon(pokemon.url).subscribe(data=>{
            this.pokemonList.push(data)
          })
        });
        this.originalPokemonList = this.pokemonList
      }
      this.loading = false;
    });
  }

  async filterName(){
    let result = await this.originalPokemonList.filter(pokemon =>{
      return pokemon.name.includes(this.searchName)
    })

    this.pokemonList = result
  }

}
