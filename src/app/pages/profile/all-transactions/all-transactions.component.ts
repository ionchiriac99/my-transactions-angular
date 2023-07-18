import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {variables} from './../../../../app/core/consts';
import {ITransaction} from './../../../../app/core/interfaces/transaction';
import {AccountService} from './../../../../app/core/services/account.service';
import {SnackbarRef} from './../../../../app/shared/snackbar.component';

@Component({
	templateUrl: './all-transactions.component.html',
	styleUrls: ['./all-transactions.component.scss'],
})
export class AllTransactionsComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];
	private API_SERVER: string = variables.API_SERVER;

	public selectedId: string;

	constructor(
		public accountService: AccountService,
		private readonly httpClient: HttpClient,
		private readonly snackbar: SnackbarRef,
	) {}

	public ngOnInit(): void {
		let sub: Subscription = this.httpClient.get<ITransaction[]>(`${this.API_SERVER}/api/transaction`).subscribe({
			next: (data) => {
				this.accountService.transactions = data;
			},
		});
		this.subscriptions.push(sub);
	}

	public ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

	public display(type: string, value: number): string {
		return type === 'expense' ? `-${value}` : `+${value}`;
	}

	public getBalance(): number {
		const balance = this.accountService.transactions.reduce(
			(acc, el) => (el.type === 'expense' ? (acc -= el.value) : (acc += el.value)),
			0,
		);

		return Number(balance.toFixed(2));
	}

	public delete(): void {
		if (this.selectedId) {
			const sub = this.httpClient
				.delete<null>(`${this.API_SERVER}/api/transaction/${this.selectedId}`)
				.subscribe({
					next: () => {
						this.snackbar.open({
							panelClass: 'succes',
							data: {message: 'You have successfully deleted the transaction.'},
							duration: 3000,
						});
						this.accountService.transactions = this.accountService.transactions.filter(
							(el) => el._id !== this.selectedId,
						);
					},
					error: () => {
						this.snackbar.open({
							panelClass: 'error',
							data: {message: 'Something wrong!'},
							duration: 3000,
						});
					},
				});
			this.subscriptions.push(sub);
		}
	}
}
