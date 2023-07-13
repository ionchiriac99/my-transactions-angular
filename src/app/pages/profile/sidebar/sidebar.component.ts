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

	constructor(
		private readonly ref: ElementRef,
		private readonly renderer: Renderer2,
	) {}

	public ngOnInit(): void {
		this.check();
		const sub: Subscription = fromEvent(window, 'resize').subscribe(this.check.bind(this));
		this.subscriptions.push(sub);
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

	public show(): void {
		this.renderer.addClass(this.ref.nativeElement, 'active');
		this.renderer.setStyle(this.contentElement.nativeElement, 'transform', 'translate(0%)');
		document.documentElement.style.overflow = 'hidden';
	}

	public hide(): void {
		this.renderer.setStyle(this.contentElement.nativeElement, 'transform', 'translate(-100%)');
		document.documentElement.style.overflow = 'unset';
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
}
