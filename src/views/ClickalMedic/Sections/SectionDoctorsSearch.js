import React from "react";
// nodejs library that concatenates classes
//import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
//import GridContainer from "components/Grid/GridContainer.js";
import Drawer from '@material-ui/core/Drawer';
import { Grid } from '@material-ui/core';
import GridItem from "components/Grid/GridItem.js";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridContainer from "components/Grid/GridContainer.js";


import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import stylesa from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import stylesb from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";


//picker plugin

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  
  import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles({
  ...styles,
  root: {
    maxWidth: 345,
  },
  ...stylesa, ...stylesb
});

export default function TeamSection(props) {
  const classes = useStyles();

  const { doctors } = props

  //console.log("doctors.length",doctors.length)

  const [ drawerOpen, setDrawerOpen ] = React.useState(false)

  const [ drawerOpen2, setDrawerOpen2 ] = React.useState(false)

  const [ selectedDoctor, setSelectedDoctor ] = React.useState(null)

  const selectDoctor = (doctor) => {
      setSelectedDoctor(doctor)
      setDrawerOpen(true)
  }

  const checkDoctorComments = (doctor) => {
    setSelectedDoctor(doctor)
    setDrawerOpen2(true)
}

  const startsQualification = <>
    <Button justIcon color="transparent" ><i style={{ fontSize:"12px" }}  className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" ><i style={{ fontSize:"12px" }}  className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" ><i style={{ fontSize:"12px" }}  className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" ><i style={{ fontSize:"12px" }}  className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" ><i style={{ fontSize:"12px" }}  className={classes.socials + " fas fa-star"} /></Button>              
  </>

  return (
    <>
        <div className={classes.section}  style={{ padding:"25px 0px" }} >
        <h2 className={classes.title}>Resultados</h2>
        
            {
                Array.from(Array(Math.ceil(doctors.length/3)).keys()).map( x => (
                    <Grid
                    spacing={2}
                    container
                >
        
                    {
                        Array.from(Array(3).keys()).map( y => ( doctors[(x*3)+y] && 
                            <GridItem style={{ display:"flex", justifyContent:"center", alignItems:"center",  flexDirection:"row", maxHeight:"434.5px", marginTop:"45px" }}
                            key={doctors[(x*3)+y]?.id} xs={12} sm={6} md={4} item>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                        component="img"
                                        alt="Clickal doctor"
                                        height="140"
                                        image={ process.env.REACT_APP_SERVE_IMAGE + doctors[(x*3)+y]?.picture }
                                        title="Clickal doctor"
                                        />
                                        <CardContent style={{ height:"198px", overflow:"scroll" }} >
                                            <Typography gutterBottom variant="h5" component="h2">
                                                { doctors[(x*3)+y]?.name } { doctors[(x*3)+y]?.lastName }
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                {doctors[(x*3)+y]?.specialistDetails[0]?.name }
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                { doctors[(x*3)+y]?.CityDetails[0]?.name }
                                            </Typography>                                    
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                { doctors[(x*3)+y]?.aboutDoctor }
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{ display:"flex", justifyContent:"center", alignItems:"center",  flexDirection:"column" }} >
                                        
                                        <div >
                                        { startsQualification }
                                        </div>
                                        <div>
                                            <Button size="small" color="primary" onClick={()=>selectDoctor(doctors[(x*3)+y])} >
                                                Agendar cita
                                            </Button>
                                            <Button size="small" color="primary" onClick={()=>checkDoctorComments(doctors[(x*3)+y])} >
                                                Comentarios
                                            </Button>
                                        </div>                                    

                                    </CardActions>
                                </Card>
                            </GridItem>
                        ))
                    }                
                
                </Grid>
                ))
            }
        </div>

        <React.Fragment key={"anchor"}>
          <Drawer anchor={"right"} open={drawerOpen} onClose={()=>setDrawerOpen(false)}>
            <div style={{width:"25em"}} >
            
            {   selectedDoctor &&             
                <GridContainer>
                    <GridItem item>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >              
                            <h4> { selectedDoctor?.name } { selectedDoctor?.lastName } </h4>
                            <img
                                style={{ minWidth:"115px", minHeight:"115px", width:"180px", height:"180px" }}
                                src={ process.env.REACT_APP_SERVE_IMAGE + selectedDoctor?.picture }
                                alt="..."
                                className={classes.imgRoundedCircle + " " + classes.imgFluid}
                            />
                            <Typography gutterBottom variant="h5" component="h2">
                                Especializaciones:
                            </Typography>
                            {
                                selectedDoctor.specialistDetails.map( specialist => (
                                    <>
                                        <Typography gutterBottom variant="caption" >
                                                { specialist?.name } 
                                        </Typography>
                                    </>
                                ))
                            }
                        </div>
                    </GridItem>
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">        

                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Fecha para agendar cita"
                            value={null}
                            format="MM/dd/yyyy"                          
                            onChange={(date)=>console.log("birthDate",date)}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />

                    </Grid>
                    </MuiPickersUtilsProvider>

                </GridContainer>
            }

            </div>
          </Drawer>
        </React.Fragment>



        <React.Fragment key={"anchor"}>
          <Drawer anchor={"right"} open={drawerOpen2} onClose={()=>setDrawerOpen2(false)}>
            <div style={{width:"25em"}} >
            
            {   selectedDoctor &&             
                <GridContainer>
                    
                    <GridItem item>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >              
                            <h4> { selectedDoctor?.name } { selectedDoctor?.lastName } </h4>
                            <img
                                style={{ minWidth:"115px", minHeight:"115px", width:"180px", height:"180px" }}
                                src={ process.env.REACT_APP_SERVE_IMAGE + selectedDoctor?.picture }
                                alt="..."
                                className={classes.imgRoundedCircle + " " + classes.imgFluid}
                            />                          
                         
                        </div>
                    </GridItem>

                    <GridItem justifyContent="center" container>
                        <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"center"}} > 
                            { startsQualification }
                        </div>
                    </GridItem>

                    <GridItem justifyContent="center" container>
                        <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"center"}} > 
                            <Typography gutterBottom variant="h5" component="h2">
                                    Comentarios de otros pacientes:
                            </Typography>
                        </div>
                    </GridItem>

                </GridContainer>
            }

            </div>
          </Drawer>
        </React.Fragment>
    
    
    </>
  );
}
