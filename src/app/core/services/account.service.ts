import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IAccount} from '../interfaces/account';
import {TokenEvents, TokenService} from './token.service';
import {variables} from '../consts';

@Injectable({providedIn: 'root'})
export class AccountService {
	public username: string;
	public logged: boolean = false;

	constructor(
		private tokenService: TokenService,
		private http: HttpClient,
	) {}

	public init(): void {
		if (this.tokenService.getToken()) {
			this.getAccountData();
		}

		this.tokenService.events$.subscribe((event: TokenEvents) => {
			if (event === TokenEvents.TOKEN_STORED) {
				this.getAccountData();
			}

			if (event === TokenEvents.TOKEN_REMOVED) {
				this.unsetData();
			}
		});
	}

	public logout(): void {
		this.unsetData();
		this.tokenService.clear();
	}

	public getAccountData(): void {
		const API_SERVER = variables.API_SERVER;

		this.http.get<IAccount>(`${API_SERVER}/api/auth/me`).subscribe((data: IAccount) => {
			this.username = data.username;
			this.logged = true;
		});
	}

	private unsetData() {
		this.username = undefined;
		this.logged = false;
	}
}
