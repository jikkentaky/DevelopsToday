'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styles from './Filters.module.scss';

interface FiltersProps {
  ingredients: string[];
  categories: string[];
  countries: string[];
}

export default function Filters({ ingredients, categories, countries }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [selectedIngredient, setSelectedIngredient] = useState<string>(
    searchParams.get('ingredient') || ''
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || ''
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    searchParams.get('country') || ''
  );
  
  const [activeFilter, setActiveFilter] = useState<'ingredient' | 'category' | 'country' | null>(null);
  
  useEffect(() => {
    if (searchParams.get('ingredient')) {
      setActiveFilter('ingredient');
    } else if (searchParams.get('category')) {
      setActiveFilter('category');
    } else if (searchParams.get('country')) {
      setActiveFilter('country');
    } else {
      setActiveFilter(null);
    }
  }, [searchParams]);
  
  const updateSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.delete('ingredient');
    params.delete('category');
    params.delete('country');
    
    if (value) {
      params.set(name, value);
    }
    
    return params.toString();
  };
  
  const handleIngredientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedIngredient(value);
    setSelectedCategory('');
    setSelectedCountry('');
    setActiveFilter(value ? 'ingredient' : null);
    
    const queryString = updateSearchParams('ingredient', value);
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setSelectedIngredient('');
    setSelectedCountry('');
    setActiveFilter(value ? 'category' : null);
    
    const queryString = updateSearchParams('category', value);
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };
  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCountry(value);
    setSelectedIngredient('');
    setSelectedCategory('');
    setActiveFilter(value ? 'country' : null);
    
    const queryString = updateSearchParams('country', value);
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };
  
  const handleReset = () => {
    setSelectedIngredient('');
    setSelectedCategory('');
    setSelectedCountry('');
    setActiveFilter(null);
    router.push(pathname);
  };
  
  const getFilterGroupClass = (filterType: 'ingredient' | 'category' | 'country') => {
    if (!activeFilter) return styles.filterGroup;
    return activeFilter === filterType ? styles.filterGroup : styles.filterGroupInactive;
  };
  
  return (
    <div className={styles.filters}>
      <h2>Фильтры</h2>
      <p className={styles.filterInfo}>
        Выберите один тип фильтра. Активация одного типа деактивирует остальные.
      </p>
      
      <div className={getFilterGroupClass('ingredient')}>
        <label htmlFor="ingredient">Ингредиент</label>
        <select
          id="ingredient"
          value={selectedIngredient}
          onChange={handleIngredientChange}
          className={styles.select}
          disabled={activeFilter !== null && activeFilter !== 'ingredient'}
        >
          <option value="">Выберите ингредиент</option>
          {ingredients.map((ingredient) => (
            <option key={ingredient} value={ingredient}>
              {ingredient}
            </option>
          ))}
        </select>
      </div>
      
      <div className={getFilterGroupClass('category')}>
        <label htmlFor="category">Категория</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={styles.select}
          disabled={activeFilter !== null && activeFilter !== 'category'}
        >
          <option value="">Выберите категорию</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className={getFilterGroupClass('country')}>
        <label htmlFor="country">Страна</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className={styles.select}
          disabled={activeFilter !== null && activeFilter !== 'country'}
        >
          <option value="">Выберите страну</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      
      <button 
        onClick={handleReset} 
        className={styles.resetButton}
        disabled={!activeFilter}
      >
        Сбросить фильтры
      </button>
    </div>
  );
} 