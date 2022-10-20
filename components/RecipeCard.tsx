import Image from 'next/image';
import Link from 'next/link';
import type { Recipe } from '../models/recipe';

import styles from '../styles/RecipeCard.module.css';

export type RecipeCardProps = {
  recipe: Recipe;
};

function RecipeCard({ recipe }: RecipeCardProps) {
  const {
    cookingTime,
    slug,
    title,
    thumbnail: {
      fields: {
        file: {
          url,
          details: {
            image: { height, width },
          },
        },
      },
    },
  } = recipe;

  return (
    <article className={styles.card}>
      <div className={styles.featured}>
        <Image src={`https:${url}`} width={width} height={height} alt={title} />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <h4>{title}</h4>
          <p>Takes approx {cookingTime} mins to make</p>
        </div>
        <div className={styles.actions}>
          <Link href={`/recipes/${slug}`}>Read more</Link>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
