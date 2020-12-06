import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NewsComponent } from './news.component';
import { FormsModule } from '@angular/forms';
import { dispatchMouseEvent } from '@angular/cdk/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsComponent],
      imports: [
        MatTableModule,
        HttpClientModule,
        FormsModule,
        MatPaginatorModule,
        NoopAnimationsModule],
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

  it('should display a header named author', async(() => {
    const headerName = fixture.nativeElement.querySelector('.headerauthor').textContent;
    expect(headerName).toEqual('Author');
  }));

  it('should display a header named date', async(() => {
    const headerName = fixture.nativeElement.querySelector('.headerdate').textContent;
    expect(headerName).toEqual('Date');
  }));

  it('should display a header named title', async(() => {
    const headerName = fixture.nativeElement.querySelector('.headertitle').textContent;
    expect(headerName).toEqual('Title');
  }));

  it('should display a header named link', async(() => {
    const headerName = fixture.nativeElement.querySelector('.headerlink').textContent;
    expect(headerName).toEqual('Link');
  }));

  // test search field input
  it('should search', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const input = fixture.nativeElement.querySelector('input');
      const search = 'anyValue';

      input.focus();
      input.value = search;
      input.dispatchEvent(new Event('input'));

      expect(fixture.componentInstance.searchValue).toEqual(search);

    })
  }));

  // test next button of pagination
  it('should be able to go to the next page', () => {
    const paginator = component.paginator;
    expect(paginator.pageIndex).toBe(0);
    dispatchMouseEvent(getNextButton(fixture), 'click');

    expect(paginator.pageIndex).toBe(1);
    expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      previousPageIndex: 0,
      pageIndex: 1
    }));
  });

  // test previous button of pagination
  it('should be able to go to the previous page', () => {
    const paginator = component.paginator;
    paginator.pageIndex = 1;
    fixture.detectChanges();
    expect(paginator.pageIndex).toBe(1);

    dispatchMouseEvent(getPreviousButton(fixture), 'click');

    expect(paginator.pageIndex).toBe(0);
    expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      previousPageIndex: 1,
      pageIndex: 0
    }));
  });

  // test last page button of pagination
  it('should be able to go to the last page via the last page button', () => {
    const paginator = component.paginator;
    expect(paginator.pageIndex).toBe(0);

    dispatchMouseEvent(getLastButton(fixture), 'click');

    expect(paginator.pageIndex).toBe(19);
    expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      previousPageIndex: 0,
      pageIndex: 19
    }));
  });

  // test first page button of pagination
  it('should be able to go to the first page via the first page button', () => {
    const paginator = component.paginator;
    paginator.pageIndex = 5;
    fixture.detectChanges();
    expect(paginator.pageIndex).toBe(5);

    dispatchMouseEvent(getFirstButton(fixture), 'click');

    expect(paginator.pageIndex).toBe(0);
    expect(component.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      previousPageIndex: 5,
      pageIndex: 0
    }));
  });

  function getPreviousButton(fixture: ComponentFixture<any>) {
    return fixture.nativeElement.querySelector('.mat-paginator-navigation-previous');
  }

  function getNextButton(fixture: ComponentFixture<any>) {
    return fixture.nativeElement.querySelector('.mat-paginator-navigation-next');
  }

  function getFirstButton(fixture: ComponentFixture<any>) {
    return fixture.nativeElement.querySelector('.mat-paginator-navigation-first');
  }

  function getLastButton(fixture: ComponentFixture<any>) {
    return fixture.nativeElement.querySelector('.mat-paginator-navigation-last');
  }
});
