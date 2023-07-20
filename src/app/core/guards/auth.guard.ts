import {Injectable, inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, map} from 'rxjs';
import {AccountService} from '../services/account.service';

@Injectable({providedIn: 'root'})
class AuthPermissionsService {
	constructor(
		private readonly router: Router,
		private readonly accountService: AccountService,
	) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
		console.log(this.accountService.accountData$ == undefined);
		if (this.accountService.accountData$ == undefined) {
			if (this.accountService.logged) {
				return true;
			} else {
				this.router.navigateByUrl('/signin');
				return false;
			}
		} else {
			return this.accountService.accountData$.pipe(
				map(() => {
					if (this.accountService.logged) {
						return true;
					} else {
						this.router.navigateByUrl('/signin');
						return false;
					}
				}),
			);
		}
	}
}

export const AuthGuard: CanActivateFn = (
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
): boolean | Observable<boolean> => {
	return inject(AuthPermissionsService).canActivate(next, state);
};
