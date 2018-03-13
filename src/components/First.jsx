import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { css } from 'react-emotion'

const aboutUl = css`
  text-align: left;
  margin: 0px 64px;
  & li {
    margin: 16px;
  }

`;

export default function First(props) {

  return (
    <section id="first" className="main">
      <header>
          <ul className={aboutUl}>
            <li>
              OOTYULTRA is an ultramarathon founded by Kannan Sundararajan, a.k.a Coach Kay, founder of KaysFIT Academy.
              Ooty is the home town of Kay.
            </li>
            <li>
              Kay is an avid Ultramarathon runner and a road safety ambassador.  He has a special passion for mountain running.
              He is also a fitness coach and enjoys conducting sporting events & motivational workshops regularly.
            </li>
            <li>
              An Ultramarathon event in Ooty will be a perfect way to give back to the town/community,
              the beautiful aspects of running marathons and leading a healthy/fit lifestyle
            </li>
            <li>
              OOTYULTRA will be a perfectly challenging running event for the beginners to Ultramarathon lovers (distance categories of 15k, 30k & 60k)
            </li>
            <li>
              This will be a road run cutting through the important streets, iconic geographical landmarks in Ooty town and take the runners into second highest peak
              in South India and internal village roads
            </li>
            <li>
              The first edition of OOTYULTRA is expected to attract over ~200 participants from across India, indirectly promoting Marathon Tourism in The Nilgiris
            </li>
          </ul>
      </header>
    </section>
  );
}
