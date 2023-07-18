import {Injectable} from '@angular/core';

export interface SnackbarConfig {
	panelClass: 'succes' | 'error';
	data: {message: string};
	duration: number;
}

@Injectable({providedIn: 'root'})
export class SnackbarRef {
	private _ref: HTMLDivElement;

	public open(data: SnackbarConfig): void {
		if (!this._ref) {
			const ref = document.createElement('div');
			ref.className = 'snackbars';
			document.body.appendChild(ref);
			this._ref = ref;
		}

		const snackbar = document.createElement('div');
		this._ref.appendChild(snackbar);

		const box = document.createElement('div');
		box.className = 'box';

		const p = document.createElement('p');
		p.innerHTML = data?.data.message;

		const span = document.createElement('span');
		span.className = 'material-icons';
		span.innerHTML = 'close';

		box.appendChild(p);
		box.appendChild(span);
		snackbar.appendChild(box);

		setTimeout(() => {
			snackbar.classList.add('active');
			snackbar.classList.add(data?.panelClass);
		}, 0);

		span.addEventListener('click', () => this.close(snackbar, span));

		setTimeout(() => {
			this.close(snackbar, span);
		}, data.duration);
	}

	public close(snackbar: HTMLDivElement, span: HTMLSpanElement): void {
		span.removeEventListener('click', () => this.close.bind(this));
		snackbar.className = snackbar.classList[1];
		setTimeout(() => {
			snackbar.remove();
		}, 300);
	}
}
