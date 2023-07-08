import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function confirmPasswordValidator(password: AbstractControl): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		return control.value !== password.value ? {confirm_password: true} : null;
	};
}
