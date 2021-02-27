import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

//carousel
import Carousel from 'react-material-ui-carousel'

const useStyles = makeStyles(styles);

export default function TeamSection(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { doctors } = props

  //console.log("doctors.length",doctors.length)

  const startsQualification = <>
    <Button justIcon color="transparent" className={classes.margin5}><i className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" className={classes.margin5}><i className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" className={classes.margin5}><i className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" className={classes.margin5}><i className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" className={classes.margin5}><i className={classes.socials + " fas fa-star"} /></Button>              
  </>

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Nuestros médicos</h2>
      <div>
        <Carousel showArrows>

          {
            Array.from(Array(Math.ceil(doctors.length/3)).keys()).map( x => 

              <GridContainer key={x} >

                {
                  Array.from(Array(3).keys()).map( y => 
                    ( doctors[(x*3)+y] &&  
                      <GridItem key={doctors[(x*3)+y]?.id} xs={12} sm={12} md={4} sm={3} >
                        <Card plain>
                          <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                            <img src={  process.env.REACT_APP_SERVE_IMAGE + doctors[(x*3)+y]?.picture }
                            alt="..." style={{ minWidth:"115px", minHeight:"115px", width:"150px", height:"150px" }}  className={imageClasses} />
                          </GridItem>
                          <h4 className={classes.cardTitle}>
                            { doctors[(x*3)+y]?.name } { doctors[(x*3)+y]?.lastName }
                            <br />
                            <small className={classes.smallTitle}>{ 
                              doctors[(x*3)+y]?.specialistDetails && 
                              doctors[(x*3)+y]?.specialistDetails[0]?.name }</small>
                            <br />
                            <small className={classes.smallTitle}>{ 
                              doctors[(x*3)+y]?.CityDetails &&
                              doctors[(x*3)+y]?.CityDetails[0]?.name }</small>
                          </h4>
                          <CardBody>
                            <p className={classes.description}>
                            { doctors[(x*3)+y]?.aboutDoctor }
                            </p>
                          </CardBody>
                          <CardFooter className={classes.justifyCenter}>                  
                            {startsQualification}                
                          </CardFooter>
                        </Card>
                      </GridItem>
                    )
                  )
                }                
              
              </GridContainer>
            )
          }

        </Carousel>
      </div>
    </div>
  );
}
