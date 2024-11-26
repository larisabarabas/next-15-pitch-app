import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
  `*[_type == 'startup' && defined(slug.current)] | order(_createdAt, desc) {
        _id,
        title, 
        description,
        views, 
        _createdAt, 
        slug, 
        author -> {_id, name, username}, 
        image,
        category
      }`
);
