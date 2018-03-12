import React from "react";
import Link from "gatsby-link";
import { css } from 'react-emotion';
import {
  TrekIcon,
  ReviewsIcon,
  BlogIcon,
} from "../images/mobile-nav-icons";
import presets, { colors } from "../utils/presets";
import media from '../utils/media';

const linkStyle = {
      color: colors.mountain3,
      letterSpacing: `0.0075rem`,
      lineHeight: 1,
      padding: `8px 8px`,
      textDecoration: `none`,
      textAlign: `center`,
    };
const linkClass = css(linkStyle);

const MobileNavItem = ({ linkTo, label, icon }) => (
  <Link
    to={linkTo}
    className={linkClass}
  >
    <img src={icon}
         css={`
           height: 32px;
           display: block;
           margin: 0 auto;
           `}
    />
    <div>{label}</div>
  </Link>
)

export default () => (
  <div
    css={`
      position: fixed;
      display: flex;
      justify-content: space-around;
      align-items: center;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
      background: white;
      ${media.tablet`
        display: none;
      `};
    `}
  >
    <MobileNavItem linkTo="/trek/" label="Treks" icon={TrekIcon} />
    <MobileNavItem
      linkTo="/reviews/"
      label="Reviews"
      icon={ReviewsIcon}
    />
    <MobileNavItem linkTo="/blog/" label="Blog" icon={BlogIcon} />
  </div>
)
