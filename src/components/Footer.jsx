import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export default function Footer(props) {

  return (
    <section id="footer">
      <ul className="icons">
        <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
        <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
        <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
      </ul>
      <div className="copyright">
        <ul className="menu">
          <li>&copy; OOTY ULTRA. All rights reserved.</li><li>Design: <a href="https://tech47.in">Tech47, Building for India</a></li>
        </ul>
      </div>
    </section>
  );
}
