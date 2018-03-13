import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Header from '../components/Header';
import First from '../components/First';

import '../styles/main.scss';

export default function Index(props) {
  const { data } = props;
  const title = 'Ooty Ultra';
  const description = 'Ooty Ultra, 60k, 30k & 15k, April 29 2018';

  return (
    <div>
      <Helmet>
        <title> {title} </title>
        <meta name="description" content={description} />
        <meta name="Keywords" content={'ultra marathon, india, race, running, marathon'} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={`https://ootyultra.com`} />
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
            content={`https://ootyultra.com${
              data.bgImage.resize.src
            }`}
          />
        )}
        {data.bgImage.resize.src && (
          <meta
            name="twitter:image"
            content={`https://ootyultra.com${
              data.bgImage.resize.src
            }`}
          />
        )}
        <meta name="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
      </Helmet>
      <Header />
      <First />
    </div>
  );
}

export const homeQuery = graphql`
  query homequery {
    bgImage: imageSharp(id: { regex: "/cover/" }) {
        resize(width: 1200, height: 630, cropFocus: CENTER) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          src
        }
      }
  }
`
