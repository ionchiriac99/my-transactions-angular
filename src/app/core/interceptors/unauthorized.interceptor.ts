import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TokenService} from '../services/token.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
	constructor(
		private tokenService: TokenService,
		private router: Router,
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 401 || err.status == 403) {
						this.tokenService.clear();
						this.router.navigateByUrl('/signin');
					}
				}

				return throwError(() => err);
			}),
		);
	}
}
