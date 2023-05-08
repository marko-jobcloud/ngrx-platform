import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentStore, INITIAL_STATE_TOKEN } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { counterFeature, counterPageActions } from './counter.state';

@Component({
  selector: 'ngrx-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Welcome {{ title }}</h1>

    <a routerLink="/feature">Load Feature</a>

    <router-outlet></router-outlet>
  `,
  providers: [
    ComponentStore,
    { provide: INITIAL_STATE_TOKEN, useValue: { test1: 10, test2: 20 } },
  ],
})
export class AppComponent {
  title = 'ngrx-standalone-app';
  readonly cs: ComponentStore<{ test1: number; test2: number }> = inject(
    ComponentStore<{ test1: number; test2: number }>
  );
  readonly test1 = this.cs.selectSignal((s) => s.test1);
  readonly test2 = this.cs.selectSignal((s) => s.test2);

  readonly store = inject(Store);
  readonly count1 = this.store.selectSignal(counterFeature.selectCount1);
  readonly count2 = this.store.selectSignal(counterFeature.selectCount2);

  constructor() {
    effect(() =>
      console.log(
        'test 1 (component store) - should be logged only once',
        this.test1()
      )
    );

    effect(() =>
      console.log(
        'test 2 (component store) - should be logged every second',
        this.test2()
      )
    );

    effect(() =>
      console.log(
        'count 1 (global store) - should be logged only once',
        this.count1()
      )
    );
    effect(() =>
      console.log(
        'count 2 (global store) - should be logged every second',
        this.count2()
      )
    );

    setInterval(() => {
      this.cs.patchState(({ test2 }) => ({ test2: test2 + 1 }));

      this.store.dispatch(counterPageActions.incrementCount2());
    }, 1000);
  }
}
