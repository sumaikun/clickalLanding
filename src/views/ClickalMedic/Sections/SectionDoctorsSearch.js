import React, {Fragment} from "react";
// nodejs library that concatenates classes
//import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
//import GridContainer from "components/Grid/GridContainer.js";
import Drawer from '@material-ui/core/Drawer';
import { Grid, Chip } from '@material-ui/core';
import GridItem from "components/Grid/GridItem.js";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridContainer from "components/Grid/GridContainer.js";

import DoneIcon from '@material-ui/icons/Done';


import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import stylesa from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import stylesb from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";


import { getDaySchedule } from '../../../actions/doctors'

import moment from 'moment';
import Swal from 'sweetalert2' 

//picker plugin

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  
  import DateFnsUtils from '@date-io/date-fns';

//subcomponents
import SectionPatientForm from './SectionPatientForm'
import { createNullishCoalesce } from "typescript";


const useStyles = makeStyles({
  ...styles,
  root: {
    maxWidth: 345,
  },
  ...stylesa, ...stylesb
});

export default function SectionDoctorsSearch(props) {
  const classes = useStyles();

  const { doctors } = props

  //console.log("doctors.length",doctors.length)

  const [ drawerOpen, setDrawerOpen ] = React.useState(false)

  const [ drawerOpen2, setDrawerOpen2 ] = React.useState(false)

  const [ selectedDoctor, setSelectedDoctor ] = React.useState(null)

  const [ selectedDate, setSelectedDate ] = React.useState(null)

  const [ appointmentDate, setAppointmentDate ] = React.useState(null)

  const [ avaliableHours, setAvaliableHours ] = React.useState([])

  const [ openForm, setOpenForm ] = React.useState(false)

  const selectDoctor = (doctor) => {
      console.log("doctor",doctor)
      setSelectedDoctor(doctor)
      setDrawerOpen(true)
  }

  const checkDoctorComments = (doctor) => {
    setSelectedDoctor(doctor)
    setDrawerOpen2(true)
}

  const startsQualification = <>
    <Button justIcon color="transparent" ><i  className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" ><i  className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" ><i  className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" ><i  className={classes.socials + " fas fa-star"} /></Button>
    <Button justIcon color="transparent" ><i  className={classes.socials + " fas fa-star"} /></Button>              
  </>

    const minutesToHours = (minutes) => {

        const hours = Math.floor(minutes/60)

        const minutesResult = minutes - (60 * Math.floor(minutes/60))

        const stringhours =  hours < 10 ?  "0" + String(hours) : String(hours)

        const stringMinutes = minutesResult < 10 ? "0" + String(minutesResult) : String(minutesResult)

        return  stringhours + ":" + stringMinutes

    }

  return (
    <>
        <div className={classes.section} id="search-doctor-container" style={{ padding:"25px 0px" }} >
        <h2 className={classes.title}>Resultados</h2>
        
            <Grid  spacing={5} container  style={{padding:20}}>
                    
                {doctors.map( doctor =>
                        <GridItem style={{ display:"flex", justifyContent:"center", alignItems:"center",  flexDirection:"row", maxHeight:"434.5px", marginTop:"45px" }}
                        key={doctor?.id} xs={12} sm={6} md={6} lg={4} item>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    alt="Clickal doctor"
                                    height="140"
                                    image={ process.env.REACT_APP_SERVE_IMAGE + doctor?.picture }
                                    title="Clickal doctor"
                                    />
                                    <CardContent>
                                        <div className="doctor-content" style={{ height:"198px", overflow:"scroll" }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                { doctor?.name } { doctor?.lastName }
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                {doctor?.specialistDetails[0]?.name }
                                            </Typography>
                                            <Typography variant="caption" display="block" gutterBottom>
                                                { doctor?.CityDetails[0]?.name }
                                            </Typography>                                    
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                { doctor?.aboutDoctor }
                                            </Typography>
                                        </div>                                           
                                    </CardContent>
                                </CardActionArea>
                                <CardActions style={{ display:"flex", justifyContent:"center", alignItems:"center",  flexDirection:"column" }} >
                                    
                                    <div >
                                    { startsQualification }
                                    </div>
                                    <div>
                                        <Button size="small" color="primary" onClick={()=>selectDoctor(doctor)} >
                                            Agendar cita
                                        </Button>
                                        <Button size="small" color="primary" onClick={()=>checkDoctorComments(doctor)} >
                                            Comentarios
                                        </Button>
                                    </div>                                    

                                </CardActions>
                            </Card>
                        </GridItem>
                    )
                }    

                
            </Grid>            
        </div>

        <br/>

        <React.Fragment key={"anchor"}>
          <Drawer anchor={"right"} open={drawerOpen} onClose={()=>{
              setAvaliableHours([])
              setDrawerOpen(false)
            }}>
            <div style={{width:"25em"}} >
            
            {   selectedDoctor &&             
                <GridContainer>
                    <GridItem style={{background:"#033856", padding:20}} item>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} >              
                            <h4 style={{color:"white",fontWeight:"bold"}} > { selectedDoctor?.name } { selectedDoctor?.lastName } </h4>
                            <img
                                style={{ minWidth:"115px", minHeight:"115px", width:"180px", height:"180px" }}
                                src={ process.env.REACT_APP_SERVE_IMAGE + selectedDoctor?.picture }
                                alt="..."
                                className={classes.imgRoundedCircle + " " + classes.imgFluid}
                            />                          
                        </div>
                    </GridItem>

                    <br/>

                    <GridItem style={{textAlign:"center", marginTop:50}} item>
                        <Typography gutterBottom variant="h5" component="h2">
                                Especializaciones:
                        </Typography>                           
                    </GridItem>

                    <br/>

                    <GridItem style={{textAlign:"center"}} item>
                        {
                            selectedDoctor.specialistDetails.map( specialist => (
                                <>
                                    <Typography gutterBottom variant="caption" >
                                            { specialist?.name } 
                                    </Typography>
                                </>
                            ))
                        }
                    </GridItem>

                    <br/>

                    { selectedDoctor?.settings &&
                        <Fragment>
                            <GridItem style={{textAlign:"center"}} item>
                                <Typography color="primary" gutterBottom variant="caption" >
                                    Horario de atención:
                                </Typography>                                
                            </GridItem>
                            <GridItem style={{textAlign:"center"}}  item>
                                <Typography style={{fontWeight:"bold"}} color="secondary" gutterBottom variant="caption" >
                                    { selectedDoctor?.settings.daysRange.indexOf("Mon") > -1 && "Lun," }
                                    { selectedDoctor?.settings.daysRange.indexOf("Tue") > -1 && "Mar," }
                                    { selectedDoctor?.settings.daysRange.indexOf("Wed") > -1 && "Mie," }
                                    { selectedDoctor?.settings.daysRange.indexOf("Thurs") > -1 && "Jue," }
                                    { selectedDoctor?.settings.daysRange.indexOf("Frid") > -1 && "Vie," }
                                    { selectedDoctor?.settings.daysRange.indexOf("Sat") > -1 && "Sab," }
                                    { selectedDoctor?.settings.daysRange.indexOf("Sun") > -1 && "Dom" }
                                </Typography>
                            </GridItem>
                            <GridItem style={{textAlign:"center"}}  item>
                                <Typography style={{fontWeight:"bold"}} color="error" gutterBottom variant="caption" >
                                   { minutesToHours(selectedDoctor?.settings.hoursRange[0])} - { minutesToHours(selectedDoctor?.settings.hoursRange[1]) }
                                </Typography>
                            </GridItem>
                        </Fragment>                        
                    }

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">        

                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Fecha para agendar cita"
                            format="MM/dd/yyyy"   
                            value={selectedDate}                       
                            onChange={(date)=>{
                                setAppointmentDate(null)
                                setSelectedDate(date)
                                //console.log("selectedDoctor",selectedDoctor)
                                getDaySchedule(selectedDoctor.id, moment(date).format("YYYY-MM-DD"), (success,error)=>{
                                    if(success){
                                        //console.log("success",success)

                                        const CavaliablesHours = []

                                        const defaultInterval = 60

                                        //console.log("selectedDoctor.settings",selectedDoctor.settings)

                                        let startTime = selectedDoctor.settings.hoursRange[0]

                                        const endTime = selectedDoctor.settings.hoursRange[1]

                                        //console.log(startTime,endTime)

                                        while( startTime <  endTime )
                                        {
                                            const hoursToSchedule = [startTime,startTime+defaultInterval]

                                            //console.log("hoursToSchedule",hoursToSchedule)

                                            let add = true
                                            // Number(time[0]*60) + Number(time[1])
                                            success.data.appointments && success.data.appointments.forEach( appointment => {
                                                //console.log(moment(appointment.appointmentDate).hour() + ':' + moment(appointment.appointmentDate).minutes())
                                                //console.log(Number(moment(appointment.appointmentDate).hour()*60) + Number(moment(appointment.appointmentDate).minutes()))
                                                
                                                const appointmentTime = Number(moment(appointment.appointmentDate).hour()*60) + Number(moment(appointment.appointmentDate).minutes())
                                                
                                                //console.log(appointmentTime,appointmentTime+60)

                                                if( ( hoursToSchedule[0] >= appointmentTime && hoursToSchedule[0] <= appointmentTime+60 )||
                                                    hoursToSchedule[1] >= appointmentTime && hoursToSchedule[1] <= appointmentTime+60 ){
                                                    add = false
                                                }
                                
                                            }) 

                                            success.data.annotations && success.data.annotations.forEach( annotation =>{
                                                //console.log(Number(moment(annotation.annotationDate).hour()*60) + Number(moment(annotation.annotationDate).minutes()))
                                                //console.log(Number(moment(annotation.annotationToDate).hour()*60) + Number(moment(annotation.annotationToDate).minutes()))

                                                const initialDate = Number(moment(annotation.annotationDate).hour()*60) + Number(moment(annotation.annotationDate).minutes())
                                                const endDate = Number(moment(annotation.annotationToDate).hour()*60) + Number(moment(annotation.annotationToDate).minutes())

                                                //console.log(initialDate,endDate)

                                                if( ( hoursToSchedule[0] >= initialDate && hoursToSchedule[0] <= endDate)||
                                                hoursToSchedule[1] >= initialDate && hoursToSchedule[1] <= endDate ){
                                                    add = false
                                                }
                                            })

                                            if(add){
                                                CavaliablesHours.push(hoursToSchedule)
                                            }

                                            startTime += defaultInterval
                                        }
                                        
                                        //console.log("avaliablesHours",CavaliablesHours)

                                        setAvaliableHours(CavaliablesHours)
                                        
                                    }
                                    if(error){
                                       Swal.fire("Oops","sucedio un error","error")
                                    }
                                })

                            }}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                            //minDate={ new moment().add('days', 1) }
                        />

                    </Grid>
                    </MuiPickersUtilsProvider>
                    
                    <Grid container style={{marginLeft:18}} >   
                    {
                        avaliableHours.map( avaliable => <Chip avatar={<DoneIcon/>} label={`${ minutesToHours(avaliable[0]) } -  ${ minutesToHours(avaliable[1]) }`}
                            onClick={()=>{
                                const formatedDate = moment(selectedDate).utcOffset(0)
                                formatedDate.set({hour:0,minute:0,second:0,millisecond:0})                                
                                const appointmentDate = formatedDate.add(avaliable[0], 'minutes').format("YYYY-MM-DD HH:mm:ss")
                                setAppointmentDate(appointmentDate)
                                setOpenForm(true);  
                            }}
                        style={{margin:5}}  variant="outlined" />  )
                    }
                    </Grid>

                </GridContainer>
            }

            </div>
          </Drawer>
        </React.Fragment>



        <React.Fragment>
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

        <SectionPatientForm  open={openForm} appointmentDate={appointmentDate} setOpen={(option)=>{
            setOpenForm(option);
        }} />
    
    
    </>
  );
}
