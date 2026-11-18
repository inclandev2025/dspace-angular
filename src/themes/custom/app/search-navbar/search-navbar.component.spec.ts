import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SearchService } from '../../../../app/core/shared/search/search.service';
import { SearchNavbarComponent } from './search-navbar.component';

describe('UAGRM persistent header search', () => {
  let fixture: ComponentFixture<SearchNavbarComponent>;
  let navigate: jasmine.Spy;

  beforeEach(async () => {
    navigate = jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true));
    await TestBed.configureTestingModule({
      imports: [SearchNavbarComponent, TranslateModule.forRoot()],
      providers: [
        { provide: Router, useValue: { navigate } },
        { provide: SearchService, useValue: { getSearchLink: () => '/search' } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SearchNavbarComponent);
    fixture.detectChanges();
  });

  function input(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  it('allows typing immediately and stays visible after losing focus', () => {
    expect(input().tabIndex).toBe(0);
    expect(input().getAttribute('aria-label')).toBeTruthy();
    input().focus();
    input().blur();
    fixture.detectChanges();
    expect(input().getBoundingClientRect().width).toBeGreaterThan(0);
    expect(getComputedStyle(input()).opacity).toBe('1');
  });

  it('submits directly from the magnifier and keeps the field available', () => {
    input().value = 'tesis UAGRM';
    input().dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(navigate).toHaveBeenCalledWith(['search'], { queryParams: { query: 'tesis UAGRM' } });
    expect(input().getBoundingClientRect().width).toBeGreaterThan(0);
    expect(input().tabIndex).toBe(0);
  });

  it('uses the same search route for native form submission (Enter)', () => {
    fixture.componentInstance.searchForm.setValue({ query: 'ingeniería' });
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(navigate).toHaveBeenCalledWith(['search'], { queryParams: { query: 'ingeniería' } });
  });
});
