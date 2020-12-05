import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {

  dataSource: MatTableDataSource<NewStoriesModel>;
  news: NewStoriesModel[];
  displayedColumns: string[] = ['author', 'date', 'title', 'url'];

  constructor(private http: HttpClient) {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    this.getStories();
  }

  getStories() {
    this.http.get<NewStoriesModel[]>('/newstories').subscribe(news => {
      console.log(news);
      this.dataSource = new MatTableDataSource<NewStoriesModel>(news);
      this.dataSource.paginator = this.paginator;
    }, error => console.error(error));

  }

}

export interface NewStoriesModel {
  by: string;
  time: number;
  title: string;
  url: string;
}



