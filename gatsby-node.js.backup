const path = require('path');
const parseFilepath = require('parse-filepath');
const slash = require('slash');
const createTrekPages = require('./graphQL/createTrekPages');
const createIndexPage = require('./graphQL/createIndexPage');

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  //We check for fileAbsolutePath to skip contentful nodes only nodes on filesystem.
  let slug;
  if (node.internal.type === 'MarkdownRemark' && node.fileAbsolutePath != null) {
    const fileNode = getNode(node.parent);
    try {
      const parsedFilePath = parseFilepath(fileNode.relativePath);
      if (parsedFilePath !== 'undefined') {
        if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
          slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
        } else if (parsedFilePath.dir === ``) {
          slug = `/${parsedFilePath.name}/`;
        } else {
          slug = `/${parsedFilePath.dir}/`;
        }
        //const slug = `/${parsedFilePath.dir}/`;
        createNodeField({ node, name: 'slug', value: slug });
      }
    } catch(error) {
      console.log("caught an Error!!!", error);
    }
    //Below(above) check is needed for contentful. else it errors.
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  createTrekPages(createPage, graphql);
  createIndexPage(createPage, graphql, "/trek/", "/trek");
  createIndexPage(createPage, graphql, "/expedition/", "/expedition");
};
