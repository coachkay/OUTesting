/* eslint-disable no-undef, react/prop-types, react/no-danger */
import React from 'react'
import styled, { css } from 'react-emotion'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import _ from 'lodash'
import SftrekData from '../components/sftrek'
import SfPackageData from '../components/sfpackage'
import colors from '../utils/colors'

const Box = styled.div`
  position: relative;
  overflow: hidden;
  text-align: center;
  margin: 3.5rem auto 3.5rem auto;
`;

const blogTheme = css`
  max-width: 900px;
  margin: 4.5rem auto 4.5rem auto;
  a {
    text-decoration: underline;
    text-decoration-skip: ink;
  }
`;

const svgStyles = css`
  opacity: 0.5;
  transition: opacity 0.15s ease-in;
  &:hover {
    text-decoration: none;
    box-shadow: none;
    opacity: 1;
    transition: opacity 0.15s ease-in;
  }
`;

const Tag = styled.h3`
  overflow: hidden;
  text-align: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: white;
  background-color: ${colors.mountain1};
  ...props.style
`;

const FlexTagBox = ({ children }) => (
  <div css={`
         display: flex;
         justifyContent: center;
         flex-wrap: wrap;
    `}
  >
      { children }
  </div>
)

const Styledp = styled.p`
  margin: auto;
  font-size: 0.8em;
`;

const Template = ({ data, pathContext }) => {
  const {
    markdownRemark: post,
    treksWithTag: trek,
    allGuideDepartures,
  } = data;
  const { next, prev, slug } = pathContext;
  const { frontmatter } = post;
  const edges = allGuideDepartures ? allGuideDepartures.edges : null;

  let departureDates = '';
  if (edges != null && edges.length > 0) {
    edges.map(pkg => {
      if (pkg.node.departure && pkg.node.departure.length > 0) {
        departureDates = pkg.node.departure.toString()
      }
    })
    departureDates = (departureDates != '') ? `Departures for ${frontmatter.title} - ${departureDates}` : ''
  }

  let pageDesc = (departureDates != '') ? departureDates : post.excerpt


  if (data.imageSharp == null) {
    console.log("Could not set OG Image for trek, replace image ...   ", pathContext.slug);
  }
  let keywords = 'treks, expeditions, garhwal, uttarakhand, himalayas';
  return (

    <div>
      <div className={blogTheme}>
        <Box css="margin: auto 16px auto 16px;">
          <Helmet>
            <title> {frontmatter.title} | Hampta Treks </title>
            <meta name="description" content={pageDesc} />
            <meta name="Keywords" content={keywords} />
            { trek && <link rel="canonical" href={`https://sherpafeet.com/${pathContext.trekid}/trek`} /> }
            <meta property="og:url" content={`https://hampta.com${slug}`} />
            <meta property="og:title" content={frontmatter.title} />
            <meta
              property="og:description"
              content={pageDesc}
            />
            <meta
              name="twitter:description"
              content={pageDesc}
            />
            {data.imageSharp && data.imageSharp.resize.src && (
              <meta
                property="og:image"
                content={`https://hampta.com${
                  data.imageSharp.resize.src
                }`}
              />
            )}
            {data.imageSharp && data.imageSharp.resize.src && (
              <meta
                name="twitter:image"
                content={`https://hampta.com${
                  data.imageSharp.resize.src
                }`}
              />
            )}
            <meta property="og:type" content="article" />
            <meta name="twitter:label1" content="Reading time" />
            <meta
              name="twitter:data1"
              content={`${post.timeToRead} min read`}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.frontmatter.title} />
          </Helmet>
          <h1>{post.frontmatter.title}</h1>
          <Styledp> {post.timeToRead} min read &middot;</Styledp>
          { data.imageSharp ?
              <Img sizes={data.imageSharp.sizes} />
              : null
          }
          {
            frontmatter.piccredit &&
              <p>
                Picture credits:{` `}
                <a href={frontmatter.piclink} target="_blank">
                  {frontmatter.piccredit}
                </a>
              </p>
          }
          <FlexTagBox>
              <Tag style={{backgroundColor: `${colors.mountain3}`}}> Best Price </Tag>
              <Tag style={{backgroundColor: `${colors.mountain4}`}}> Best Service </Tag>
              <Tag style={{backgroundColor: `${colors.mountain3}`}}> Group Discounts </Tag>
              <Tag style={{backgroundColor: `${colors.mountain4}`}}> Customised Treks </Tag>
              <Tag style={{backgroundColor: `${colors.mountain3}`}}> Contact us @ +91 9736842584, +91 9817181686</Tag>
          </FlexTagBox>
          <div
            css={`
              text-align: left;
              margin-top: 32px;
            `}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
         <div>
           { edges && ( edges.length > 0 ) && <SfPackageData packages={edges} /> }
           { trek && ( trek != null ) && <SftrekData trek={trek}/> }
         </div>
          <div css={`
                display: flex;
                flex: flex-grow;
                align-items: center;
                margin: 32px 0px;
              `}>
            {prev && (
              <Link
                to={prev.fields.slug}
                css={`
                  display: flex;
                  flex-grow: 1;
                  color: ${colors.mountain6};
                `}
              >
                <h3> {prev.frontmatter.title} </h3>
              </Link>
            )}
            {next && (
              <Link
                to={next.fields.slug}
                css={`
                  display: flex;
                  align-self: flex-end;
                  color: ${colors.mountain6};
                `}
              >
                <h3> {next.frontmatter.title} </h3>
              </Link>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
};

export const blogPostQuery = graphql`
  query TrekByPath($slug: String!, $imageregex: String, $trekid : String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      tableOfContents
      frontmatter {
        title
        piccredit
        piclink
      }
    }
    treksWithTag(id: { eq: $trekid }) {
      ...SftrekQuery
    }
    allGuideDepartures(filter: { trekid: { eq: $trekid }}) {
     edges {
       node {
         ...SfPackageQuery
       }
     }
    }
    imageSharp(id: { regex: $imageregex }) {
      id
      sizes(maxWidth: 900) {
        ...GatsbyImageSharpSizes
      }
      resize(width: 1500, height: 1500) {
        src
      }
    }
  }
`;

export default Template;
