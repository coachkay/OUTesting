import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export default function Header(props) {

  return (
    <section id="header" className="dark">
      <header>
        <h1>OOTY ULTRA</h1>
        <p>60k, 30k & 15k</p>
        <p>
         Ooty, also known as the Queen of Hills is filled with breathtaking mountains
         and beautifully wooded forests.
       </p>
      </header>
      <footer>
        <Link to="/register" className="button scrolly">Register</Link>
      </footer>
    </section>
  );
}
