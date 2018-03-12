import React from "react"
import Link from "gatsby-link"
import { css } from 'react-emotion'
import logo from "../hamptatreks.png"
import presets, { colors } from "../utils/presets"
import media from '../utils/media'

const navItemStyles = css`
  box-sizing: border-box;
  display: inline-block;
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: none;
  letter-spacing: 0.03em;
  line-height: calc(${presets.headerHeight} - 6px);
  padding: 6px 4px 0;
  position: relative;
  top: 0;
  transition: color .15s ease-out;
  &:hover: {
    opacity: 0.8;
  };
`;
const NavItem = ({ linkTo, children }) => (
  <li
    css={`
      display: inline-block;
      margin: 0;
    `}
  >
    <Link to={linkTo} className={navItemStyles}>
      {children}
    </Link>
  </li>
)

export default ({ pathname }) => {
  const isHomepage = pathname == `/`
  const isBlog = pathname == `/blog/`
  let styles = {}
  if (isHomepage) {
    styles.backgroundColor = `rgba(255,255,255,0)`
    styles.borderBottomColor = `transparent`
    styles[presets.Tablet] = {
      position: isHomepage || isBlog ? `absolute` : `fixed`,
    }
  } else if (isBlog) {
    styles.backgroundColor = `#fff`
    styles[presets.Tablet] = {
      borderBottomColor: `transparent`,
      backgroundColor: colors.mountain3,
      position: isHomepage || isBlog ? `absolute` : `fixed`,
    }
  }
  const stylesClass = css(styles);
  const gutters = isHomepage
    ? {
        paddingLeft: `32px`,
        paddingRight: `32px`,
        paddingTop: `32px`,
        [presets.Hd]: {
          paddingLeft: `64px`,
          paddingRight: `64px`,
        },
        [presets.VHd]: {
          paddingLeft: `64px`,
          paddingRight: `64px`,
        },
        [presets.VVHd]: {
          paddingLeft: `64px`,
          paddingRight: `64px`,
        },
      }
    : {};

  const displayLogo = isHomepage
    ? {
        display: `none`
      }
    : {};

  const logoClass = css(displayLogo);

  const navPosition = isHomepage || isBlog
    ? {
        display: `inherit`,
        position: `absolute`
      }
    : {
        display: `inherit`,
        position: `fixed`
      };
  const navPositionClass = css(navPosition);

  const navDisplay = isHomepage
    ? {
        display: `none`
      }
    : {
        display: `inherit`
      };
  const navDisplayClass = css(navDisplay);

  const navColor = isHomepage
    ? {
        color: `white`
      }
    : {
        color: `inherit`
      };
  const navColorClass = css(navColor);


  return (
    <div
      role="navigation"
      css={`
        ${navDisplayClass};
        border-bottom: 1px solid ${colors.mountain3};
        background-color: rgba(255,255,255,0.975);
        height: ${presets.headerHeight};
        z-index: 2;
        left: 0;
        right: 0;
        ${media.tablet`
           ${navPositionClass};
        `};
        ${stylesClass};
      `}
    >
      <div
        css={`
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 64px;
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
        `}
      >
        <Link
          to="/"
          css={`
            align-items: center;
            color: inherit;
            display: flex;
            text-decoration: none;
            margin-right: 32px;
            border-bottom: none;
            ${logoClass};
            `}
        >
          <img
            src={logo}
            css={`
              height: 2.5rem;
              margin: 0;
            `}
            alt=""
          />
          <h3 css={`
                margin : auto;
                padding-left: 16px;
              `}
          >
            Hampta Treks & Tours
          </h3>
        </Link>
        <ul
          css={`
            display: none;
            ${media.tablet`
              display: flex;
              margin: 0;
              padding: 16px;
              justify-content: flex-end;
              list-style: none;
              ${navColorClass};
              flex-grow: 1;
              overflow-x: auto;
              mask-image: linear-gradient(to right, transparent, white 1%, white 98%, transparent);
              `};
          `}
        >
          <NavItem linkTo="/trek/">Treks</NavItem>
          <NavItem linkTo="/reviews/">Reviews</NavItem>
          <NavItem linkTo="/blog/">Blog</NavItem>
        </ul>
      </div>
    </div>
  )
}
