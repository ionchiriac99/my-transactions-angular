import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {confirmPasswordValidator} from 'src/app/shared/validators/confirm-password.validator';
import {environment} from 'src/environments/environment.development';

@Component({
	selector: 'register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['././register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private readonly httpClient: HttpClient,
		private readonly router: Router,
	) {}

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

	public register(): void {
		const API = environment.API;
		this.form.disable();

		const body = {
			username: this.form.get('username').value,
			password: this.form.get('password').value,
		};

		this.httpClient.post<null>(`${API}/api/auth/signup`, body).subscribe({
			next: () => this.router.navigateByUrl('/signin'),
			error: (error: HttpErrorResponse) => {
				this.form.enable();
				console.log('err: ', error);
				if (error.status === 400) {
					this.form.get('username').setErrors({
						already_exists: true,
					});
				}
			},
		});
	}
}
