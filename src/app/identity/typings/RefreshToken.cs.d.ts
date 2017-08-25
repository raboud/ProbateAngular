declare module server {
	interface RefreshToken {
		id: string;
		subject: string;
		clientId: string;
		issuedUtc: Date;
		expiresUtc: Date;
		protectedTicket: string;
	}
}
