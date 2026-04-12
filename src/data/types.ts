export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  engine: string;
  fuel: 'Benzin' | 'Dizel' | 'Hibrit' | 'LPG' | 'Elektrik';
  consumption: number;
}
