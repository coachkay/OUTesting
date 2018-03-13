import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export default function Footer(props) {

  return (
    <section id="footer">
      <ul className="icons">
        <li><a href="https://twitter.com/kaysfitacademy" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
        <li><a href="https://facebook.com/kaysfitacademy" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
        <li><a href="https://instagram.com/kaysfitacademy" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
        <li><a href="https://linkedin.com/in/kannansundararajan" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
        <li><a href="mailto:coachkay@kfita.in" className="icon fa-envelope"><span className="label">LinkedIn</span></a></li>
        <li><a href="tel:+919980890374" className="icon fa-phone"><span className="label">LinkedIn</span></a></li>
      </ul>
      <div className="copyright">
        <ul className="menu">
          <li>&copy; OOTY ULTRA. All rights reserved.</li><li>Design: <a href="https://tech47.in">Tech47, Building for India</a></li>
        </ul>
      </div>
    </section>
  );
}
