import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places = new BehaviorSubject<Place[]>([]);
  private filteredPlaces = new BehaviorSubject<Place[]>([]);
  private selectedType = new BehaviorSubject<string | null>(null);
  private searchTerm = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.loadPlaces();
  }

  private loadPlaces(): void {
    this.http.get<Place[]>('assets/data/places.json')
      .subscribe(places => {
        this.places.next(places);
        this.applyFilters();
      });
  }

  getPlaces(): Observable<Place[]> {
    return this.filteredPlaces.asObservable();
  }

  setTypeFilter(type: string | null): void {
    this.selectedType.next(type);
    this.applyFilters();
  }

  setSearchTerm(term: string): void {
    this.searchTerm.next(term.toLowerCase());
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.places.value;
    const type = this.selectedType.value;
    const term = this.searchTerm.value;

    if (type) {
      filtered = filtered.filter(place => place.type === type);
    }

    if (term) {
      filtered = filtered.filter(place => 
        place.name.toLowerCase().includes(term) ||
        place.description.toLowerCase().includes(term)
      );
    }

    this.filteredPlaces.next(filtered);
  }
}
