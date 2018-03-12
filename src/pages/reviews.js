import React from 'react';
import Helmet from 'react-helmet';
import './reviews.css';
import sherpafeet from './textLogo.png';

const ReviewBox = (props) => {
const { comment, destination, month, year, rating, usr } = props;
return (
  <div css={{
      margin: `32px`,
    }}
  >
    <figure className="snip1204">
      <blockquote>
         <div> {comment} </div>
      </blockquote>
      <div className="author">
       <img src={usr.picture} alt={`Review by ${usr.firstname}`}/>
       <h5>{usr. firstname}{` `}{usr.lastname}</h5>
       <span>{month && `${month} ${year}`}</span>
      </div>
    </figure>
  </div>
  )
}

export default (props) => {
  const { pathname } = props.location;
  const { data } = props;
  const { edges } = data.allRatings;
  const title = 'Hampta Treks Customer Reviews';
  const description = 'Customer reviews for hampta treks';
  return (
  <div>
    <Helmet>
      <title> {title} </title>
      <meta name="description" content={description} />
      <meta name="Keywords" content={'reviews, customers, trekkers'} />
      <meta property="og:title" content={title} />
      <link rel="canonical" href={`https://sherpafeet.com/guide/RaviThakur`} />
      <meta property="og:url" content={`https://hampta.com${pathname}`} />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        name="twitter:description"
        content={description}
      />
      {data.bgImage.resize.src && (
        <meta
          property="og:image"
          content={`https://hampta.com${
            data.bgImage.resize.src
          }`}
        />
      )}
      {data.bgImage.resize.src && (
        <meta
          name="twitter:image"
          content={`https://hampta.com${
            data.bgImage.resize.src
          }`}
        />
      )}
      <meta name="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
    </Helmet>

    <div css={{
             marginTop: `32px`,
             marginLeft: `32px`,
             marginRight: `32px`,
             textAlign: `center`,
            }}
       >
       <h3> Reviews for Ravi Thakur, Lead Guide @ Hampta Treks </h3>
     </div>
     <div css={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `center`,
          }}
     >
        {edges.map((rev, index) => {
             const { node } = rev;
             return (
               <ReviewBox key={node.id} {...node} />
             )
          })
        }
     </div>
     <div style={{
            marginRight: `16px`,
            marginLeft: `16px`,
            textAlign: `center`,
            marginBottom: `100px`,
          }}
     >
       <a href="https://sherpafeet.com/guide/RaviThakur">
         <img src={sherpafeet} width={100} alt="Reviews on sherpafeet"/>
         <h3> Write a review for  Hampta Treks </h3>
       </a>
     </div>
   </div>
   )
}

export const pageQuery = graphql`
  query getratings {
  allRatings {
    edges {
      node {
        id
        comment
        destination
        month
        year
        rating
        date
        usr {
          picture
          firstname
          lastname
        }
      }
    }
  }
  bgImage: imageSharp(id: { regex: "/cover/" }) {
      resize(width: 1200, height: 630, cropFocus: CENTER) {
        # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
        src
      }
    }
  }
`
