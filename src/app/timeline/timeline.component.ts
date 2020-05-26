import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';

let post_response = [
  {
    id: 'f8c1424e-1359-4462-8693-37d281550948',
    post: {
      text: 'new Post 3',
      media_url: '',
      media_type: ''
    },
    posted_by: {
      avatar: '/uploads/documents/diwali-sample1.jpg',
      user_id: '09421252-2e38-434d-9d39-3cdd8ce69be4',
      name: 'play play1',
      type: 'professional',
      position: 'Right Midfielder'
    },
    is_liked: true,
    likes: 2,
    comments: 12,
    created_at: '2020-05-25T14:46:52.833Z'
  },
  {
    id: 'f6ae1a31-129c-4259-a84c-c307d432a352',
    post: {
      text: 'new Post2',
      media_url: '',
      media_type: ''
    },
    posted_by: {
      avatar: '/uploads/documents/diwali-sample1.jpg',
      user_id: '09421252-2e38-434d-9d39-3cdd8ce69be4',
      name: 'play play1',
      type: 'professional',
      position: 'Right Midfielder'
    },
    is_liked: false,
    likes: 0,
    comments: 8,
    created_at: '2020-05-25T08:10:35.330Z'
  },
  {
    id: '1f9d1681-d77d-4362-b36a-ef95d96eb584',
    post: {
      text: 'new post1',
      media_url: '',
      media_type: ''
    },
    posted_by: {
      avatar: '/uploads/documents/diwali-sample1.jpg',
      user_id: '09421252-2e38-434d-9d39-3cdd8ce69be4',
      name: 'play play1',
      type: 'professional',
      position: 'Right Midfielder'
    },
    is_liked: true,
    likes: 1,
    comments: 2,
    created_at: '2020-05-25T08:02:28.703Z'
  }
];
interface PostContext {
  id: string;
  post: {
    text: string;
    media_url: string;
    media_type: string;
  };
  posted_by: {
    avatar: string;
    user_id: string;
    name: string;
    type: string;
    position: string;
  };
  is_liked: boolean;
  likes: number;
  comments: number;
  created_at: string;
  show_comment_box?: boolean;
  postDate?: any;
  dateDiff?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  commentListing?: CommentContext[];
  commentForm?: FormGroup;
  commentPageNo?: number;
  commentPageSize?: number;
  addComment$?: Observable<any>;
  like$?: Observable<any>;
}

