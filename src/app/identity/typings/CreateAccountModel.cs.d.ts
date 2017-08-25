declare module server {
	interface CreateAccountModel extends UserModel {
		AccountName: string;
		AccountManager: string;
	}
}
