export interface ITransaction {
	_id: string;
	account: string;
	text: string;
	type: string;
	value: number;
	createdAt: Date | string;
}
