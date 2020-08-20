import { User } from '../interfaces/user.interface';
import * as yup from 'yup';




export async function createUserValidation(data:User){
  
    
    let schema = yup.object().shape({
          nombre: yup.string().min(5).required(),
          apellido: yup.string().min(5).required(),
          email: yup.string().email().required(),
          password: yup.string().min(5).required(),
          nick: yup.string().min(5).required(),
        });

          schema.validateSync(data);
    
}


module.exports = {
    createUserValidation,

}