import { Injectable, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';
import posts from '../../public/posts.json'

@Injectable({
  providedIn: 'root'
})
export class RxJSInteropService {
  // Get a `Signal` representing the `postsObservable`'s value.
  postsSub = new BehaviorSubject(posts);
  // posts$ = this.postsSub.asObservable();
  posts: Signal<Object>;
  postsObservable: Observable<Object>;

  constructor() {
    // this.posts$ = http.get('http://localhost:4200/posts.json')
    // toSignal converts both Obserable and BehaviorSubject
    this.posts = toSignal(this.postsSub, { initialValue: [] });
    this.postsObservable = toObservable(this.posts);
  }

  update() {
    this.postsSub.next(posts.slice(0, 10))
  }
}
