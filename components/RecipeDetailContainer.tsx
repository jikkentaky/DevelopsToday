'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FilterTag from '@/components/FilterTag';
import RecipeCard from '@/components/RecipeCard';
import styles from '../recipe/[id]/page.module.scss';
import { 
  getRecipeById, 
  getRelatedRecipes, 
  Recipe,
  RecipeDetail,
  Ingredient
} from '@/actions/actions';

interface RecipeDetailContainerProps {
  recipeId: string;
}

export default function RecipeDetailContainer({
  recipeId,
}: RecipeDetailContainerProps) {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const recipeData = await getRecipeById(recipeId);

        if (recipeData) {
          setRecipe(recipeData);
          setIngredients(extractIngredients(recipeData));

          const related = await getRelatedRecipes(recipeData.strCategory, recipeData.idMeal);
          setRelatedRecipes(related);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [recipeId]);

  if (loading) {
    return <div>Loading recipe details...</div>;
  }

  if (!recipe) {
    return (
      <>
        <h2>Recipe not found</h2>
        <Link href="/" className="btn">
          Back to recipes
        </Link>
      </>
    );
  }

  return (
    <>
      <div className={styles.recipeContent}>
        <div className={styles.mainContent}>
          <div className={styles.imageContainer}>
            <Image
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
              priority
            />
          </div>

          <div className={styles.details}>
            <h1 className={styles.title}>{recipe.strMeal}</h1>

            <div className={styles.meta}>
              <FilterTag
                name={recipe.strArea}
                type="country"
                value={recipe.strArea}
              />
              <FilterTag
                name={recipe.strCategory}
                type="category"
                value={recipe.strCategory}
              />
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Ingredients</h2>
              <ul className={styles.ingredientList}>
                {ingredients.map((ingredient, index) => (
                  <li key={ingredient.name + index} className={styles.ingredientItem}>
                    <FilterTag
                      name={ingredient.name}
                      type="ingredient"
                      value={ingredient.name.replace(/\s+/g, '_')}
                    />
                    <span className={styles.measure}>{ingredient.measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Instructions</h2>
              <div className={styles.instructions}>
                {recipe.strInstructions
                  .split('\r\n')
                  .filter(Boolean)
                  .map((step, index) => (
                    <p key={step + index} className={styles.step}>
                      {step}
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>
            More {recipe.strCategory} Recipes
          </h2>
          <div className={styles.relatedRecipes}>
            {relatedRecipes.length > 0 ? (
              relatedRecipes.map((related) => (
                <RecipeCard
                  key={related.idMeal}
                  id={related.idMeal}
                  name={related.strMeal}
                  image={related.strMealThumb}
                />
              ))
            ) : (
              <p>No related recipes found</p>
            )}
          </div>
        </div>
      </div>

      <Link href="/" className={`${styles.backButton} btn`}>
        Back to All Recipes
      </Link>
    </>
  );
}

export  function extractIngredients(recipe: RecipeDetail): Ingredient[] {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient,
        measure: measure || '',
      });
    }
  }

  return ingredients;
}