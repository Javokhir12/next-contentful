import { createClient, Entry } from 'contentful';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../models/recipe';

import styles from '../styles/Home.module.css';

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  recipes,
}) => {
  return (
    <div className={styles['recipe-list']}>
      <Head>
        <title>Marmite | Home</title>
        <meta name="description" content="Find cool recipes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe.fields} />
      ))}
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<{
  recipes: Array<Entry<Recipe>>;
}> = async () => {
  const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });

  const response = await contentfulClient.getEntries<Recipe>();

  return {
    props: {
      recipes: response.items ?? [],
    },
  };
};
