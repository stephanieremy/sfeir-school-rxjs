import {
  readInputFile,
  getRequiredFuelForMass,
  accumulateFuelForMass
} from '../lib';

export function getModuleMasses(filename: string) {
  return readInputFile(filename).split('\n')
                                .map(n => parseInt(n, 10))
                                .filter(n => !isNaN(n));
}

export function getRequiredFuel(masses: number[]) {
  return masses.map(getRequiredFuelForMass)
                .filter(n => n > 0)
                .reduce((accumulator, value) => accumulator + value, 0);
}

export function getTotalRequiredFuel( masses: number[]) {
  return masses.flatMap(n => [...accumulateFuelForMass(n)])
               .reduce((accumulator, n) => accumulator + n);
}
