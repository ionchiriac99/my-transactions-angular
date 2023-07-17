import {Component, ContentChild, ElementRef, OnDestroy, AfterViewInit, Renderer2} from '@angular/core';
import {ModalHeaderComponent} from './header/header.component';
import {Subscription} from 'rxjs';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit, OnDestroy {
	private subscriptions: Subscription[] = [];

	@ContentChild(ModalHeaderComponent)
	private header: ModalHeaderComponent;

	constructor(
		private readonly ref: ElementRef,
		private readonly renderer: Renderer2,
	) {}

	public ngAfterViewInit(): void {
		if (this.header) {
			const sub: Subscription = this.header.close$.subscribe(this.close.bind(this));
			this.subscriptions.push(sub);
		}
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

	public open(): void {
		this.renderer.addClass(this.ref.nativeElement, 'active');
	}

	public close(): void {
		this.renderer.removeClass(this.ref.nativeElement, 'active');
	}
}