interface CommentContext {
  comment: string;
  commented_by: {
    avatar: string;
    user_id: string;
    name: string;
    type: string;
    position: string;
  };
  commented_at: string;
  postDate?: any;
  dateDiff?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {
  environment = environment;
  postListing: any[] = [];
  pageNo: number = 1;
  pageSize: number = 5;
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

  player_type: string;
  member_type: string;

  // addComment$: Observable<any>;
  // like$: Observable<any>;

  avatar_url: string = '';
  userId: string = '';

  constructor(
    public dialog: MatDialog,
    private _timelineService: TimelineService,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnDestroy() {}

  getMemberType(value: string) {
    this.member_type = value;
  }

  getPlayerType(value: string) {
    this.player_type = value;
  }

  createCommentForm(post: PostContext) {
    post.commentForm = this._formBuilder.group({
      comment: [
        '',
        [
          Validators.maxLength(60),
          Validators.pattern(/^[A-Za-z0-9\(\)\-\&\!\%\* ]+$/)
        ]
      ]
    });
  }

  addComment(post: PostContext) {
    post.addComment$ = this._timelineService
      .addComment({
        post_id: post.id,
        ...post.commentForm.value
      })
      .pipe(
        map(resp => {
          post.commentForm.reset();
          post.comments++;
          this.getCommentListing(post, false);
        }),
        catchError(err => {
          this._toastrService.error('Error', err.error.message);
          throw err;
        }),
        untilDestroyed(this)
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PostPopupComponent, {
      width: '40%',
      panelClass: 'postpopup'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getPostListing();
      }
    });
  }

  ngOnInit() {
    this.getPostListing();
    this.userId = localStorage.getItem('user_id');
    this.avatar_url = localStorage.getItem('avatar_url');
  }

  getCommentListing(post: PostContext, shouldLoad?: boolean) {
    this._timelineService
      .getCommentListing({
        page_no: post.commentPageNo,
        page_size: post.commentPageSize,
        post_id: post.id
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let dateNow: any = new Date(Date.now());
          let comments: CommentContext[] = response.data.records;
          comments.forEach(comment => {
            comment.postDate = new Date(comment.commented_at);
            comment.dateDiff = Math.abs(dateNow - comment.postDate) / 1000;
            comment.days = Math.floor(comment.dateDiff / 86400);
            comment.hours = Math.floor(comment.dateDiff / 3600) % 24;
            comment.minutes = Math.floor(comment.dateDiff / 60) % 60;
            comment.seconds = comment.dateDiff % 60;
            comment.seconds = parseInt(comment.seconds.toString());
            if (comment.commented_by.avatar) {
              comment.commented_by.avatar =
                environment.mediaUrl + comment.commented_by.avatar;
            }
          });
          if (!shouldLoad) {
            post.commentListing = comments;
          } else {
            post.commentListing.reverse();
            comments.forEach(comment => {
              if (!post.commentListing.includes(comment)) {
                post.commentListing.push(comment);
              }
            });
          }
          post.commentListing.reverse();
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  toggleLike(post: PostContext) {
    if (post.is_liked) {
      post.like$ = this._timelineService.unlikePost({ post_id: post.id }).pipe(
        map(resp => {
          post.is_liked = false;
          post.likes--;
        }),
        catchError(err => {
          this._toastrService.error('Error', err.error.message);
          throw err;
        }),
        untilDestroyed(this)
      );
    } else {
      post.like$ = this._timelineService.likePost({ post_id: post.id }).pipe(
        map(resp => {
          post.is_liked = true;
          post.likes++;
        }),
        catchError(err => {
          this._toastrService.error('Error', err.error.message);
          throw err;
        }),
        untilDestroyed(this)
      );
    }
  }

  getPostListing(scrolled?: string) {
    if (!scrolled) {
      this.pageNo = 1;
    }
    this._timelineService
      .getPostListing({ page_no: this.pageNo, page_size: this.pageSize })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let dateNow: any = new Date(Date.now());
          // let posts: PostContext[] = response.data.records;
          let posts: PostContext[] = post_response;
          posts.forEach(post => {
            post.postDate = new Date(post.created_at);
            post.dateDiff = Math.abs(dateNow - post.postDate) / 1000;
            post.days = Math.floor(post.dateDiff / 86400);
            post.hours = Math.floor(post.dateDiff / 3600) % 24;
            post.minutes = Math.floor(post.dateDiff / 60) % 60;
            post.seconds = post.dateDiff % 60;
            post.seconds = parseInt(post.seconds.toString());
            if (post.posted_by.avatar) {
              post.posted_by.avatar =
                environment.mediaUrl + post.posted_by.avatar;
            }
            if (post.post.media_url) {
              post.post.media_url = environment.mediaUrl + post.post.media_url;
            }
            post.commentPageNo = 1;
            post.commentPageSize = 3;
            this.getCommentListing(post, false);
            let commentForm: FormGroup;
            post.commentForm = commentForm;
            this.createCommentForm(post);
          });
          if (!scrolled) {
            this.postListing = posts;
          } else {
            posts.forEach(post => {
              if (!this.postListing.includes(post)) {
                this.postListing.push(post);
              }
            });
          }
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  editPost(post: any) {
    const dialogRef = this.dialog.open(PostPopupComponent, {
      width: '40%',
      panelClass: 'postpopup',
      data: post
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getPostListing();
      }
    });
  }

  deletePost(post_id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Delete Post',
        message: 'Are you sure you want to delete this post?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._timelineService
          .deletePost(post_id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                `Success`,
                'Post deleted successfully'
              );
              this.getPostListing();
            },
            error => {
              this._toastrService.error(
                `${error.error.message}`,
                'Delete Post'
              );
            }
          );
      }
    });
  }

  loadComments(post: PostContext) {
    if (post.comments === post.commentListing.length) return;
    post.commentPageNo++;
    this.getCommentListing(post, true);
  }

  onScrollDown() {
    console.log('Scrolled Down');
    this.pageNo++;
    this.getPostListing('scrolled');
  }

  onScrollUp() {
    console.log('Scrolled Up');
  }
}
