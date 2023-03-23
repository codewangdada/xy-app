export interface IResponse<T = any> {
	code?: number;
	status?: number;
	message: string;
	data: T;
	token?: string;
}
