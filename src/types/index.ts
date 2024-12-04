export type Holiday = 'christmas' | 'hanukkah' | 'kwanzaa' | 'winter-solstice';

export interface GiftSuggestion {
  name: string;
  description: string;
  price: string;
  link: string;
}

export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  dietary: string[];
  type: 'cookie' | 'cake' | 'savory' | 'drink';
}