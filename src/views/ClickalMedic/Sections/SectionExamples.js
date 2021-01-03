import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import clickal1 from "assets/img/clickal1.jpeg"

import clickal2 from "assets/img/clickal2.jpeg"

import stylesa from "assets/jss/material-kit-react/views/componentsSections/exampleStyle.js";

import stylesb from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const styles = { ...stylesa, ...stylesb }

const useStyles = makeStyles(styles);

export default function SectionExamples() {
  const classes = useStyles();
  return (
    <div className={classes.section} style={{padding:"20px"}}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Nuestros servicios</h2>
          <h5 className={classes.description}>
            Somos una empresa encargada de gestionar y crear sistemas para las necesidades medicas, actuales.
            Digitalizar y facilitar cualquier proceso de atención a nuestros pacientes y nunca descuidar nuestra calidad humana
          </h5>
        </GridItem>
      </GridContainer>
      <br/>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Link to="landing-page" className={classes.link}>
              <img
                src={clickal1}
                alt="..."
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                }
              />
              <Button style={{color:"black"}} color="primary" size="lg" simple>
                Sistema para pacientes
              </Button>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Link to="profile-page" className={classes.link}>
              <img
                src={clickal2}
                alt="..."
                className={
                  classes.imgRaised +
                  " " +
                  classes.imgRounded +
                  " " +
                  classes.imgFluid
                }
              />
              <Button style={{color:"black"}} color="primary" size="lg" simple>
                Sistema para médicos
              </Button>
            </Link>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
