declare module server {
	interface ChangePasswordModel {
		email: string;
		oldPassword: string;
		password: string;
	}
}
