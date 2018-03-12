const { name } = require('./package.json');

module.exports = {
  pathPrefix: process.env.CI ? `/${name}` : `/`,
  siteMetadata: {
    author: 'You!',
    title: `Gatsby Default (Blog) Starter`,
  },
  plugins: [
    'gatsby-plugin-react-next',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `netlifyimages`,
        path: `${__dirname}/static/img/`
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Hampta Treks & Tours",
        short_name: "Hampta Treks",
        start_url: "/trek/",
        background_color: "#ffffff",
        theme_color: "#B9A44C",
        display: "minimal-ui",
        icons: [
          {
            // Everything in /static will be copied to an equivalent
            // directory in /public during development and build, so
            // assuming your favicons are in /static/favicons,
            // you can reference them here
            src: `/favicons/android-icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        endpoint: `https://sherpafeet.com/graphql`,
        query: `{
          ratings (guideuid: "RaviThakur") {
            _id
            comment
            destination
            month
            year
            rating
            attractions {
              snow
              rivercrossings
              meadows
              wildlife
              villagestay
              localfestival
              forests
              camping
              waterbody
              rivercrossings
            }
            raterid
            date
            usr {
              picture
              firstname
              lastname
            }
         }
         treksWithTag (tag: "all") {
           _id, level, profileurl, season, months, region, overview, picarray, metadescription,
           noofdays, itinerary, rank, type, minage, altitude,
          attractions { meadows, snow, wildlife,
                        villagestay,
                        localfestival,
                        forests,
                        camping,
                        waterbody,
                        rivercrossings,
                        }
           blogs { href, author, title, image, description }
           faqs,
         }
         guideDepartures (guideuid: "RaviThakur") {
          _id
          trekid
          guideuid
          noofdays
          packagename
          packagetype
          packagelevel
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
          pricing {
            price
            note
          }
          maxseats
          departure
          }
        }`,
      },
    },
    `gatsby-plugin-netlify-cms`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp'
  ],
}
