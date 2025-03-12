import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './RecipeCard.module.scss';

interface RecipeCardProps {
  id: string;
  name: string;
  image: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, name, image }) => {
  return (
    <Link href={`/recipe/${id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
      </div>
    </Link>
  );
};

export default RecipeCard; 