import { AsyncPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ActivatedRoute,
  provideRouter,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AuthService } from '../../../app/core/auth/auth.service';
import { DSONameService } from '../../../app/core/breadcrumbs/dso-name.service';
import { AuthorizationDataService } from '../../../app/core/data/feature-authorization/authorization-data.service';
import { VarDirective } from '../../../app/shared/utils/var.directive';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { CommunityPageComponent } from './community-page/community-page.component';

// Exercise the custom templates with the inherited route/authentication logic.
// Child components are deliberately shallow: this suite does not certify REST or downloads.
[CommunityPageComponent, CollectionPageComponent].forEach((pageType) => {
  describe(`UAGRM ${pageType.name}`, () => {
    let routeData: object;
    let authenticated: boolean;
    let auth: jasmine.SpyObj<AuthService>;

    beforeEach(async () => {
      authenticated = false;
      auth = jasmine.createSpyObj<AuthService>('AuthService', ['isAuthenticated', 'setRedirectUrl']);
      auth.isAuthenticated.and.callFake(() => of(authenticated));
      await TestBed.configureTestingModule({
        imports: [pageType, TranslateModule.forRoot(), NoopAnimationsModule],
        providers: [
          provideRouter([]),
          { provide: ActivatedRoute, useValue: { get data() { return of({ dso: routeData }); } } },
          { provide: AuthService, useValue: auth },
          { provide: AuthorizationDataService, useValue: { isAuthorized: () => of(false) } },
          { provide: DSONameService, useValue: { getName: () => 'Facultad de prueba' } },
        ],
      }).overrideComponent(pageType, {
        set: {
          imports: [AsyncPipe, RouterLink, RouterOutlet, TranslateModule, VarDirective],
          schemas: [NO_ERRORS_SCHEMA],
        },
      }).compileComponents();
    });

    function render(state: object): HTMLElement {
      routeData = state;
      const fixture = TestBed.createComponent<CommunityPageComponent | CollectionPageComponent>(pageType);
      fixture.detectChanges();
      return fixture.nativeElement;
    }

    it('keeps loading separate from content and error', () => {
      const el = render({ isLoading: true });
      expect(el.querySelector('ds-loading')).not.toBeNull();
      expect(el.querySelector('ds-error')).toBeNull();
      expect(el.querySelector('router-outlet')).toBeNull();
    });

    it('shows a server failure without rendering a successful page', () => {
      const el = render({ hasFailed: true, statusCode: 500 });
      expect(el.querySelector('ds-error')).not.toBeNull();
      expect(el.querySelector('ds-loading')).toBeNull();
      expect(el.querySelector('router-outlet')).toBeNull();
    });

    it('retains native navigation and object bindings for a successful response', () => {
      const payload = { id: 'test-id', type: 'test-type', logo: of({ payload: null }) };
      const el = render({ hasSucceeded: true, payload });
      const browse = el.querySelector('ds-comcol-page-browse-by') as any;
      expect(browse.id).toBe(payload.id);
      expect(browse.contentType).toBe(payload.type);
      expect(el.querySelector('router-outlet')).not.toBeNull();
      expect(el.querySelector('ds-dso-edit-menu')).not.toBeNull();
      expect(el.querySelector('.uagrm-return a').getAttribute('href')).toBe('/community-list');
      expect(el.querySelector('footer')).toBeNull();
    });

    it('does not invent content when a successful response has no payload', () => {
      const el = render({ hasSucceeded: true, payload: null });
      expect(el.querySelector('ds-comcol-page-browse-by')).toBeNull();
      expect(el.querySelector('router-outlet')).toBeNull();
    });

    [401, 403].forEach((statusCode) => {
      it(`preserves login redirection for anonymous HTTP ${statusCode}`, () => {
        const navigate = spyOn(TestBed.inject(Router), 'navigateByUrl').and.resolveTo(true);
        const el = render({ hasFailed: true, statusCode });
        expect(navigate).toHaveBeenCalledWith('login');
        expect(auth.setRedirectUrl).toHaveBeenCalled();
        expect(el.querySelector('router-outlet')).toBeNull();
      });
    });

    it('preserves the forbidden route for an authenticated denied response', () => {
      authenticated = true;
      const navigate = spyOn(TestBed.inject(Router), 'navigateByUrl').and.resolveTo(true);
      render({ hasFailed: true, statusCode: 403 });
      expect(navigate).toHaveBeenCalledWith('/403', { skipLocationChange: true });
    });
  });
});
