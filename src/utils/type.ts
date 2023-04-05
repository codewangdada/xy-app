export interface IResponse<T = any> {
	code: number;
	msg: string;
	data?: T;
	total? : number
}
