import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { PostPopupComponent } from '@app/timeline/post-popup/post-popup.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { TimelineService } from './timeline.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  environment = environment;
  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    player_type: true
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    dots: false,
    margin: 10,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    }
  };

  likes: number = 0;

  @Input() is_like = false;

  like$: Observable<any>;

  constructor(
    public dialog: MatDialog,
    private _timelineService: TimelineService,
    private _toastrService: ToastrService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PostPopupComponent, {
      width: '40%',
      panelClass: 'postpopup'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnDestroy() {}

  ngOnInit() {}

  toggleLike() {
    if (this.is_like) {
      this.like$ = this._timelineService
        .unlikePost({ post_id: 'ffd98934-c6f5-47a7-912d-68585dc7861f' }) //postId
        .pipe(
          map(resp => {
            this.is_like = false;
            this.likes--;
          }),
          catchError(err => {
            this._toastrService.error('Error', err.error.message);
            throw err;
          }),
          untilDestroyed(this)
        );
    } else {
      this.like$ = this._timelineService
        .likePost({ post_id: 'ffd98934-c6f5-47a7-912d-68585dc7861f' }) //postId
        .pipe(
          map(resp => {
            this.is_like = true;
            this.likes++;
          }),
          catchError(err => {
            this._toastrService.error('Error', err.error.message);
            throw err;
          }),
          untilDestroyed(this)
        );
    }
  }
}
