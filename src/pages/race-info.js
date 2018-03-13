import React from 'react'
import { css } from 'react-emotion'
import media from '../utils/media'


export default (props) => {
  const { html } = props.data.contentfulRace.raceInfo.childMarkdownRemark
  return (
    <div css={`
            padding: 16px;
            background-color: rgba(31, 116, 28, 1);
            ${media.tablet`
              padding: 64px;
             `};
        `}
    >
       <div
         className={"dark"}
         css="text-align: left;"
         dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}


export const raceQuery = graphql`
  query racequery {
    contentfulRace {
      raceInfo {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
