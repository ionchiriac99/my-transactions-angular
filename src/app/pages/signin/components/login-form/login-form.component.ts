import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['././login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
	public form: FormGroup;

	constructor() {}

	public ngOnInit(): void {
		this.form = new FormGroup({
			username: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(256),
				Validators.pattern(/^([0-9a-zA-Z\-_])+$/),
			]),
			password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(256)]),
		});
	}
}
