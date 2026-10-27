import { AsyncPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  provideRouter,
  RouterLink,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { DSONameService } from '../../../../../../../../../app/core/breadcrumbs/dso-name.service';
import { Collection } from '../../../../../../../../../app/core/shared/collection.model';
import { Context } from '../../../../../../../../../app/core/shared/context.model';
import { Item } from '../../../../../../../../../app/core/shared/item.model';
import { MetadataValue } from '../../../../../../../../../app/core/shared/metadata.models';
import { ViewMode } from '../../../../../../../../../app/core/shared/view-mode.model';
import { CollectionElementLinkType } from '../../../../../../../../../app/shared/object-collection/collection-element-link.type';
import { ItemSearchResult } from '../../../../../../../../../app/shared/object-collection/shared/item-search-result.model';
import { getListableObjectComponent } from '../../../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { TruncatableService } from '../../../../../../../../../app/shared/truncatable/truncatable.service';
import { APP_CONFIG } from '../../../../../../../../../config/app-config.interface';
import { UagrmItemSearchResultListElementComponent } from './uagrm-item-search-result-list-element.component';

describe('UAGRM item search card', () => {
  let fixture: ComponentFixture<UagrmItemSearchResultListElementComponent>;
  let component: UagrmItemSearchResultListElementComponent;
  let item: Item;
  const value = (text: string) => Object.assign(new MetadataValue(), { value: text });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UagrmItemSearchResultListElementComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]), DSONameService,
        { provide: APP_CONFIG, useValue: { browseBy: { showThumbnails: true } } },
        { provide: TruncatableService, useValue: {} },
      ],
    }).overrideComponent(UagrmItemSearchResultListElementComponent, {
      set: { imports: [AsyncPipe, RouterLink, TranslateModule], schemas: [NO_ERRORS_SCHEMA] },
    }).compileComponents();
    fixture = TestBed.createComponent(UagrmItemSearchResultListElementComponent);
    component = fixture.componentInstance;
    item = Object.assign(new Item(), {
      id: 'test-item', uuid: 'test-item', metadata: { 'dc.title': [value('Investigación académica')] },
    });
    component.object = Object.assign(new ItemSearchResult(), { indexableObject: item, hitHighlights: {} });
    component.linkType = CollectionElementLinkType.Link;
  });

  function render(): HTMLElement {
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('registers only for the search context', () => {
    expect(getListableObjectComponent([ItemSearchResult], ViewMode.ListElement, Context.Search, 'custom'))
      .toBe(UagrmItemSearchResultListElementComponent);
    expect(getListableObjectComponent([ItemSearchResult], ViewMode.ListElement, Context.Any, 'custom'))
      .not.toBe(UagrmItemSearchResultListElementComponent);
  });

  it('omits missing metadata and unavailable thumbnails', () => {
    const el = render();
    expect(el.querySelector('h2').textContent).toContain('Investigación académica');
    ['.uagrm-result-authors', '.uagrm-result-thumbnail', '.uagrm-result-collection', '.uagrm-result-abstract']
      .forEach((selector) => expect(el.querySelector(selector)).toBeNull());
  });

  it('renders available author, date, type and owning collection', () => {
    item.metadata['dc.contributor.author'] = [value('García')];
    item.metadata['dc.date.issued'] = [value('2026')];
    item.metadata['dc.type'] = [value('Tesis')];
    item.owningCollection = of({ payload: Object.assign(new Collection(), { name: 'Ingeniería' }) } as any);
    const el = render();
    expect(el.querySelector('.uagrm-result-authors').textContent).toContain('García');
    expect(el.querySelector('.uagrm-result-metadata').textContent).toContain('2026');
    expect(el.querySelector('.uagrm-result-metadata').textContent).toContain('Tesis');
    expect(el.querySelector('.uagrm-result-collection').textContent).toContain('Ingeniería');
  });

  it('keeps native highlighting and escapes metadata markup', () => {
    item.metadata['dc.contributor.author'] = [value('García')];
    item.metadata['dc.type'] = [value('<img src=x onerror=alert(1)>')];
    component.object.hitHighlights = { 'dc.contributor.author': [value('<em>García</em>')] };
    const el = render();
    expect(el.querySelector('.uagrm-result-authors em').textContent).toBe('García');
    expect(el.querySelector('.uagrm-result-metadata img')).toBeNull();
    expect(el.querySelector('.uagrm-result-metadata').textContent).toContain('<img');
  });

  it('omits a failed thumbnail response', () => {
    item.thumbnail = of({ hasFailed: true, statusCode: 403 } as any);
    expect(render().querySelector('ds-thumbnail')).toBeNull();
  });

  it('respects disabled thumbnails even when a file is available', () => {
    component.showThumbnails = false;
    item.thumbnail = of({ hasSucceeded: true, payload: {} } as any);
    expect(render().querySelector('ds-thumbnail')).toBeNull();
  });

  it('renders an available thumbnail', () => {
    item.thumbnail = of({ hasSucceeded: true, payload: {} } as any);
    expect(render().querySelector('ds-thumbnail')).not.toBeNull();
  });

  it('does not create links when the caller disables them', () => {
    component.linkType = CollectionElementLinkType.None;
    expect(render().querySelector('a')).toBeNull();
  });

  it('preserves safe external-link behavior', () => {
    component.linkType = CollectionElementLinkType.ExternalLink;
    const link = render().querySelector('h2 a');
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
