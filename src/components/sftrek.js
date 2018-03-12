import React from 'react'
import styled, { css } from 'react-emotion';
import colors from '../utils/colors';

const TrekTag = styled.div`
  overflow: hidden;
  text-align: center;
  margin: 0.5rem;
  padding: 0.5rem;
  color: white;
  background-color: lightgrey;
  ...props.style
`;

const FlexTagBox = ({ children }) => (
  <div css={`
         display: flex;
         justifyContent: center;
         flex-wrap: wrap;
    `}
  >
      { children }
  </div>
)


const SftrekData = (props) => {
  const { id,
      overview,
      itinerary,
      season,
      months,
      region,
      noofdays,
      type,
      minage,
      altitude,
      attractions,
      faqs } = props.trek;
  return (
    <div>
      <h1> General Information </h1>
      <div css={`
              text-align: left;
           `}
      >
         <FlexTagBox>
            <TrekTag style={{backgroundColor: `${colors.mountain1}`}}> Maximum Altitude {altitude} meters </TrekTag>
            {
              months.map(item => <TrekTag style={{backgroundColor: `${colors.mountain2}`}} key={item}> {item} </TrekTag>)
            }
            {
              season.map(item => <TrekTag style={{backgroundColor: `${colors.mountain3}`}} key={item}> {item} </TrekTag>)
            }
            {
              region.map(item => <TrekTag style={{backgroundColor: `${colors.mountain4}`}} key={item}> {item} </TrekTag>)
            }
            {
              noofdays.map(item => <TrekTag style={{backgroundColor: `${colors.mountain5}`}} key={item}> {item} days </TrekTag>)
            }
            <TrekTag style={{backgroundColor: `${colors.mountain6}`}}> Minimum Age {minage} yrs </TrekTag>
         </FlexTagBox>
         <h1> Overview of { id.split('-').join(' ') } </h1>
         <div dangerouslySetInnerHTML={{ __html: overview }} />
         <br/>
         <hr/>
         <h1> Trek Itineraries for { id.split('-').join(' ') } </h1>
         <div dangerouslySetInnerHTML={{ __html: itinerary }} />
         {faqs && <div>
                    <h1> FAQ for { id.split('-').join(' ') } </h1>
                    <div dangerouslySetInnerHTML={{ __html: faqs }} />
                  </div>
         }
      </div>
    </div>
  )
}
export default SftrekData;

export const sftrekQuery = graphql `
  fragment SftrekQuery on treksWithTag {
    id
    overview
    itinerary
    season
    months
    region
    noofdays
    type
    minage
    altitude
    attractions {
      meadows
      snow
      wildlife
      villagestay
      forests
      camping
      waterbody
      rivercrossings
    }
    faqs
  }
`;
