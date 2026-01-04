import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-catalogue',
  imports: [CommonModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent {
catalogueData: any[] = [];
loading: boolean = false;
error: string | null = null;

constructor(private http: HttpClient) {}
exploreCatalogue() {
  this.loading = true;
  this.error = null;
  this.catalogueData = [];

  this.http.get<any>('http://localhost:8080/api/public/catalogue').subscribe({
    next: (data) => {
      // Handle both array and single object responses
      this.catalogueData = Array.isArray(data) ? data : [data];
      this.loading = false;
      console.log("Catalogue data:", this.catalogueData);
    },
    error: (error) => {
      this.error = 'Failed to load catalogue. Please try again.';
      this.loading = false;
      console.error('Error fetching catalogue:', error);
    }
  });
}
handleImageError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found';
}
}
