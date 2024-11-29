import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
  `*[_type == 'startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author ->name match $search] | order(_createdAt, desc) {
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

export const STARTUP_BY_ID_QUERY = defineQuery(
  `*[_type == 'startup' && _id == $id][0]{
  _id,
  title, 
  description,
  views, 
  _createdAt, 
  slug, 
  author -> {_id, name, username,bio, image}, 
  image,
  category,
  pitch
}`
);
