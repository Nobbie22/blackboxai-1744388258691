import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  searchControl = new FormControl('');
  selectedType: string | null = null;
  isOpen = true;

  readonly placeTypes = [
    { value: 'hotel', icon: 'fa-hotel', label: 'Hotels' },
    { value: 'restaurant', icon: 'fa-utensils', label: 'Restaurants' },
    { value: 'tourist', icon: 'fa-camera', label: 'Tourist Spots' }
  ];

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    // Setup search with debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(term => {
        this.placesService.setSearchTerm(term || '');
      });
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  selectType(type: string | null): void {
    this.selectedType = this.selectedType === type ? null : type;
    this.placesService.setTypeFilter(this.selectedType);
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  isTypeSelected(type: string): boolean {
    return this.selectedType === type;
  }
}
