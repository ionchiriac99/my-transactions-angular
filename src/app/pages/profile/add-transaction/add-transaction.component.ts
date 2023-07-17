import {HttpClient} from '@angular/common/http';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {variables} from './../../../../app/core/consts';

export enum TransactionType {
	EXPENSE,
	ENCASHMENT,
}

@Component({
	templateUrl: './add-transaction.component.html',
	styleUrls: ['./add-transaction.component.scss', './../../../../assets/scss/form.scss'],
})
export class AddTransactionComponent implements OnInit, OnDestroy {
	public TransactionType = TransactionType;
	public type = TransactionType.EXPENSE;
	public form: FormGroup;
	private subscriptions: Subscription[] = [];

	constructor(
		private httpClient: HttpClient,
		private readonly router: Router,
	) {}

	public ngOnInit(): void {
		this.form = new FormGroup({
			text: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(256),
				Validators.pattern(new RegExp(/^([0-9a-zA-Z\-_])+$/)),
			]),
			value: new FormControl(1, [Validators.required, Validators.min(0.1)]),
			createdAt: new FormControl('', [Validators.required]),
		});
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

	public submit(): void {
		this.form.disable();

		let obj;
		if (this.type === TransactionType.ENCASHMENT) {
			obj = {
				type: 'encashment',
			};
		} else {
			obj = {
				type: 'expense',
			};
		}

		const API_SERVER = variables.API_SERVER;
		const body = {...obj, ...this.form.value};

		const sub: Subscription = this.httpClient.post<null>(`${API_SERVER}/api/transaction`, body).subscribe({
			next: () => {
				console.log('succcesc add');
				this.router.navigateByUrl('/profile/all-transactions');
			},
			error: (err) => {
				this.form.enable();
				console.log('err: ', err);
			},
		});
		this.subscriptions.push(sub);
	}
}
