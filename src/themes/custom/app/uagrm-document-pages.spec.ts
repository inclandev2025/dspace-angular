import { AsyncPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  provideRouter,
  Router,
  RouterLink,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { RouteService } from '../../../app/core/services/route.service';
import { Context } from '../../../app/core/shared/context.model';
import { Item } from '../../../app/core/shared/item.model';
import { ViewMode } from '../../../app/core/shared/view-mode.model';
import { getListableObjectComponent } from '../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { PublicationComponent } from './item-page/simple/item-types/publication/publication.component';
import { UntypedItemComponent } from './item-page/simple/item-types/untyped-item/untyped-item.component';

[PublicationComponent, UntypedItemComponent].forEach((pageType) => {
  describe(`UAGRM ${pageType.name}`, () => {
    let previousUrl: string;
    let storedUrl: string;
    let routeService: jasmine.SpyObj<RouteService>;

    beforeEach(async () => {
      previousUrl = '/search?query=tesis';
      storedUrl = null;
      routeService = jasmine.createSpyObj<RouteService>('RouteService', [
        'getPreviousUrl', 'storeUrlInSession', 'getUrlFromSession',
      ]);
      routeService.getPreviousUrl.and.callFake(() => of(previousUrl));
      routeService.getUrlFromSession.and.callFake(() => storedUrl);
      await TestBed.configureTestingModule({
        imports: [pageType, TranslateModule.forRoot()],
        providers: [provideRouter([]), { provide: RouteService, useValue: routeService }],
      }).overrideComponent(pageType, {
        set: { imports: [AsyncPipe, RouterLink, TranslateModule], schemas: [NO_ERRORS_SCHEMA] },
      }).compileComponents();
    });

    function render() {
      const fixture = TestBed.createComponent(pageType);
      fixture.componentInstance.object = Object.assign(new Item(), {
        id: 'test-item', uuid: 'test-item', metadata: {}, thumbnail: of(null),
      });
      fixture.componentInstance.mediaViewer = { image: false, video: false };
      fixture.detectChanges();
      return { component: fixture.componentInstance, el: fixture.nativeElement as HTMLElement };
    }

    it('resolves the institutional renderer rather than the upstream fallback', () => {
      const objectType = pageType === PublicationComponent ? 'Publication' : Item;
      expect(getListableObjectComponent([objectType], ViewMode.StandalonePage, Context.Any, 'custom')).toBe(pageType);
    });

    it('delegates files and licenses to native components even with empty metadata', () => {
      const { el, component } = render();
      expect((el.querySelector('ds-item-page-file-section') as any).item).toBe(component.object);
      expect((el.querySelector('ds-item-page-cc-license-field') as any).item).toBe(component.object);
      expect(el.querySelector('ds-item-page-collections')).not.toBeNull();
      expect(el.querySelector('a.btn').getAttribute('href')).toBe('/items/test-item/full');
      expect(el.querySelector('ds-mirador-viewer')).toBeNull();
    });

    it('returns to the originating results including the query', () => {
      const navigate = spyOn(TestBed.inject(Router), 'navigateByUrl').and.resolveTo(true);
      const { el, component } = render();
      expect(el.querySelector('ds-results-back-button')).not.toBeNull();
      component.back();
      expect(navigate).toHaveBeenCalledWith(previousUrl);
    });

    it('restores the saved results route on direct entry', () => {
      previousUrl = null;
      storedUrl = '/collections/test-collection';
      const navigate = spyOn(TestBed.inject(Router), 'navigateByUrl').and.resolveTo(true);
      const { el, component } = render();
      expect(el.querySelector('ds-results-back-button')).not.toBeNull();
      component.back();
      expect(navigate).toHaveBeenCalledWith(storedUrl);
    });

    it('hides the results control when no valid previous route exists', () => {
      previousUrl = '/login';
      const { el } = render();
      expect(el.querySelector('ds-results-back-button')).toBeNull();
    });
  });
});
