import { Document } from '@contentful/rich-text-types';

export type ImageField = {
  fields: {
    file: {
      url: string;
      details: { image: { width: number; height: number } };
    };
  };
};

export type Recipe = {
  cookingTime: number;
  featuredImage: ImageField;
  ingredients: string[];
  method: Document;
  slug: string;
  thumbnail: ImageField;
  title: string;
};
