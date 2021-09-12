/* https://github.com/sammdec/punkapi is 100% JavaScript which means there is no native support for typescript
// so I used a concrete response to generate types with https://app.quicktype.io/
// In addition, I'm also assumming that all fields could be null based on a few manual tests
*/
export interface Beer {
  id?: number | null;
  name: string | null;
  tagline?: string | null;
  first_brewed: string | null;
  description: string | null;
  image_url: string | null;
  abv?: number | null;
  ibu?: number | null;
  target_fg?: number | null;
  target_og?: number | null;
  ebc?: number | null;
  srm?: number | null;
  ph?: number | null;
  attenuation_level?: number | null;
  volume?: BoilVolume | null;
  boil_volume?: BoilVolume | null;
  method?: Method | null;
  ingredients?: Ingredients | null;
  food_pairing?: string[] | null;
  brewers_tips?: string | null;
  contributed_by?: string | null;
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
  mash_temp: MashTemp[] | null;
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
