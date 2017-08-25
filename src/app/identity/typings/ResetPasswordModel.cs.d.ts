declare module server {
	interface ResetPasswordModel {
		userId: string;
		password: string;
		confirmPassword: string;
		code: string;
	}
}
