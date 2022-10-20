import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { createClient, Entry } from 'contentful';
import type { Recipe } from '../../models/recipe';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import styles from '../../styles/Recipe.module.css';

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

function Recipe({ recipe }: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    cookingTime,
    featuredImage: {
      fields: {
        file: {
          details: {
            image: { height, width },
          },
          url,
        },
      },
    },
    ingredients,
    method,
    title,
  } = recipe.fields;

  return (
    <section>
      <div className={styles.banner}>
        <Image src={`https:${url}`} width={width} height={height} alt={title} />
        <h2>{title}</h2>
      </div>
      <div className={styles.info}>
        <p>Takes about {cookingTime} mins to cook</p>
        <h3>Ingredients</h3>

        {ingredients.map((ing) => (
          <span key={ing + title}>{ing}</span>
        ))}
      </div>

      <div className="method">
        <h3>Method</h3>

        <div>{documentToReactComponents(method)}</div>
      </div>
    </section>
  );
}

export default Recipe;

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await contentfulClient.getEntries<Recipe>();

  const paths = response.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ recipe: Entry<Recipe> }> = async (
  context
) => {
  const slug = context.params?.slug as string;

  const response = await contentfulClient.getEntries<Recipe>({
    content_type: 'recipe',
    'fields.slug': slug,
  });

  return {
    props: {
      recipe: response.items[0],
    },
    revalidate: 30,
  };
};
