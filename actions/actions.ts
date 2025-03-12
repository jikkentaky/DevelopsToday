'use server';

const MEALDB_API_URL = process.env.NEXT_PUBLIC_MEALDB_API_URL;

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface RecipesResponse {
  meals: Recipe[] | null;
}

export interface RecipeDetail extends Recipe {
  strInstructions: string;
  strCategory: string;
  strArea: string;
  [key: string]: string | undefined;
}

export interface RecipeDetailResponse {
  meals: RecipeDetail[] | null;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export async function getRecipes({
  ingredient,
  country,
  category,
}: {
  ingredient?: string;
  country?: string;
  category?: string;
}): Promise<Recipe[]> {
  let url = `${MEALDB_API_URL}/search.php?s=`;

  if (ingredient) {
    url = `${MEALDB_API_URL}/filter.php?i=${ingredient}`;
  } else if (country) {
    url = `${MEALDB_API_URL}/filter.php?a=${country}`;
  } else if (category) {
    url = `${MEALDB_API_URL}/filter.php?c=${category}`;
  }

  try {
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.status}`);
    }

    const data: RecipesResponse = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export async function getRecipeById(id: string): Promise<RecipeDetail | null> {
  try {
    const url = `${MEALDB_API_URL}/lookup.php?i=${id}`;
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Failed to fetch recipe details: ${response.status}`);
    }

    const data: RecipeDetailResponse = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null;
  }
}

export async function getRelatedRecipes(category: string, excludeId?: string): Promise<Recipe[]> {
  try {
    const recipes = await getRecipes({ category });
    
    if (excludeId) {
      return recipes.filter(recipe => recipe.idMeal !== excludeId).slice(0, 4);
    }
    
    return recipes.slice(0, 4);
  } catch (error) {
    console.error('Error fetching related recipes:', error);
    return [];
  }
}

export async function getAllIngredients(): Promise<string[]> {
  try {
    const response = await fetch(`${MEALDB_API_URL}/search.php?s=`, {
      cache: 'no-store',
    });
    const data = await response.json();

    if (!data.meals || !Array.isArray(data.meals)) {
      return [];
    }

    const ingredientSet = new Set<string>();

    data.meals.forEach((recipe: RecipeDetail) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        if (ingredient && ingredient.trim() !== '') {
          ingredientSet.add(ingredient);
        }
      }
    });

    return Array.from(ingredientSet).sort();
  } catch (error) {
    console.error('Error generating ingredients list:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${MEALDB_API_URL}/list.php?c=list`, {
      cache: 'no-store',
    });
    const data = await response.json();

    if (!data.meals || !Array.isArray(data.meals)) {
      return [];
    }

    return data.meals
      .map(({ strCategory }: { strCategory: string }) => strCategory)
      .filter(Boolean);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getAllCountries(): Promise<string[]> {
  try {
    const response = await fetch(`${MEALDB_API_URL}/list.php?a=list`, {
      cache: 'no-store',
    });
    const data = await response.json();

    if (!data.meals || !Array.isArray(data.meals)) {
      return [];
    }

    return data.meals
      .map(({ strArea }: { strArea: string }) => strArea)
      .filter(Boolean);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}
