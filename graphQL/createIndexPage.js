const path = require('path');
const slash = require('slash');

const createIndexPage = (createPage, graphql, pageType, pagePath) => {
  return new Promise((resolve, reject) => {

    const trekIndexTemplate = path.resolve(
      `src/templates/trek-index.js`
    );
    resolve(
      graphql(
        ` query IndexPages($indexPage : String!) 
          {
            allMarkdownRemark(filter: {fields: {slug: { regex: $indexPage }}}) {
              edges {
                node {
                  id
                  excerpt(pruneLength: 200)
                  timeToRead
                  frontmatter {
                    title
                    imgdesc
                    imagepath
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `,
        { indexPage: pageType }
      ).then(result => {
        if (result.error) {
          return Promise.reject(result.errors)
        }

        if (result.data.allMarkdownRemark != null) {
          const posts = result.data.allMarkdownRemark.edges;

            createPage({
              path: pagePath,
              component: slash(trekIndexTemplate),
              context: {
                data: result.data
              }
            });
        }
      })
   );
  });
}

module.exports = createIndexPage;
