import { Component, Inject, OnInit, ViewChild, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [{provide: BASE_URL, useValue: 'http://localhost'}]

})
export class NewsComponent implements OnInit {

  dataSource;
  news: NewStoriesModel[];
  displayedColumns: string[] = ['id', 'title', 'url'];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    this.getStories();
  }


  async getStories() {
    await this.http.get<NewStoriesModel[]>(this.baseUrl + 'newstories').subscribe(news => {
      this.dataSource = new MatTableDataSource<NewStoriesModel>(news);
      this.dataSource.paginator = this.paginator;
    }, error => console.error(error));
  }

  }

  
interface NewStoriesModel {
  By: string;
  Title: string;
  Url: string;
}



