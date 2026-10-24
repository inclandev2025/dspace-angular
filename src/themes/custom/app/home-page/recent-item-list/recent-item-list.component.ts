import {
  AsyncPipe,
  NgClass,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RecentItemListComponent as BaseComponent } from '../../../../../app/home-page/recent-item-list/recent-item-list.component';
import { fadeIn } from '../../../../../app/shared/animations/fade';
import { ErrorComponent } from '../../../../../app/shared/error/error.component';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { ListableObjectComponentLoaderComponent } from '../../../../../app/shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

/** Presentation only: keep the native recent-submission query and permissions. */
@Component({
  selector: 'ds-uagrm-recent-item-list',
  templateUrl: './recent-item-list.component.html',
  styleUrls: ['./recent-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
  imports: [
    AsyncPipe,
    ErrorComponent,
    ListableObjectComponentLoaderComponent,
    NgClass,
    RouterLink,
    ThemedLoadingComponent,
    TranslateModule,
    VarDirective,
  ],
})
export class UagrmRecentItemListComponent extends BaseComponent {
}
