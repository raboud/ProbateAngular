declare module server {
	interface DownLoadType {
		Type: string;
		Prompt: string;
	}
	interface CostAndBalanceResult {
		Cost: number;
		Balance: number;
		DownLoadTypes: server.DownLoadType[];
		UnlimitedAccount: boolean;
		PreviouslyDownloaded: boolean;
	}
	interface CostAndBalanceRequest {
		Type: string;
		Count: number;
	}
}
