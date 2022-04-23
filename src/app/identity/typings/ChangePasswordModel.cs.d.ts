export module server {
	export interface ChangePasswordModel {
		email: string;
		oldPassword: string;
		password: string;
	}
}
