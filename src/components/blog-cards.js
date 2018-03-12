/* eslint-disable */
import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import styled, { css } from 'react-emotion';
const _ = require(`lodash`);

const StyledSpan = styled.span`
  font-size: 0.65em;
`;

const excerptStyle = css`
  & :after {
    content: "";
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 70%;
    height: 1.5em;
    background: linear-gradient(to right, rgba(248, 248, 248, 0), rgba(248, 248, 248, 1) 50%);
  }
`;

const BlCard = styled.div`
  position: relative;
  width: 300px;
  height: 440px;
  margin: 16px;
  padding 16px;
  overflow: hidden;
  text-align: left;
  border-style: solid;
  border-width: thin;

  img,
  h4 {
    margin: auto;
  }

  .${excerptStyle} {
    position: relative;
    height: ${props => props.image ? '4.5em' : 'auto' }; // Sets the div to
    overflow: hidden;
  }
`;

const PostImage = ({netlifyImage, images }) => {
  if (netlifyImage) {
    return (
      <Img resolutions={images[netlifyImage].node.resolutions}/>
    )
  }
  return null;
}


const BlogCard = (props) => {
  const { post, images } = props;
  let netlifyImage;
  if (post.frontmatter.imagepath) {
    netlifyImage =  _.findIndex(images, function(o) {return _.includes(o.node.id, post.frontmatter.imagepath)});
  }

  return (
    <div>
      <BlCard image={netlifyImage ? true : false}>
        <Link to={post.fields.slug}>
          <PostImage post={post} netlifyImage={netlifyImage != -1 ? netlifyImage : null} images={images}/>
          <h4>
            {post.frontmatter.title}
          </h4>
          <StyledSpan> Himachal Pradesh, India </StyledSpan>
          <div className={excerptStyle}>
            <span>{post.excerpt}</span>
          </div>
        </Link>
      </BlCard>
    </div>
  );
};

export const trekCardFragment = graphql`
  fragment trekCard on RootQueryType {
    allImageSharp {
      edges {
        node {
          id
          resolutions(width: 268, height: 201, cropFocus: CENTER) {
            ...GatsbyImageSharpResolutions
          }
        }
      }
    }
  }
`;

export default BlogCard;
