

  export interface ChangePasswordModel {
		email: string;
		oldPassword: string;
		password: string;
	}

  export interface ConfirmEmailModel {
		userId: string;
		code: string;
		test: boolean;
		password: string;
	}
	export interface CreateAccountModel extends UserModel {
		AccountName: string;
		AccountManager: string;
	}

  export interface EnableUserModel {
		Id: string;
		Enabled: boolean;
	}

  export interface EnableUserModel {
		Id: string;
		Enabled: boolean;
	}

  export interface ForgotPasswordModel {
		Email: string;
		ForgotPasswordPage: string;
	}

  export interface RefreshToken {
		id: string;
		subject: string;
		clientId: string;
		issuedUtc: Date;
		expiresUtc: Date;
		protectedTicket: string;
	}

  export interface ResetPasswordModel {
		userId: string;
		password: string;
		confirmPassword: string;
		code: string;
	}

  export interface UpdateConfigModel {
		AllowAnonymousSearches: boolean;
		HomePageHtml: string;
		SiteName: string;
	}

  export interface UserModel {
		Email: string;
		/** [Required][StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)][DataType(DataType.Password)][Display(Name = "Password")]public string Password { get; set; } */
		ConfirmPage: string;
	}
