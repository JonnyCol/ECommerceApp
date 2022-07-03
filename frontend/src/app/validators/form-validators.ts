import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidators {

    // remove white space on form fields
    static whiteSpace(control: FormControl): ValidationErrors{
        // check white spaces in user input
        if((control.value != null) && (control.value.trim().length === 0)){
            //input is invalid
            return {'whiteSpace': true};
        }
        else{
            // input is valid
            return [];
        }
    }

    static notUSA(control: FormControl): ValidationErrors{
        //if()
        return [];

    }
}