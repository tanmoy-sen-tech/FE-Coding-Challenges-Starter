import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MovieData, MovieComplete, MovieDetails, SearchResults } from '../model/movies-search';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private decades: number[] = [];
  private posterUrl = 'https://m.media-amazon.com/images/M/';
  private replacePosterUrl = '/assets/images/';
  private serviceUrl = 'https://www.omdbapi.com/?apikey=f59b2e4b&';
  private storedMovies: MovieData = { Search: [], Decades: [] };

  constructor(private http: HttpClient) {}

  public getFilteredMovies(movies: MovieComplete[], decade?: number): MovieComplete[] {
    if (!decade) {
      return movies;
    }

    const decadeLimit = decade + 10;
    return movies.filter((movie) => movie.Year >= decade && movie.Year < decadeLimit);
  }

  public getMovie(id: string): Observable<MovieComplete> {
    return this.http.get<MovieDetails>(`${this.serviceUrl}i=${id}`).pipe(
      map(({ Actors, Director, Genre, imdbID, Plot, Poster, Rated, Released, Runtime, Title, Type, Writer, Year }) => ({
        Actors,
        Director,
        Genre,
        imdbID,
        Plot,
        Poster: this.convertToWebP(Poster.replace(this.posterUrl, this.replacePosterUrl)),
        Rated,
        Released,
        Runtime,
        Title,
        Type,
        Writer,
        Year: parseInt(Year as string)
      }))
    );
  }

  public getMovies(): Observable<MovieData> {
    if (this.storedMovies && this.storedMovies.Search.length) {
      return of(this.storedMovies);
    }

    return this.http.get<SearchResults>(`${this.serviceUrl}s=Batman&type=movie`).pipe(
      mergeMap(({ Search }) =>
        forkJoin(
          Search.map(({ imdbID, Year }) => {
            // add decade to decades
            const decade = Math.ceil(parseInt(Year as string) / 10) * 10 - 10;
            if (this.decades.indexOf(decade) < 0) {
              this.decades.push(decade);
            }

            return this.getMovie(imdbID);
          })
        )
      ),
      map((Search) => {
        Search = Search.sort(({ Year: year1 }: MovieComplete, { Year: year2 }: MovieComplete) => year1 - year2);
        this.decades.sort((a, b) => a - b);
        this.storedMovies = { Search, Decades: this.decades };

        return this.storedMovies;
      })
    );
  }

  public convertToWebP(imageUrl: string) {
    // Replace '.jpg' with '.webp' in the URL
    const webpUrl = imageUrl.replace(/\.jpg$/, '.webp');
    return webpUrl;
  }
}
