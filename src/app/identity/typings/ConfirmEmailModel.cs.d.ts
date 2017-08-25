declare module server {
	interface ConfirmEmailModel {
		userId: string;
		code: string;
		test: boolean;
		password: string;
	}
}
