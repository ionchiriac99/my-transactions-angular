import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {confirmPasswordValidator} from 'src/app/shared/validators/confirm-password.validator';

@Component({
	selector: 'register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['././register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
	public form: FormGroup;

	constructor() {}

	public ngOnInit(): void {
		const passwordControl = new FormControl('', [
			Validators.required,
			Validators.minLength(6),
			Validators.maxLength(256),
		]);
		this.form = new FormGroup({
			username: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(256),
				Validators.pattern(/^([0-9a-zA-Z\-_])+$/),
			]),
			password: passwordControl,
			confirm_password: new FormControl('', [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(256),
				confirmPasswordValidator(passwordControl),
			]),
		});
	}
}
