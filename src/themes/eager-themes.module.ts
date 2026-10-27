import { NgModule } from '@angular/core';

import { UagrmItemSearchResultListElementComponent } from './custom/app/shared/object-list/search-result-list-element/item-search-result/item-types/item/uagrm-item-search-result-list-element.component';
import { EagerThemeModule as DSpaceEagerThemeModule } from './dspace/eager-theme.module';
// import { EagerThemeModule as CustomEagerThemeModule } from './custom/eager-theme.module';

/**
 * This module bundles the eager theme modules for all available themes.
 * Eager modules contain components that are present on every page (to speed up initial loading)
 * and entry components (to ensure their decorators get picked up).
 *
 * Themes that aren't in use should not be imported here so they don't take up unnecessary space in the main bundle.
 */
@NgModule({
  imports: [
    DSpaceEagerThemeModule,
    UagrmItemSearchResultListElementComponent,
    // CustomEagerThemeModule,
  ],
  providers: [UagrmItemSearchResultListElementComponent],
})
export class EagerThemesModule {
}
