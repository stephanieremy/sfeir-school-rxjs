import {
  readInputFile,
  getRequiredFuelForMass,
  accumulateFuelForMass, 
} from '../lib';
import { pipe } from 'ramda';
import {
  Sequence,
  map,
  filter,
  flatMap,
  reduce
} from '../lib/sequence';
import { race } from 'rxjs';

export  function sequenceFrom<T>(gen: () => Iterable<T>
): Sequence<T> {
  return iter => {
    for (const i of gen()) {
      iter(i)
    }
  };
}

export  function getModuleMasses(
  filename: string
): Sequence<number> {
  const nbrs = sequenceFrom( () => readInputFile(filename).split('\n'));

  return pipe(
    map((m: string) => parseInt(m, 10)),
    filter(x => !isNaN(x))
  )(nbrs);
}

export  function getRequiredFuel(
  masses: Sequence<number>
): number {

 return pipe (
   map(getRequiredFuelForMass),
   filter(n => n > 0),
   reduce((a,b) => a + b)
 )(masses);

}

export  function getTotalRequiredFuel(
  masses: Sequence<number>
): number {

 //const tot = flatMap((m : number)=> sequenceFrom(() => accumulateFuelForMass(m)));
  //return pipe (
  //  reduce((a : number ,b : number ) => a + b)
  //)(tot);

  return pipe (
    flatMap((n: number) => sequenceFrom( () => accumulateFuelForMass(n))),
    reduce((a,b) => a + b)
  )(masses);
}
