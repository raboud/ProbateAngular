declare module server {
	interface DataField {
		displayName: string;
		field: string;
		sortable: boolean;
		cellFilter: string;
		width: string;
		cellTemplate: string;
	}
	interface BookType {
		Prompt: string;
		bktID: number;
	}
	interface SearchType {
		type: string;
		Prompt: string;
		DataFields: server.DataField[];
		StartDate: string;
		EndDate: string;
		ShowDescription: boolean;
		ShowBookNumber: boolean;
		ShowFirstPage: boolean;
		ShowDates: boolean;
		ShowPlat: boolean;
		bktID: number;
		Name1: string;
		Name2: string;
		ShowCaseRef: boolean;
		ShowCaseType: boolean;
	}
	interface SiteConfig {
		AllowAnonymousSearches: boolean;
		HideCopyright: boolean;
		HomePageHtml: string;
		SiteName: string;
		KioskMode: boolean;
		AllowNonIndexedSearch: boolean;
		AllowSelfRegistration: boolean;
		FirstPageLabel: string;
		searchTypes: server.SearchType[];
		BookTypes: server.BookType[];
	}
}
