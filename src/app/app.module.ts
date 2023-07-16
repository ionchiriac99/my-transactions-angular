import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {CoreModule} from './core/core.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
	imports: [BrowserModule, CoreModule, BrowserAnimationsModule, HttpClientModule],
	declarations: [AppComponent],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
