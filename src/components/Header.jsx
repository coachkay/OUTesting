import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export default function Header(props) {

  return (
    <section id="header" className="dark">
      <header>
        <h1>Hampta Treks & Tours</h1>
        <p>Best Service & Best Price</p>
        <p>
         Join us for the Hampta Pass, Hampta Circle, Bhrigu Lake and other treks in the valley
       </p>
       <p>Contact +91 9736842584</p>
      </header>
      <footer>
        <a href="#first" className="button scrolly">Browse Our Treks</a>
      </footer>
    </section>
  );
}
