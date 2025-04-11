export interface Place {
  id: string;
  name: string;
  type: 'hotel' | 'restaurant' | 'tourist';
  position: {
    lat: number;
    lng: number;
  };
  description: string;
  imageUrl?: string;
  rating?: number;
  bookingUrl?: string;
}
