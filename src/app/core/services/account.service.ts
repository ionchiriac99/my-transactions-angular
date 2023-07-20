import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IAccount} from '../interfaces/account';
import {TokenEvents, TokenService} from './token.service';
import {variables} from '../consts';
import {ITransaction} from '../interfaces/transaction';
import {Observable, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AccountService {
	private initialized = false;

	public username: string;
	public logged: boolean = false;
	public transactions: ITransaction[] = [];
	public accountData$: Observable<any>;

	constructor(
		private tokenService: TokenService,
		private http: HttpClient,
	) {}

	public init(): void {
		if (this.initialized) return;

		this.initialized = true;

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

		this.accountData$ = this.http.get<IAccount>(`${API_SERVER}/api/auth/me`).pipe(
			tap((data: IAccount) => {
				this.accountData$ = undefined;
				this.username = data.username;
				this.logged = true;
			}),
		);

		this.accountData$.subscribe();
	}

	private unsetData() {
		this.username = undefined;
		this.logged = false;
	}
}
