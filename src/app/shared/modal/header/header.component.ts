import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Component({
	selector: 'modal-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class ModalHeaderComponent {
	@ViewChild('close', {static: true}) closeRef: ElementRef;

	private closeSubject: Subject<null> = new Subject();
	public close$: Observable<null> = this.closeSubject.asObservable();

	public onClose(): void {
		this.closeSubject.next(null);
	}
}
