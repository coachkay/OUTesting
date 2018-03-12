import React from 'react'
import styled, { css } from 'react-emotion';
import colors from '../utils/colors';

const TrekVitals = ({ heading, value }) => (
  <div>
    <div css="
          display: inline-block;
        "
    >
      { heading }:
    </div>
    <div css="display: inline;"> { value} </div>
  </div>
)


const Inclusions = ({ items, title }) => {
  if (items.length > 0) {
    return (
      <div>
       <h3> { title } </h3>
         { items.map((item, index) =>
              <li key={index}>
                {item}
              </li>
            )
         }
      </div>
    )
  } else {
    return null;
  }
}

const Departure = ({ items, title }) => {
  if (items.length > 0) {
    return (
      <div>
       <p> { title } </p>
         { items.map((item, index) =>
              <h2 key={index}>
                {item}
              </h2>
            )
         }
      </div>
    )
  } else {
    return null;
  }
}


const ListItem = ({ pkg }) => {

  const {
    packagetype,
    noofdays,
    minimumage,
    startingfrom,
    endsat,
    trekkingdays,
    trekkingdistance,
    transportation,
    fooddetails,
    accommodation,
  } = pkg;

  return (
    <div>
      <h3> Package Vitals </h3>
      { packagetype && <TrekVitals heading={"Trek Type"} value={packagetype}/> }
      { startingfrom && <TrekVitals heading={"Trek Starts From"} value={startingfrom}/> }
      { endsat && <TrekVitals heading={"Trek Ends At"} value={endsat}/> }
      { packagetype && <TrekVitals heading={"Trek Type"} value={packagetype}/> }
      { noofdays && <TrekVitals heading={"Total Days"} value={noofdays + ' days'}/> }
      { minimumage && <TrekVitals heading={"Minimum Age"} value={minimumage + ' years'}/> }
      { trekkingdays && <TrekVitals heading={"Trekking days"} value={trekkingdays + ' days'}/> }
      { trekkingdistance && <TrekVitals heading={"Trekking Distance"} value={trekkingdistance + ' km'}/> }
      { transportation && <TrekVitals heading={"Transportation"} value={transportation + ' km'}/> }
      { fooddetails && <TrekVitals heading={"Food"} value={fooddetails}/> }
      { accommodation && <TrekVitals heading={"Accomodation"} value={accommodation}/> }
    </div>
    )
}

const Itinerary = ({ itinerary }) => {
  return (
    <div>
      <h3> Package Itinerary </h3>
      {itinerary.map((item, index) => {
        let tripend = "";
        const {
          startpoint,
          endpoint,
          maxaltitude,
          distancecovered,
          accomodationtype,
          dayhighlights,
        } = item;
        if (itinerary.length == (index + 1)) {
          tripend = <h4> Trek Ends Here </h4>
        }
        return (
          <div key={index} css="background-color: lightgrey; padding: 16px;">
            <span>
              Day {index + 1}
            </span>
            <h4> {startpoint} to {endpoint} </h4>
            <h4> Maximum Altitude: {maxaltitude} </h4>
            <h4> Distance Covered: {distancecovered} km</h4>
            <h4> Accomodation Type: {accomodationtype} </h4>
            <h4> {dayhighlights} </h4>
            {tripend}
            <hr />
          </div>
        )
        })
      }
    </div>
  )
}

const TrekPackage = (props) => {
  const {
    trekid,
    guideuid,
    packagename,
    packagetype,
    packagelevel,
    packageoverview,
    inclusions,
    exclusions,
    accommodation,
    packagehighlights,
    itinerary,
    pricing,
    departure,
    maxseats,
  } = props.pkg;

  return (
    <div css={`
            text-align: left;
         `}
    >
    { departure && departure.length > 0 && <Departure items={departure} title={ "Upcoming Departures:" }/> }
      <h1> { packagename } Package </h1>
      <div dangerouslySetInnerHTML={{ __html: packageoverview }} />
      <br/>
      <ListItem pkg={props.pkg} />
      <br/>
      { inclusions && inclusions.length > 0 && <Inclusions items={inclusions} title={ "Package Inclusions" }/> }
      <br/>
      { exclusions && exclusions.length > 0 && <Inclusions items={exclusions} title={ "Package Exclusions" }/> }
      <br/>
      <Itinerary itinerary={itinerary} />
      <hr/>
    </div>
  )
}

const SfPackageData = ({ packages }) => {
  return packages.map(pkg => <TrekPackage key={pkg.node.packagename} pkg={pkg.node}  />)
}

export default SfPackageData;

export const sfpackageQuery = graphql `
  fragment SfPackageQuery on guideDepartures {
    trekid
    guideuid
    noofdays
    packagename
    packagetype
    packagelevel
    noofdays
    startingfrom
    endsat
    packageoverview
    trekkingdays
    trekkingdistance
    transportation
    fooddetails
    inclusions
    exclusions
    accommodation
    packagehighlights
    itinerary  {
        startpoint
        endpoint
        maxaltitude
        distancecovered
        accomodationtype
        dayhighlights
    }
    departure
    maxseats
  }
`;
