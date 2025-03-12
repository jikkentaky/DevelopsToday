import { Suspense } from 'react';
import Filters from '@/components/Filters';
import RecipeContainer from '@/components/RecipeContainer';
import styles from './page.module.scss';
import { getAllIngredients, getAllCategories, getAllCountries } from '@/actions/actions';

export default async function Home() {
  const [ingredients, categories, countries] = await Promise.all([
    getAllIngredients(),
    getAllCategories(),
    getAllCountries(),
  ]);
  
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Suspense fallback={<div>Загрузка фильтров...</div>}>
          <Filters 
            ingredients={ingredients.slice(0, 50)}
            categories={categories}
            countries={countries}
          />
        </Suspense>
      </div>
      
      <div className={styles.content}>
        <Suspense fallback={<div>Загрузка рецептов...</div>}>
          <RecipeContainer />
        </Suspense>
      </div>
    </div>
  );
}
