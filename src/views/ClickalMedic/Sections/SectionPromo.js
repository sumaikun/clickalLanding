import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

//carousel
import Carousel from 'react-material-ui-carousel'

//extra mockup things
import general from "assets/img/general_thumb.jpg";
import stylesa from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import stylesb from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const styles = { ...stylesa, ...stylesb }

const useStyles = makeStyles(styles);

export default function SectionPromo() {
  const classes = useStyles();
  return (

    <div className={classes.container} style={{padding:"20px"}} >
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title} style={{textAlign:"center"}} >Promociones</h2>
        </GridItem>
      </GridContainer>
      <div id="images">
        <Carousel>
          <GridContainer>
            <GridItem xs={12} sm={3}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >              
                <h4>Promoción 1</h4>
                <img
                  style={{ minWidth:"115px", minHeight:"115px", width:"180px", height:"180px" }}
                  src={general}
                  alt="..."
                  className={classes.imgRounded + " " + classes.imgFluid}
                />
              </div>
            </GridItem>
            <GridItem xs={12} sm={3} >
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >    
                <h4>Promoción 2</h4>
                <img
                  style={{ minWidth:"115px", minHeight:"115px", width:"180px", height:"180px" }}
                  src={general}
                  alt="..."
                  className={classes.imgRoundedCircle + " " + classes.imgFluid}
                />
              </div>
            </GridItem>
            <GridItem xs={12} sm={3} >
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >   
                <h4>Promoción 3</h4>
                <img
                  style={{ minWidth:"115px", minHeight:"115px", width:"180px", height:"180px" }}
                  src={general}
                  alt="..."
                  className={
                    classes.imgRaised +
                    " " +
                    classes.imgRounded +
                    " " +
                    classes.imgFluid
                  }
                />
               </div>
            </GridItem>
            <GridItem xs={12} sm={3} >
              <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >   
                <h4>Promoción 4</h4>
                <img
                  style={{ minWidth:"115px", minHeight:"115px", width:"180px", height:"180px" }}
                  src={general}
                  alt="..."
                  className={
                    classes.imgRaised +
                    " " +
                    classes.imgRoundedCircle +
                    " " +
                    classes.imgFluid
                  }
                />
              </div>
            </GridItem>
          </GridContainer>

         
        </Carousel>
      </div>
    </div>
  
  );
}
