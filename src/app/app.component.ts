import { Component, OnInit } from '@angular/core';
import { People } from './interfaces/people.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data: any = null;
  dataPeople: People[] = [
    {
      birth_year: '',
      gender: '',
      eye_color: '',
      name: '',
    },
  ];
  displayedColumns: string[] = ['name', 'birth_year', 'eye_color', 'gender'];
  currentPage = 1;

  ngOnInit() {
    this.fetchUrl(this.currentPage);
  }

  active = null;

  handleClick(i: any) {
    if (this.active === i) {
      this.active = null;
    } else {
      this.active = i;
    }
  }

  fetchUrl(page: number) {
    this.active = null;
    this.currentPage = page;
    fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.warn(responseJson);
        this.data = responseJson;
        this.dataPeople = responseJson.results;
        this;
      });
  }

  handleChange($event: any) {
    this.fetchUrl($event.pageIndex + 1);
  }
}
