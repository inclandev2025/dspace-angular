import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { AuthMethodType } from '../../../../../app/core/auth/models/auth.method-type';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { LogInComponent as BaseComponent } from '../../../../../app/shared/log-in/log-in.component';
import { UagrmLogInContainerComponent } from './container/log-in-container.component';

@Component({
  selector: 'ds-themed-log-in',
  templateUrl: './log-in.component.html',
  // styleUrls: ['./log-in.component.scss'],
  styleUrls: ['../../../../../app/shared/log-in/log-in.component.scss'],
  imports: [
    AsyncPipe,
    ThemedLoadingComponent,
    UagrmLogInContainerComponent,
  ],
})
export class LogInComponent extends BaseComponent {
  override ngOnInit(): void {
    super.ngOnInit();
    // Preserve the native method list and caller exclusions; hide ORCID in this theme.
    this.authMethods = this.authMethods.pipe(
      map(methods => methods.filter(method => method.authMethodType !== AuthMethodType.Orcid)),
    );
  }
}
