import { NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';

import { AuthMethodType } from '../../../../../../app/core/auth/models/auth.method-type';
import { LogInContainerComponent as BaseComponent } from '../../../../../../app/shared/log-in/container/log-in-container.component';
import { AuthMethodTypeComponent } from '../../../../../../app/shared/log-in/methods/auth-methods.type';
import { UagrmLogInPasswordComponent } from '../methods/password/log-in-password.component';

/** Keep the native injection of authMethodProvider and isStandalonePage. */
@Component({
  selector: 'ds-uagrm-log-in-container',
  templateUrl: '../../../../../../app/shared/log-in/container/log-in-container.component.html',
  styleUrls: ['../../../../../../app/shared/log-in/container/log-in-container.component.scss'],
  imports: [NgComponentOutlet],
})
export class UagrmLogInContainerComponent extends BaseComponent {
  override getAuthMethodContent(): AuthMethodTypeComponent {
    return this.authMethod.authMethodType === AuthMethodType.Password
      ? UagrmLogInPasswordComponent
      : super.getAuthMethodContent();
  }
}
