///
/// Copyright © 2016-2023 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterTabsComponent } from '@home/components/router-tabs.component';
import { Authority } from '@shared/models/authority.enum';
import { SecurityRoutes, UserTwoFAProvidersResolver } from '@home/pages/security/security-routing.module';
import {
  NotificationUserSettingsResolver,
  NotificationUserSettingsRoutes
} from '@home/pages/notification/settings/notification-settings-routing.modules';
import { ProfileRoutes, UserProfileResolver } from '@home/pages/profile/profile-routing.module';

const routes: Routes = [
  {
    path: 'account',
    component: RouterTabsComponent,
    data: {
      auth: [Authority.SYS_ADMIN, Authority.TENANT_ADMIN, Authority.CUSTOMER_USER],
      breadcrumb: {
        label: 'account.account',
        icon: 'account_circle'
      }
    },
    children: [
      {
        path: '',
        children: [],
        data: {
          auth: [Authority.SYS_ADMIN, Authority.TENANT_ADMIN, Authority.CUSTOMER_USER],
          redirectTo: '/account/profile',
        }
      },
      ...ProfileRoutes,
      ...SecurityRoutes,
      ...NotificationUserSettingsRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    UserProfileResolver,
    UserTwoFAProvidersResolver,
    NotificationUserSettingsResolver
  ]
})
export class AccountRoutingModule { }
