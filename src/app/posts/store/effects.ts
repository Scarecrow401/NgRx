import * as PostActions from './actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Injectable()
export class PostsEffects {
    public getPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PostActions.getPosts),
            mergeMap(() =>
                this.postsService.getPosts().pipe(
                    map((posts) => PostActions.getPostsSuccess({ posts })),
                    catchError((error) => of(PostActions.getPostsFailure({ error: error.message })))
                )
            )
        )
    );

    constructor(private readonly actions$: Actions, private readonly postsService: PostsService) {}
}
