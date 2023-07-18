import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {variables} from './../../../../../app/core/consts';
import {IToken} from './../../../../../app/core/interfaces/token';
import {TokenService} from './../../../../../app/core/services/token.service';
import {SnackbarRef} from './../../../../../app/shared/snackbar.component';

@Component({
	selector: 'login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./../../../../../assets/scss/form.scss'],
})
export class LoginFormComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private readonly httpClient: HttpClient,
		private readonly tokenService: TokenService,
		private readonly router: Router,
		private readonly snackbar: SnackbarRef,
	) {}

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

	public login(): void {
		const API = variables.API_SERVER;
		this.form.disable();
		const body = this.form.value;

		this.httpClient.post<IToken>(`${API}/api/auth/signin`, body).subscribe({
			next: (data: IToken) => {
				this.tokenService.store(data.jwt, data.exp);
				this.router.navigateByUrl('/profile');
				this.snackbar.open({
					panelClass: 'succes',
					data: {message: 'You have successfully logged in.'},
					duration: 3000,
				});
			},
			error: (error: HttpErrorResponse) => {
				this.form.enable();
				if (error.status === 401) {
					if (error.error.message === 'Incorrect username') {
						this.form.get('username').setErrors({
							incorrect_username: true,
						});
					} else if (error.error.message === 'Incorrect password') {
						this.form.get('password').setErrors({
							incorrect_password: true,
						});
					}
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
