import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component} from '@angular/core';

@Component({
	selector: 'form-field-error',
	templateUrl: './form-field-error.component.html',
	styleUrls: ['./form-field-error.component.scss'],
	animations: [
		trigger('transitionMessages', [
			state('enter', style({opacity: 1, transform: 'translateY(0%)'})),
			transition('void => enter', [
				style({opacity: 0, transform: 'translateY(-5px)'}),
				animate('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
			]),
		]),
	],
})
export class FormFieldErrorComponent {}
