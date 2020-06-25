import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AddEditEmploymentContractComponent } from './add-edit-employment-contract/add-edit-employment-contract.component';
import { ViewEmploymentContractComponent } from './view-employment-contract/view-employment-contract.component';
import { VerificationPopupComponent } from '@app/admin/verification-popup/verification-popup.component';
@NgModule({
  declarations: [
    ProfileComponent,
    ViewProfileComponent,
    EditProfileComponent,
    AddEditEmploymentContractComponent,
    ViewEmploymentContractComponent,
    VerificationPopupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ],
  entryComponents: [VerificationPopupComponent]
})
export class ProfileModule {}
