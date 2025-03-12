'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import RecipeList from '@/components/RecipeList';
import { getRecipes } from '@/actions/actions';
import { Recipe } from '@/actions/actions';
import styles from './RecipeContainer.module.scss';

export default function RecipeContainer() {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('Все рецепты');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError(null);
      
      const params = {
        ingredient: searchParams.get('ingredient') || undefined,
        country: searchParams.get('country') || undefined,
        category: searchParams.get('category') || undefined,
      };
      
      let newTitle = 'Все рецепты';
      if (params.ingredient) {
        newTitle = `Рецепты с ${params.ingredient}`;
      } else if (params.country) {
        newTitle = `${params.country} рецепты`;
      } else if (params.category) {
        newTitle = `${params.category} рецепты`;
      }
      
      setTitle(newTitle);
      
      try {
        const data = await getRecipes(params);
        
        if (data.length === 0 && (params.ingredient || params.country || params.category)) {
          if (params.ingredient) {
            setError(`Не найдено рецептов с ингредиентом "${params.ingredient}"`);
          } else if (params.country) {
            setError(`Не найдено рецептов из страны "${params.country}"`);
          } else if (params.category) {
            setError(`Не найдено рецептов в категории "${params.category}"`);
          }
        }
        
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Произошла ошибка при загрузке рецептов');
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRecipes();
  }, [searchParams]);
  
  if (loading) {
    return <div className={styles.loadingContainer}>Загрузка рецептов...</div>;
  }
  
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          onClick={() => window.location.href = '/'}
          className={styles.backButton}
        >
          Вернуться к списку всех рецептов
        </button>
      </div>
    );
  }
  
  if (recipes.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>Рецепты не найдены</h2>
        <p>Попробуйте изменить параметры фильтрации или вернитесь к общему списку рецептов.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className={styles.backButton}
        >
          Показать все рецепты
        </button>
      </div>
    );
  }
  
  return <RecipeList recipes={recipes} title={title} />;
} 