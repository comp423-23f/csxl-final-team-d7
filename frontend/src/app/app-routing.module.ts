import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppTitleStrategy } from './app-title.strategy';
import { GateComponent } from './gate/gate.component';
import { HomeComponent } from './home/home.component';
import { ProfileEditorComponent } from './profile/profile-editor/profile-editor.component';
import { CoworkingPageComponent } from './coworking/coworking-home/coworking-home.component';
import { AmbassadorPageComponent } from './coworking/ambassador-home/ambassador-home.component';
import { AboutComponent } from './about/about.component';
import { GroupcheckinComponent } from './groupcheckin/groupcheckin.component';
import { MakeReservationComponent } from './coworking/make-reservation/make-reservation.component';
import { GroupListComponent } from './checkin-reservation/checkin-reservation.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  HomeComponent.Route,
  AboutComponent.Route,
  ProfileEditorComponent.Route,
  GateComponent.Route,
  CoworkingPageComponent.Route,
  AmbassadorPageComponent.Route,
  GroupcheckinComponent.Route,
  MakeReservationComponent.Route,
  GroupListComponent.Route,
  { path: '', component: MakeReservationComponent },
  {
    path: 'confirmation/:groupId/:formattedTimeRange',
    component: ConfirmationComponent
  },
  {
    path: 'coworking',
    title: 'Cowork in the XL',
    loadChildren: () =>
      import('./coworking/coworking.module').then((m) => m.CoworkingModule)
  },
  {
    path: 'make-reservation/:currentTime',
    component: MakeReservationComponent
  },
  {
    path: 'admin',
    title: 'Admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'organizations',
    title: 'CS Organizations',
    loadChildren: () =>
      import('./organization/organization.module').then(
        (m) => m.OrganizationModule
      )
  },
  {
    path: 'events',
    title: 'Experimental',
    loadChildren: () =>
      import('./event/event.module').then((m) => m.EventModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule],
  providers: [AppTitleStrategy.Provider]
})
export class AppRoutingModule {}
