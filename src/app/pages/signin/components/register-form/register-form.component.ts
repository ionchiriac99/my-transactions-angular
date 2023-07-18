import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {variables} from './../../../../../app/core/consts';
import {confirmPasswordValidator} from './../../../../../app/shared/validators/confirm-password.validator';
import {SnackbarRef} from './../../../../../app/shared/snackbar.component';

@Component({
	selector: 'register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./../../../../../assets/scss/form.scss'],
})
export class RegisterFormComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private readonly httpClient: HttpClient,
		private readonly router: Router,
		private readonly snackbar: SnackbarRef,
	) {}

	public ngOnInit(): void {
		const passwordControl = new FormControl('', [
			Validators.required,
			Validators.minLength(6),
			Validators.maxLength(256),
		]);
		this.form = new FormGroup({
			username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(256)]),
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
		const API = variables.API_SERVER;
		this.form.disable();

		const body = {
			username: this.form.get('username').value,
			password: this.form.get('password').value,
		};

		this.httpClient.post<null>(`${API}/api/auth/signup`, body).subscribe({
			next: () => {
				this.router.navigateByUrl('/signin');
				this.snackbar.open({
					panelClass: 'succes',
					data: {message: 'You have successfully registered.'},
					duration: 3000,
				});
			},
			error: (error: HttpErrorResponse) => {
				this.form.enable();
				if (error.status === 400) {
					this.form.get('username').setErrors({
						already_exists: true,
					});
				} else {
					this.snackbar.open({
						panelClass: 'error',
						data: {message: 'Something wrong!'},
						duration: 3000,
					});
				}
			},
		});
	}
}
