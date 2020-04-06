import * as readline from 'readline';

import { Observable, from, pipe } from 'rxjs';
import { map, filter, reduce, flatMap } from 'rxjs/operators';

import {
  openInputFile,
  getRequiredFuelForMass,
  accumulateFuelForMass
} from '../lib';

export function readLines(filename: string ) {
    return new Observable<string>(observer => {
      const fileRead = openInputFile(filename);
      const rl = readline.createInterface(fileRead);
  
      rl.on('line', line => {
        observer.next(line);
      });
  
      rl.on('close', () => {
        observer.complete();
      });
    });
}

export  function getModuleMasses( filename: string) {
  return readLines(filename).pipe(
    map(line => parseInt(line, 10)),
    filter(mass => !isNaN(mass))
  );
}


export  function getRequiredFuel(masses: Observable<number>){
  return masses.pipe(
    map(getRequiredFuelForMass),
   filter(n => n > 0),
   reduce((a: number,b: number) => a + b)
  )
}

export  function getTotalRequiredFuel(masses: Observable<number>) {
  return masses.pipe(
    flatMap(n => from (accumulateFuelForMass(n))),
    reduce((a: number,b : number) => a + b)
  )

}
