import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ViewChild, Component, Type, Provider } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NewsComponent } from './news.component';
import { FormsModule } from '@angular/forms';
import { dispatchMouseEvent } from '@angular/cdk/testing';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

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
});

describe('Mock matpaginator', () => {
  let mockComponent: MatPaginatorApp;
  let mockFixture: ComponentFixture<MatPaginatorApp>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatPaginatorApp],
      imports: [MatPaginatorModule,NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockFixture = TestBed.createComponent(MatPaginatorApp);
    mockComponent = mockFixture.componentInstance;
    mockFixture.detectChanges();
  });
  // test next button of pagination
  it('should be able to go to the next page', () => {
    const paginator = mockComponent.paginator;
    expect(paginator.pageIndex).toBe(0);
    dispatchMouseEvent(getNextButton(mockFixture), 'click');

    expect(paginator.pageIndex).toBe(1);
    expect(mockComponent.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      previousPageIndex: 0,
      pageIndex: 1
    }));
  });

  // test previous button of pagination
  it('should be able to go to the previous page', () => {
    const paginator = mockComponent.paginator;
    paginator.pageIndex = 1;
    mockFixture.detectChanges();
    expect(paginator.pageIndex).toBe(1);

    dispatchMouseEvent(getPreviousButton(mockFixture), 'click');

    expect(paginator.pageIndex).toBe(0);
    expect(mockComponent.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      previousPageIndex: 1,
      pageIndex: 0
    }));
  });

  // test last page button of pagination
  it('should be able to go to the last page via the last page button', () => {
    const paginator = mockComponent.paginator;
    expect(paginator.pageIndex).toBe(0);

    dispatchMouseEvent(getLastButton(mockFixture), 'click');

    expect(paginator.pageIndex).toBe(19);
    expect(mockComponent.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      previousPageIndex: 0,
      pageIndex: 19
    }));
  });

  // test first page button of pagination
  it('should be able to go to the first page via the first page button', () => {
    const paginator = mockComponent.paginator;
    paginator.pageIndex = 5;
    mockFixture.detectChanges();
    expect(paginator.pageIndex).toBe(5);

    dispatchMouseEvent(getFirstButton(mockFixture), 'click');

    expect(paginator.pageIndex).toBe(0);
    expect(mockComponent.pageEvent).toHaveBeenCalledWith(jasmine.objectContaining({
      previousPageIndex: 5,
      pageIndex: 0
    }));
  });

  // functions to get the 4 differents buttons: next, previous, first, last
  function getPreviousButton(mockFixture: ComponentFixture<any>) {
    return mockFixture.nativeElement.querySelector('.mat-paginator-navigation-previous');
  }

  function getNextButton(mockFixture: ComponentFixture<any>) {
    return mockFixture.nativeElement.querySelector('.mat-paginator-navigation-next');
  }

  function getFirstButton(mockFixture: ComponentFixture<any>) {
    return mockFixture.nativeElement.querySelector('.mat-paginator-navigation-first');
  }

  function getLastButton(mockFixture: ComponentFixture<any>) {
    return mockFixture.nativeElement.querySelector('.mat-paginator-navigation-last');
  }
});

// creating a mock component with a mat paginator for testing
@Component({
  template: `
    <mat-paginator [pageIndex]="pageIndex"
                   [pageSize]="pageSize"
                   [pageSizeOptions]="pageSizeOptions"
                   [length]="length"
                   showFirstLastButtons
                   (page)="pageEvent($event)">
    </mat-paginator>
  `,
})
class MatPaginatorApp {
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 25];
  length = 200;
  pageEvent = jasmine.createSpy('page event');

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

}
