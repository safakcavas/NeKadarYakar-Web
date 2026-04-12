export type { Car } from './types';

export { fiatCars } from './fiat';
export { renaultCars } from './renault';
export { toyotaCars } from './toyota';
export { volkswagenCars } from './volkswagen';
export { fordCars } from './ford';
export { hondaCars } from './honda';
export { hyundaiCars } from './hyundai';
export { peugeotCars } from './peugeot';
export { opelCars } from './opel';
export { daciaCars } from './dacia';
export { nissanCars } from './nissan';
export { skodaCars } from './skoda';
export { seatCars } from './seat';
export { kiaCars } from './kia';
export { audiCars } from './audi';

import { fiatCars } from './fiat';
import { renaultCars } from './renault';
import { toyotaCars } from './toyota';
import { volkswagenCars } from './volkswagen';
import { fordCars } from './ford';
import { hondaCars } from './honda';
import { hyundaiCars } from './hyundai';
import { peugeotCars } from './peugeot';
import { opelCars } from './opel';
import { daciaCars } from './dacia';
import { nissanCars } from './nissan';
import { skodaCars } from './skoda';
import { seatCars } from './seat';
import { kiaCars } from './kia';
import { audiCars } from './audi';

export const allCars = [
  ...fiatCars,
  ...renaultCars,
  ...toyotaCars,
  ...volkswagenCars,
  ...fordCars,
  ...hondaCars,
  ...hyundaiCars,
  ...peugeotCars,
  ...opelCars,
  ...daciaCars,
  ...nissanCars,
  ...skodaCars,
  ...seatCars,
  ...kiaCars,
  ...audiCars,
];
