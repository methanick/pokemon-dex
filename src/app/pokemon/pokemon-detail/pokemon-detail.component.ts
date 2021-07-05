import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-pokemon-detail",
  templateUrl: "./pokemon-detail.component.html",
  styleUrls: ["./pokemon-detail.component.css"],
})
export class PokemonDetailComponent implements OnInit {
  id;
  pokemonData
  constructor(private route: ActivatedRoute,
    private pokemonService: PokemonService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id)
    if(this.id){
      this.loadPokemon(this.id)
    }
  }

  loadPokemon(id){
    console.log(id)
    let url = "https://pokeapi.co/api/v2/pokemon/"+ id
    this.pokemonService.loadPokemon(url).subscribe(res=>{
      console.log(res)
      this.pokemonData = res
    })
  }
}
