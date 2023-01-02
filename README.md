# Barefoot Chef Blog revamp in Next.js and GraphQL

## Overview

This is a revamp of my personal recipe blog site. I have run this site for many years using youtube and wordpress and have just revamped it to use GraphQL and Next.js.

### Features

- **Create Blogs** - User is able to create blog posts using markdown on [the Hygraph site](https://hygraph.com/) that are added to the site. 
- **Post Comments** - Users are able to post comments on the site that are reviewed by the owner before being displayed.
- **Featured Posts** - Featured Posts are displayed in a carousel on the top of the site
- **Categories** - Allow users to search posts by category.  
- **Responsive** - Site is fully responsive.  

### Links

- Live Site URL: [Deployed on Vercel](https://barefootrecipe.vercel.app/)

## My process

### Built with
- [Next.JS](https://nextjs.org/) - React Framework
- [GraphQL](https://hygraph.com/) - Headless content management system that is completely GraphQL native
- Javascript
- Semantic HTML5 markup
- Tailwind CSS
- Media queries


### What I learned

- **GraphQL Queries**
  How to write GraphQL queries to fetch data from a CMS.
  
``` bash
  export const getPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.postsConnection.edges;
};
```

- **Typescript**
  How to use interfaces to define more complex data type objects.
```bash
export interface Posts {
  posts: {
    node: {
      title: string
      excerpt: string
      featuredImage: {url: string}
      slug: string
      createdAt: string
      author: {name: string; photo: {url: string}}
    }
      }[]
}
```
