/* https://github.com/sammdec/punkapi is 100% JavaScript which means there is no native support for typescript
// so I used a concrete response to generate types with https://app.quicktype.io/
// In addition, I'm also assumming that all fields could be null based on a few manual tests
*/
export interface Beer {
  id?: number | null;
  name: string | null;
  tagline?: string | null;
  firstBrewed: string | null;
  description: string | null;
  imageURL: string | null;
  abv?: number | null;
  ibu?: number | null;
  targetFg?: number | null;
  targetOg?: number | null;
  ebc?: number | null;
  srm?: number | null;
  ph?: number | null;
  attenuationLevel?: number | null;
  volume?: BoilVolume | null;
  boilVolume?: BoilVolume | null;
  method?: Method | null;
  ingredients?: Ingredients | null;
  foodPairing?: string[] | null;
  brewersTips?: string | null;
  contributedBy?: string | null;
}

export interface BoilVolume {
  value: number | null;
  unit: string | null;
}

export interface Ingredients {
  malt: Malt[] | null;
  hops: Hop[] | null;
  yeast: string | null;
}

export interface Hop {
  name: string | null;
  amount: BoilVolume | null;
  add: string | null;
  attribute: string | null;
}

export interface Malt {
  name: string | null;
  amount: BoilVolume | null;
}

export interface Method {
  mashTemp: MashTemp[] | null;
  fermentation: Fermentation | null;
  twist: null | null;
}

export interface Fermentation {
  temp: BoilVolume | null;
}

export interface MashTemp {
  temp: BoilVolume | null;
  duration: number | null | null;
}
