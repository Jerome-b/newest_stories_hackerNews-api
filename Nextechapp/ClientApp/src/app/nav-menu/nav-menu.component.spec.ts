import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkStubDirective } from '../testing/router-link-directive-stub';
import { Routes, Router } from '@angular/router';

import { NavMenuComponent } from './nav-menu.component';
import { HomeComponent } from '../home/home.component';
import { NewsComponent } from '../news/news.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'news', component: NewsComponent
  }
];

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), MatTableModule, FormsModule],
      declarations: [
        NavMenuComponent,
        RouterLinkStubDirective,
        HomeComponent,
        NewsComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link to other pages', () => {
    var linkElements = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    var button = linkElements.map(element => element.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    expect(button.length).toBe(3, 'navigation bar should have 3 buttons to navigate');
    expect(button[0].linkParams).toBe('/', '1st button should go to Home');
    expect(button[1].linkParams).toBe('/', '2nd button should go to Home');
    expect(button[2].linkParams).toBe('/news', '3rd button should go to News');
  });
});
