import React,{ useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import  api  from '../../../middleware/api'
import Swal from 'sweetalert2' 


export default function SectionPatientForm(props) {

  const { open, setOpen, appointmentDate, cityAppointment, doctorAppointment } = props;
  
  const handleClose = () => {
    setOpen(false);
  };

  const [typesId, setTypesId ] = useState([]);

  const [formData, setFormData ] = useState({
    name:"",
    lastName:"",
    typeId:"",
    identification:"",
    city:"",
    phone:"",
    ocupation:"",
    email:""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value 
    })
  }
 
  useEffect(() => {
    
    const getDocumentsTypes = async () => {
      const response = await api.getData("contactDocumentType") 

      let arrayData = [{label:"",value:""}]
      console.log(response.data)
      response.data.forEach( data => arrayData.push({label:data,value:data}) )
      setTypesId(arrayData)
    }

    getDocumentsTypes() 

  },[]);

  useEffect(()=>{

    if(appointmentDate){
      //console.log("appointmentDate",appointmentDate)
      setFormData({...formData,appointmentDate})
    }

    if(cityAppointment){
      setFormData({...formData,city:cityAppointment})
    }

  },[appointmentDate, cityAppointment])

  const formRef = useRef();

  const handleSaveAppointment = async (e) => {
    e.preventDefault()
    console.log("submit form",formData)
    const response = await api.postData("registerPatientWithAppointment", { ...formData, appointmentDate, city:cityAppointment, doctor:doctorAppointment  }) 
    console.log("response",response)
    if(response.status != 200)
    {
      alert("Sucedio un error")
    }else{
      setOpen("close")
      handleClose()
      if(response.data.status == "exists")
      {
        Swal.fire("Espera","ya tienes una cita asignada para este día","warning")
      }
      if(response.data.status == "ok")
      {
        Swal.fire("Cita agendada","espera a que nos comuniquemos contigo","success")
      }
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">¡Solo un paso mas!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Necesitamos los siguientes datos para agendarte la cita y comunicarnos contigo.
          </DialogContentText>
          
          <form  onSubmit={handleSaveAppointment} >

            <TextField  autoFocus  margin="dense" id="name" label="Correo electrónico" type="email" autoComplete={false}
             required fullWidth  name="email" onChange={handleChange}/>

            <TextField fullWidth label="Tipo de identificación" margin="dense" name="typeId" 
                required select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                //InputLabelProps={{ shrink: !!props.patientDetails.typeId }}                  
                variant="outlined"
                required
                name="typeId" onChange={handleChange}
              >
                {typesId.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
            </TextField>

     
            <TextField fullWidth label="Número de identificación"  margin="dense" name="identification" type="number"
                required variant="outlined" required autoComplete={false} onChange={handleChange}               
              />
          
            <TextField fullWidth label="Ocupación" margin="dense" name="ocupation" required variant="outlined"
             required autoComplete={false} onChange={handleChange} />

            <TextField fullWidth label="Número de teléfono" margin="dense" name="phone" type="number"
                required variant="outlined" required autoComplete={false} onChange={handleChange} />

            <TextField fullWidth label="Nombre" margin="dense" name="name" onChange={handleChange}
             required variant="outlined" required autoComplete={false} />

            <TextField fullWidth label="Apellidos" margin="dense" name="lastName" onChange={handleChange}
             required variant="outlined" required autoComplete={false} />

            <TextField
                fullWidth
                label="Sexo"
                margin="dense"
                name="sex"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <option  value={""}></option>
                <option key={"M"} value={"M"}>Masculino</option>
                <option key={"F"} value={"F"}>Femenino</option>
              
            </TextField>

            <input type="submit" ref={formRef} style={{visibility:"hidden"}} />

          </form>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
           formRef.current.click()
          }} color="primary">
            Agendar cita
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}