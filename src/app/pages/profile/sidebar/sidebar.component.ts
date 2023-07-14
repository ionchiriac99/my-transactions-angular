import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Subscription, fromEvent} from 'rxjs';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
	@ViewChild('element', {static: true})
	private contentElement: ElementRef;
	private subscriptions: Subscription[] = [];
	private isOpen: boolean = false;
	private startPoint: number[];
	private endPoint: number[];

	constructor(
		private readonly ref: ElementRef,
		private readonly renderer: Renderer2,
	) {}

	public ngOnInit(): void {
		this.check();
		let sub: Subscription = fromEvent(window, 'resize').subscribe(this.check.bind(this));
		this.subscriptions.push(sub);

		sub = fromEvent<TouchEvent>(document, 'touchstart').subscribe((e: TouchEvent) => {
			this.startPoint = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
		});
		this.subscriptions.push(sub);

		sub = fromEvent<TouchEvent>(document, 'touchend').subscribe((e: TouchEvent) => {
			this.endPoint = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
			this.onTouch(this.startPoint, this.endPoint);
		});
		this.subscriptions.push(sub);
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

	public show(): void {
		if (this.isOpen) {
			return;
		}

		this.isOpen = true;
		this.renderer.addClass(this.ref.nativeElement, 'active');
		this.renderer.setStyle(this.contentElement.nativeElement, 'transform', 'translate(0%)');
	}

	public hide(): void {
		if (!this.isOpen) {
			return;
		}

		this.isOpen = false;
		this.renderer.setStyle(this.contentElement.nativeElement, 'transform', 'translate(-100%)');
		setTimeout(() => {
			this.renderer.removeClass(this.ref.nativeElement, 'active');
		}, 300);
	}

	private check(): void {
		if (window.innerWidth <= 768) {
			this.renderer.addClass(this.ref.nativeElement, 'available');
		} else {
			this.renderer.removeClass(this.ref.nativeElement, 'available');
			this.renderer.removeClass(this.ref.nativeElement, 'active');
		}
	}

	private onTouch(startPoint: number[], endPoint: number[]): void {
		const x1 = startPoint[0];
		const y1 = startPoint[1];

		const x2 = endPoint[0];
		const y2 = endPoint[1];

		const dx = Math.abs(x1 - x2);
		const dy = Math.abs(y1 - y2);

		if (dx > 2 * dy && dx > 150) {
			if (x2 > x1) {
				this.show();
			} else {
				this.hide();
			}
		}
	}
}
