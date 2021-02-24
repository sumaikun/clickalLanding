import React,{ useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import  api  from '../../../middleware/api'


export default function SectionPatientForm(props) {

  const { open, setOpen, appointmentDate } = props;

  
  const handleClose = () => {
    setOpen(false);
  };

  const [typesId, setTypesId ] = useState([]);

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

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">¡Solo un paso mas!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Necesitamos los siguientes datos para agendarte la cita y comunicarnos contigo.
          </DialogContentText>
          
          <form>

            <TextField  autoFocus  margin="dense" id="name" label="Correo electrónico" type="email" autoComplete={false} fullWidth />

            <TextField fullWidth label="Tipo de identificación" margin="dense" name="typeId" 
                required select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                //InputLabelProps={{ shrink: !!props.patientDetails.typeId }}                  
                variant="outlined"
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
                required variant="outlined" autoComplete={false}                
              />
          
            <TextField fullWidth label="Ocupación" margin="dense" name="ocupation" required variant="outlined" autoComplete={false} />

            <TextField fullWidth label="Número de teléfono" margin="dense" name="phone" type="number"
                required variant="outlined" autoComplete={false} />

            <TextField fullWidth label="Nombre" margin="dense" name="name" required variant="outlined" autoComplete={false} />

            <TextField fullWidth label="Apellidos" margin="dense" name="lastName" required variant="outlined" autoComplete={false} />

          </form>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Agendar cita
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}