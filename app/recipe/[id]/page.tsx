import Link from 'next/link';
import styles from './page.module.scss';
import { getRecipeById } from '@/actions/actions';
import Image from 'next/image';

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return (
      <div className={styles.container}>
        <h1>Рецепт не найден</h1>
        <p>К сожалению, мы не смогли найти рецепт, который вы искали.</p>
        <Link href="/" className="btn">
          На главную
        </Link>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof typeof recipe];
    const measure = recipe[`strMeasure${i}` as keyof typeof recipe];

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient,
        measure: measure || '',
      });
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        &larr; Назад к рецептам
      </Link>

      <div className={styles.recipeDetail}>
        <div className={styles.imageContainer}>
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            width={500}
            height={500}
          />
        </div>

        <div className={styles.content}>
          <h1>{recipe.strMeal}</h1>

          <div className={styles.meta}>
            <Link
              href={`/?category=${recipe.strCategory}`}
              className={styles.tag}
            >
              {recipe.strCategory}
            </Link>
            <Link href={`/?country=${recipe.strArea}`} className={styles.tag}>
              {recipe.strArea}
            </Link>
          </div>

          <div className={styles.ingredients}>
            <h2>Ингредиенты</h2>
            <ul>
              {ingredients.map((item, index) => (
                <li key={item.ingredient + index}>
                  <Link
                    href={`/?ingredient=${item.ingredient}`}
                    className={styles.ingredientLink}
                  >
                    {item.ingredient}
                  </Link>
                  {item.measure && (
                    <span className={styles.measure}> - {item.measure}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.instructions}>
            <h2>Инструкции</h2>
            <p>{recipe.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
