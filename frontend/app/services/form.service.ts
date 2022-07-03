import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  //private countryUrl = 'http://localhost:7799/api/countries';
  private countryUrl = environment.jonnycolShopApiUrl + "countries";
  //private stateUrl = 'http://localhost:7799/api/states';
  private stateUrl = environment.jonnycolShopApiUrl + "states";

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number[] = [];

    for(let month = startMonth; month<=12; month++){
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];

    //let startYear = new Date().getFullYear();
    const startYear = new Date().getFullYear();
    //let endYear = startYear + 10;
    const endYear = startYear + 10;

    for(let year=startYear; year<=endYear; year++){
      data.push(year);
    }

    return of(data);
  }

  getCountries():Observable<Country[]>{
    return this.httpClient.get<GetResponseCountry>(this.countryUrl).pipe(map(response => response._embedded.countries));
  }

  getStates(countryId: number):Observable<State[]>{
    let searchUrl = this.stateUrl + "/search/findByCountryId?id=" + countryId;
    return this.httpClient.get<GetResponseState>(searchUrl).pipe(map(response => response._embedded.states));
  }
}

interface GetResponseCountry{
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseState{
  _embedded: {
    states: State[];
  }
}