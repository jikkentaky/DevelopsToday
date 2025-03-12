import React from 'react';
import RecipeCard from '@/components/RecipeCard';
import styles from './RecipeList.module.scss';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface RecipeListProps {
  recipes: Recipe[];
  title: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, title }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.noResults}>No recipes found.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            id={recipe.idMeal}
            name={recipe.strMeal}
            image={recipe.strMealThumb}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList; 