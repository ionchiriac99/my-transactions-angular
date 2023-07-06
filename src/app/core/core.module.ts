import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RoutingModule} from './routing.module';

@NgModule({
	imports: [CommonModule, RoutingModule],
	exports: [RoutingModule],
	declarations: [],
	providers: [],
})
export class CoreModule {}
