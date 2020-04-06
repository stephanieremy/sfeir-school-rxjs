import * as readline from 'readline';

import { openInputFile } from '../lib';

export interface Observer<T> {
  next(val: T): void;
  complete(): void;
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): void;
}

export function makeObservable<T>(subscribe: (observer: Observer<T>) => void): Observable<T> {
  return {
    subscribe,
  }
}

export function readLines(filename: string): Observable<number> {
  return makeObservable<number> (observer =>  {
    const fileStream = openInputFile(filename);
    const rl = readline.createInterface(fileStream); 
  
    rl.on('line', line => {
        const number = parseInt(line, 10);
        observer.next(number);
    });

    rl.on('close', () => {
      observer.complete();
    });
    }
  )
}

export function map<T, U> (fonction: (value: T) => U): (source : Observable<T>) => Observable<U> {
  return source =>  makeObservable(observer => {
    source.subscribe({
      next(value) {
        observer.next(fonction(value));
      },
      complete() {
        observer.complete();
      }
    })
  })
}
