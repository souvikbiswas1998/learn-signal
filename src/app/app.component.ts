import { Component, computed, effect, OnInit, Signal, signal, untracked, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'learn-signal';
  showCount = signal(true);  //default WritableSignal
  count: WritableSignal<number> = signal(0);
  doubleCount: Signal<number> = computed(() => this.count() * 2);
  conditionalCount = computed(() => {
    if (this.showCount()) {
      return `The count is ${this.count()}.`;
    } else {
      return 'Nothing to see here!';
    }
  });

  output: any;

  constructor() {
    this.effect();
  }

  effect() {
    effect((onCleanup) => {
      //this will trigger every time while any signal value got changed
      this.output = this.conditionalCount();
      // console.log(`using effect: doubleCount: ${untracked(this.doubleCount)}`);
      untracked(() => {
        // here this part will execute only if conditionalCount() value got updated
        // alternatively we can use untracked(signal) to do the same which written above
        // in this place we can write the signal(s) which we don't want to get trigger on any other signal value changed
        // ToDo: need to know
        let x = this.doubleCount();
        console.log(`using effect: doubleCount: ${x}`);
      });

      onCleanup(() => {
        window.alert("event cleanup done.\nUpdating the effect.\nClick Ok to see the changes.")
        // onCleanup function lets you register a callback that is invoked before the next run of the effect begins, or when the effect is destroyed.
        // we can put our logic if needed; i.e, it will execute on each effect change
      })
    });
  }

  ngOnInit(): void { }

  showCountBtn() {
    this.showCount.update(value => !value)
  }

  setCountBtn(value: number) {
    // these both are same
    this.count.set(value);
    // this.count.update(data => value);
    console.log(this.doubleCount());

  }
}
