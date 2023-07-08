import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum TokenEvents {
	TOKEN_STORED,
	TOKEN_REMOVED,
}

@Injectable({ providedIn: 'root' })
export class TokenService {
	private eventsSubject: Subject<TokenEvents> = new Subject();
	public events$: Observable<TokenEvents> = this.eventsSubject.asObservable();

	public store(token: string, exp: number): any {
		localStorage.setItem('auth_token', token);
		localStorage.setItem('auth_exp', exp.toString());
		this.eventsSubject.next(TokenEvents.TOKEN_STORED);
	}

	public clear(): void {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('auth_exp');
		this.eventsSubject.next(TokenEvents.TOKEN_REMOVED);
	}

	public getToken(): object {
		const token = localStorage.getItem('auth_token');
		const exp = Number(localStorage.getItem('auth_exp'));
		const dateNow = Math.floor(Date.now() / 1000);

		if (token == null || exp == null || token == undefined) {
			return null;
		}

		if (exp < dateNow) {
			this.clear();
			return null;
		}

		return {
			token,
			exp,
		};
	}
}
