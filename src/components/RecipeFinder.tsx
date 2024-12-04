import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import type { Recipe } from '../types';

const RECIPES: Recipe[] = [
  {
    name: "Classic Gingerbread Cookies",
    ingredients: ["flour", "ginger", "cinnamon", "butter", "molasses"],
    instructions: ["Mix dry ingredients", "Cream butter and sugar", "Combine and bake"],
    dietary: ["vegetarian"],
    type: "cookie"
  },
  {
    name: "Holiday Eggnog",
    ingredients: ["milk", "cream", "eggs", "sugar", "nutmeg"],
    instructions: ["Whisk eggs and sugar", "Heat milk and cream", "Combine and chill"],
    dietary: ["vegetarian"],
    type: "drink"
  }
];

export function RecipeFinder() {
  const [dietary, setDietary] = React.useState<string[]>([]);
  const [type, setType] = React.useState<Recipe['type'] | ''>('');

  const filteredRecipes = RECIPES.filter(recipe => {
    if (dietary.length && !dietary.every(d => recipe.dietary.includes(d))) return false;
    if (type && recipe.type !== type) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <UtensilsCrossed className="w-6 h-6 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-800">Holiday Recipes</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Dietary Preferences</label>
          <div className="space-x-4">
            {['vegetarian', 'vegan', 'gluten-free'].map(pref => (
              <label key={pref} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={dietary.includes(pref)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDietary([...dietary, pref]);
                    } else {
                      setDietary(dietary.filter(d => d !== pref));
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <span className="ml-2">{pref}</span>
              </label>
            ))}
          </div>
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as Recipe['type'])}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">All Types</option>
          <option value="cookie">Cookies</option>
          <option value="cake">Cakes</option>
          <option value="savory">Savory Dishes</option>
          <option value="drink">Drinks</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredRecipes.map(recipe => (
          <div key={recipe.name} className="border p-4 rounded-lg">
            <h3 className="font-bold text-lg">{recipe.name}</h3>
            <p className="text-sm text-gray-600">
              {recipe.dietary.join(', ')} • {recipe.type}
            </p>
            <div className="mt-2">
              <h4 className="font-medium">Ingredients:</h4>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map(ingredient => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}