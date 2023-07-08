import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IToken} from 'src/app/core/interfaces/token';
import {TokenService} from 'src/app/core/services/token.service';
import {environment} from 'src/environments/environment.development';

@Component({
	selector: 'login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['././login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
	public form: FormGroup;

	constructor(
		private readonly httpClient: HttpClient,
		private readonly tokenService: TokenService,
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
		const API = environment.API;
		this.form.disable();
		const body = this.form.value;

		this.httpClient.post<IToken>(`${API}/api/auth/signin`, body).subscribe({
			next: (data: IToken) => {
				this.tokenService.store(data.jwt, data.exp);
				// TODO refirect to profile page
				console.log('redirect to profile');
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
				}
			},
		});
	}
}