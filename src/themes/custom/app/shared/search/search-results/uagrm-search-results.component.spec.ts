import { AsyncPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  RouterLink,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  BehaviorSubject,
  of,
} from 'rxjs';

import { SearchService } from '../../../../../../app/core/shared/search/search.service';
import { SearchConfigurationService } from '../../../../../../app/core/shared/search/search-configuration.service';
import { PaginationComponentOptions } from '../../../../../../app/shared/pagination/pagination-component-options.model';
import { PaginatedSearchOptions } from '../../../../../../app/shared/search/models/paginated-search-options.model';
import { SearchResultsComponent } from './search-results.component';

describe('UAGRM search results', () => {
  let fixture: ComponentFixture<SearchResultsComponent>;
  let component: SearchResultsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsComponent, TranslateModule.forRoot(), NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: SearchConfigurationService, useValue: { getCurrentFilters: () => of([]) } },
        { provide: SearchService, useValue: { appliedFilters$: new BehaviorSubject([]) } },
      ],
    }).overrideComponent(SearchResultsComponent, {
      set: { imports: [AsyncPipe, RouterLink, TranslateModule], schemas: [NO_ERRORS_SCHEMA] },
    }).compileComponents();
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    component.searchConfig = Object.assign(new PaginatedSearchOptions({}), {
      query: 'investigación',
      pagination: Object.assign(new PaginationComponentOptions(), { id: 'spc', currentPage: 1, pageSize: 10 }),
    });
  });

  function render(state: object): HTMLElement {
    component.searchResults = state as SearchResultsComponent['searchResults'];
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('shows loading instead of stale empty results', () => {
    const el = render({ isLoading: true, payload: { page: [] } });
    expect(el.querySelector('ds-search-results-skeleton')).not.toBeNull();
    expect(el.querySelector('.uagrm-search-empty')).toBeNull();
    expect(el.querySelector('.uagrm-results-count').textContent.trim()).toBe('');
  });

  it('passes native results and pagination to the collection', () => {
    const el = render({ hasSucceeded: true, payload: { page: [{}], totalElements: 42 } });
    const collection = el.querySelector('ds-viewable-collection') as any;
    expect(collection.objects).toBe(component.searchResults);
    expect(collection.config).toBe(component.searchConfig.pagination);
    expect(el.querySelector('.uagrm-search-empty')).toBeNull();
  });

  it('preserves selection and thumbnail inputs', () => {
    component.selectable = true;
    component.showThumbnails = false;
    component.selectionConfig = { repeatable: false, listId: 'test' };
    const el = render({ hasSucceeded: true, payload: { page: [{}], totalElements: 1 } });
    const collection = el.querySelector('ds-viewable-collection') as any;
    expect(collection.selectable).toBeTrue();
    expect(collection.showThumbnails).toBeFalse();
    expect(collection.selectionConfig).toBe(component.selectionConfig);
  });

  it('offers the native exact-phrase retry for an empty result', () => {
    const el = render({ hasSucceeded: true, payload: { page: [], totalElements: 0 } });
    expect(el.querySelector('.uagrm-search-empty')).not.toBeNull();
    expect(el.querySelector('ds-search-results-skeleton')).toBeNull();
    expect(el.querySelector('.uagrm-search-empty a').getAttribute('href')).toContain(encodeURIComponent('"investigación"'));
  });

  it('does not offer an empty retry query', () => {
    component.searchConfig.query = '   ';
    const el = render({ hasSucceeded: true, payload: { page: [], totalElements: 0 } });
    expect(el.querySelector('.uagrm-search-empty a')).toBeNull();
  });

  it('shows only recovery for HTTP 400 even without an error message', () => {
    const el = render({ hasFailed: true, statusCode: 400 });
    expect(el.querySelector('.uagrm-search-empty')).not.toBeNull();
    expect(el.querySelector('ds-error')).toBeNull();
    expect(el.querySelector('ds-search-results-skeleton')).toBeNull();
  });

  [403, 422, 500].forEach((statusCode) => {
    it(`keeps HTTP ${statusCode} as an error rather than empty results`, () => {
      const el = render({ hasFailed: true, statusCode });
      expect(el.querySelector('ds-error')).not.toBeNull();
      expect(el.querySelector('.uagrm-search-empty')).toBeNull();
      expect(el.querySelector('ds-search-results-skeleton')).toBeNull();
    });
  });

  it('respects disabled headings in embedded contexts', () => {
    component.disableHeader = true;
    const el = render({ hasSucceeded: true, payload: { page: [{}], totalElements: 1 } });
    expect(el.querySelector('h1')).toBeNull();
    expect(el.querySelector('.uagrm-results-count')).toBeNull();
  });
});
