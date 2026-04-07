
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  enquiry = {
    name: '',
    email: '',
    phonenumber: '',
    course: '',
    city: ''
  };


  showPopup = false;
isLoading = false;

showInfoPopup = false;
popupType = '';

openPopup(type: string) {
  this.popupType = type;
  this.showInfoPopup = true;
}

closeInfoPopup() {
  this.showInfoPopup = false;
}
showCoursePopup = false;

showCoursesPopup() {
  this.showCoursePopup = true;
}

closeCoursesPopup() {
  this.showCoursePopup = false;
}

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  submitEnquiry() {
  this.isLoading = true;

  this.http.post('http://localhost:9500/nts/addEnquiry', this.enquiry).subscribe({
    next: (res) => {
      this.isLoading = false;

      this.showPopup = true;
      this.cdr.detectChanges();

      this.enquiry = {
        name: '',
        email: '',
        phonenumber: '',
        course: '',
        city: ''
      };

      setTimeout(() => {
        this.showPopup = false;
        this.cdr.detectChanges();
      }, 3000);
    },
    error: (err) => {
      this.isLoading = false;
      console.log(err);
    }
  });
}

  closePopup() {
    this.showPopup = false;
  }
}