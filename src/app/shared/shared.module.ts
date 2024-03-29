import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './loader/loader.component';
import { PageComponentsModule } from './page-components/page-components.module';
import { TableComponent } from './table/table.component';
import { MasterTableComponent } from './master-table/master-table.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ReplacePipe } from './pipes/replace.pipe';
import { MaskPipe } from './pipes/mask.pipe';
import { PadzeroPipe } from './pipes/padzero.pipe';
import { NgxImageCompressService } from 'ngx-image-compress';
import { GridSearchBoxComponent } from './grid-search-box/grid-search-box.component';
import { TextSectionComponent } from '@app/core/authentication/text-section/text-section.component';
import { PasswordDirective } from '@app/shared/directives/show-hide-password/password.directive';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    PageComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxTrimDirectiveModule
  ],
  declarations: [
    LoaderComponent,
    TableComponent,
    MasterTableComponent,
    PaginationComponent,
    TruncatePipe,
    ReplacePipe,
    MaskPipe,
    PadzeroPipe,
    CustomDatePipe,
    GridSearchBoxComponent,
    TextSectionComponent,
    PasswordDirective
  ],
  providers: [NgxImageCompressService, DatePipe],
  exports: [
    LoaderComponent,
    TruncatePipe,
    ReplacePipe,
    MaskPipe,
    PadzeroPipe,
    CustomDatePipe,
    PageComponentsModule,
    FlexLayoutModule,
    MaterialModule,
    TableComponent,
    MasterTableComponent,
    PaginationComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    GridSearchBoxComponent,
    TextSectionComponent,
    PasswordDirective
  ]
})
export class SharedModule {}
