import * as PostActions from '../../store/actions';

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { errorSelector, isLoadingSelector, postsSelector } from '../../store/selectors';

import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/app-state.interface';
import { PostInterface } from '../../types/post.interface';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
    public isLoading$: Observable<boolean>;
    public error$: Observable<string | null>;
    public posts$: Observable<PostInterface[]>;

    constructor(private readonly store: Store<AppStateInterface>) {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        this.posts$ = this.store.pipe(select(postsSelector));
    }

    public ngOnInit(): void {
        this.store.dispatch(PostActions.getPosts());
    }
}
