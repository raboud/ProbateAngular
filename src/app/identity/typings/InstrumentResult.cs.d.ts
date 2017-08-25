declare module server {
	interface RelatedInstruments {
		iID: number;
		book_id: number;
		book_related: string;
		page_first_related: string;
		book_name: string;
		inst_name: string;
		book_id_related: number;
	}
	interface InstrumentResult {
		forwardNames: string[];
		reverseNames: string[];
		image: string;
		pageCount: number;
		bookName: string;
		Instrument: string;
		Book: string;
		FirstPage: string;
		recorded: Date;
		message: string;
		related: server.RelatedInstruments[];
	}
}
