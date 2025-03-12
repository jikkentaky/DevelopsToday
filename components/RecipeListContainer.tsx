'use client';

import { useState, useEffect } from 'react';
import RecipeList from '@/components/RecipeList';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface RecipesResponse {
  meals: Recipe[] | null;
}

interface RecipeListContainerProps {
  ingredient?: string;
  country?: string;
  category?: string;
}

async function getData(params: {
  ingredient?: string;
  country?: string;
  category?: string;
}) {
  const { ingredient, country, category } = params;

  const baseUrl = '/api/recipes';

  const urlParams = new URLSearchParams();

  if (ingredient) {
    urlParams.append('ingredient', ingredient);
  } else if (country) {
    urlParams.append('country', country);
  } else if (category) {
    urlParams.append('category', category);
  }

  const url = urlParams.toString()
    ? `${baseUrl}?${urlParams.toString()}`
    : baseUrl;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.status}`);
    }

    const data: RecipesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return { meals: [] };
  }
}

export default function RecipeListContainer({
  ingredient,
  country,
  category,
}: RecipeListContainerProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('All Recipes');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      let newTitle = 'All Recipes';
      if (ingredient) {
        newTitle = `Recipes with ${ingredient}`;
      } else if (country) {
        newTitle = `${country} Recipes`;
      } else if (category) {
        newTitle = `${category} Recipes`;
      }
      setTitle(newTitle);

      const params = { ingredient, country, category };
    
      try {
        const data = await getData(params);
        setRecipes(data.meals || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [ingredient, country, category]);

  return (
    <>
      {loading ? (
        <div>Loading recipes...</div>
      ) : (
        <RecipeList recipes={recipes} title={title} />
      )}
    </>
  );
}
