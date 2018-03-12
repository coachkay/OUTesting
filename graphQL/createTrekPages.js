const path = require('path');
const slash = require('slash');

const createTrekPages = (createPage, graphql) => {
  return new Promise((resolve, reject) => {

    const blogPostTemplate = path.resolve(
      'src/templates/trek-template.js'
    );
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(filter: {fields: {slug: {regex: "/trek|expedition/" }}}) {
              edges {
                node {
                  id
                  excerpt(pruneLength: 200)
                  timeToRead
                  frontmatter {
                    title
                    imgdesc
                    trekid
                    imagepath
                  }
                  fields {
                    slug
                  }
                }
              }
                   }
          }
        `
      ).then(result => {
        if (result.error) {
          return Promise.reject(result.errors)
        }

        if (result.data.allMarkdownRemark != null) {
          const posts = result.data.allMarkdownRemark.edges;

          posts.forEach((post, index) => {

            const prev = index === 0 ? false : posts[index - 1].node;
            const next = index === posts.length - 1 ? false : posts[index + 1].node;

            let imageregex = null;
            if (post.node.frontmatter.imagepath) {
               imageregex = post.node.frontmatter.imagepath.replace(/^.*(\\|\/|\:)/, '');
            }
            createPage({
              path: `${post.node.fields.slug}`,
              component: slash(blogPostTemplate),
              context: {
                slug: `${post.node.fields.slug}`,
                prev: prev,
                next: next,
                imageregex: `/${imageregex}/`,
                trekid: `${post.node.frontmatter.trekid}`
              }
            });
          });
        }
      })
   );
  });
}

module.exports = createTrekPages;
