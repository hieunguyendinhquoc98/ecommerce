import { Country } from './../common/country';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { State } from '../common/state';

@Injectable({
    providedIn: 'root'
})
export class EcommerceFormService {


    private countriesUrl = 'http://localhost:8080/api/v1/countries';
    private statesUrl = 'http://localhost:8080/api/v1/states';

    constructor(private httpClient: HttpClient) { }
    //FOR SHIPPING FORM

    getCountries(): Observable<Country[]> {
        return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
            map( response => response._embedded.countries)
        );
    }

    getStates(theCountryCode: string): Observable<State[]> {
        const searchUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
        return this.httpClient.get<GetResponseStates>(searchUrl).pipe(
            map( response => response._embedded.states)
        );
    }
    ///FOR CREDIT CARD FORM
    getCreditCardMonths(startMonth: number): Observable<number[]> {
        let data: number[] = [];

        for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
            data.push(theMonth);
        }

        //wrap an object as observable
        return of(data);
    }

    getCreditCardYears(): Observable<number[]> {
        let data: number[] = [];

        const startYear: number = new Date().getFullYear();
        const endYear: number = startYear + 10;

        for ( let theYear = startYear; theYear <= endYear; theYear++){
            data.push(theYear);
        }

        return of(data);
    }
}
interface GetResponseCountries {
    _embedded: {
        countries: Country[];
    }
}
interface GetResponseStates {
    _embedded: {
        states: State[];
    }
}
