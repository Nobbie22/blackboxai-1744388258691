import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, MapInfoWindow, MapMarker, GoogleMapsModule } from '@angular/google-maps';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  center: google.maps.LatLngLiteral = { lat: 40.7128, lng: -74.0060 }; // Default to NYC
  zoom = 12;
  places: Place[] = [];
  selectedPlace: Place | null = null;
  
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  markerOptions: google.maps.MarkerOptions = {
    animation: google.maps.Animation.DROP,
  };

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    this.placesService.getPlaces().subscribe(places => {
      this.places = places;
      if (places.length > 0) {
        this.center = places[0].position;
      }
    });
  }

  getMarkerOptions(place: Place): google.maps.MarkerOptions {
    return {
      ...this.markerOptions,
      icon: this.getMarkerIcon(place.type)
    };
  }

  openInfoWindow(marker: MapMarker, place: Place): void {
    this.selectedPlace = place;
    this.infoWindow.open(marker);
  }

  getMarkerIcon(type: string): google.maps.Icon {
    const iconBase = 'https://maps.google.com/mapfiles/ms/icons/';
    switch (type) {
      case 'hotel':
        return { url: iconBase + 'blue-dot.png' };
      case 'restaurant':
        return { url: iconBase + 'red-dot.png' };
      case 'tourist':
        return { url: iconBase + 'green-dot.png' };
      default:
        return { url: iconBase + 'yellow-dot.png' };
    }
  }

  onBookNow(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
