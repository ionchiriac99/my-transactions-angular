import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RoutingModule} from './routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {UnauthorizedInterceptor} from './interceptors/unauthorized.interceptor';

@NgModule({
	imports: [CommonModule, RoutingModule],
	exports: [RoutingModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: UnauthorizedInterceptor,
			multi: true,
		},
	],
	declarations: [],
})
export class CoreModule {}
