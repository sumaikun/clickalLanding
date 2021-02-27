import React,{useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderClickal.js";
import SectionPromo from "./Sections/SectionPromo.js";
import SectionServices from "./Sections/SectionServices";
import SectionExamples from "./Sections/SectionExamples.js";
import SectionDoctors from "./Sections/SectionDoctors";
import SectionForm from "./Sections/SectionForm";
import CustomInput from "components/CustomInput/CustomInput.js";
import People from "@material-ui/icons/People";
import InputAdornment from "@material-ui/core/InputAdornment";
import SectionDoctorsSearch from "./Sections/SectionDoctorsSearch";
import SectionDrawer from "./Sections/SectionDrawer";
//styles and assets
import styles from "assets/jss/material-kit-react/views/components.js";
import clickalLogo from "assets/branding/Clicalmedic/logoclic-02.png";

//Redux
import { connect } from 'react-redux';
import { getDoctors } from '../../actions/doctors'

//visual effects
import Grow from '@material-ui/core/Grow';

import './index.css';

const useStyles = makeStyles(styles);

function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const { doctors } = props

  const [inLayout, setInLayout] = React.useState(true);

  const [ doctorsSearched,setDoctorsSearched ] = React.useState([])

  useEffect(() => {
    props.getDoctors()

    //window.setTimeout(()=>{
      //document.getElementById("landing-container").classList.add("tiny");
    //},2000)

  },[]);

  const handleSearch = (searchText) => {

		/** Adding timeout to improve performance */

		if (window.typingTime) {
			clearTimeout(window.typingTime)
		}

		window.typingTime = setTimeout(() => {
      
      //console.log(searchText.length == 0)

      if( searchText.length == 0 )
      {
        setInLayout(true)
        document.getElementById("landing-container").classList.remove("tiny");
        setDoctorsSearched([])
      }
      else{
        setInLayout(false)
        document.getElementById("landing-container").classList.add("tiny");

        let searchDoctors = []

        doctors.map( doctor =>  {
          const map = {
            '-' : ' ',
            '-' : '_',
            'a' : 'á|à|ã|â|À|Á|Ã|Â',
            'e' : 'é|è|ê|É|È|Ê',
            'i' : 'í|ì|î|Í|Ì|Î',
            'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            'c' : 'ç|Ç',
            'n' : 'ñ|Ñ'
          };

          let textToSearch = searchText.toLowerCase()

          let cityName =  doctor.CityDetails[0]?.name?.toLowerCase()

          for (var pattern in map) {
            
            textToSearch = textToSearch.replace(new RegExp(map[pattern], 'g'), pattern)

            cityName = cityName.replace(new RegExp(map[pattern], 'g'), pattern)          

          }
          
          if(cityName.includes(textToSearch)){
            searchDoctors.push(doctor)
          }

          doctor.specialistDetails.map( specialist => {
            
            let name = specialist.name.toLowerCase()

            let meta = specialist.meta.toLowerCase()
  
            for (var pattern in map) {
  
              name = name.replace(new RegExp(map[pattern], 'g'), pattern)
              
              meta = meta.replace(new RegExp(map[pattern], 'g'), pattern)   
  
            }

            if( (name.includes(textToSearch) || meta.includes(textToSearch)) && !searchDoctors.includes(doctor)  ){
              searchDoctors.push(doctor)
            }

          })

          if(doctor.aboutDoctor.includes(textToSearch)){
            searchDoctors.push(doctor)
          }

        })

        setDoctorsSearched(searchDoctors)
      }
      
      window.typingTime = null
    
    }, 600)
		/** Adding timeout to improve performance */
	};


  return (
    <div>
      <Header
        brand="ClickalMedic"
        imageInLogo={clickalLogo}
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/clickalPresentation3.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Medicina al click</h1>
                <h3 className={classes.subtitle}>
                  Busca lo que necesitas aquí:
                </h3>
              </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={6} lg={6}>
              <CustomInput                  
                  labelText="Médico, Bogotá, terapeuta"
                  id="material"
                  formControlProps={{
                    fullWidth: true
                  }}
                  white={true}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <People style={{color:"white"}} />
                      </InputAdornment>
                    )
                  }}
                  onChange={ (e) => handleSearch(e.target.value) }
                />
            </GridItem>
          </GridContainer>          
        </div>
      </Parallax>

   

      <div className={classNames(classes.main, classes.mainRaised)} id="landing-container">

        <Grow in={!inLayout} >     
          <div style={{ display: !inLayout ?  "block":"none"  }} >
            <SectionDoctorsSearch doctors={doctorsSearched} />
          </div>
        </Grow>            

        <Grow in={inLayout} >        
          <div>
            <SectionExamples />
            <SectionServices />
            <SectionPromo />
            <SectionDoctors doctors={doctors} />
            <SectionForm/>
          </div>
        </Grow>             

      </div>
      
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  console.log("state",state)

  const { doctors } = state.doctors

  return {
    doctors  
  };
}

export default connect(mapStateToProps, { getDoctors } )(Components)