import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [MatTableModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create news component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', async(() => {
    const titlePage = fixture.nativeElement.querySelector('h1').textContent;
    expect(titlePage).toEqual('News');
  }));

  it('table should display a header named Author', async(() => {
    const headerName = fixture.nativeElement.querySelector('.headerauthor').textContent;
    expect(headerName).toEqual('Author');
  }));

  it('table should display a header named Date', async(() => {
    const headerName = fixture.nativeElement.querySelector('.headerdate').textContent;
    expect(headerName).toEqual('Date');
  }));

  it('table should display a header named Title', async(() => {
    const headerName = fixture.nativeElement.querySelector('.headertitle').textContent;
    expect(headerName).toEqual('Title');
  }));

  it('table should display a header named Link', async(() => {
    const headerName = fixture.nativeElement.querySelector('.headerlink').textContent;
    expect(headerName).toEqual('Link');
  }));

});
