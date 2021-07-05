import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  listPokemon(url) {
    return this.http.get(url)
  }

  loadPokemon(url) {
    return this.http.get(url);
  }
}
