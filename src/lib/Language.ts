export default interface Language {
	getClass(codeSpec: { name: string; visibility: string }, code: string): string;
	getMethod(
		codeSpec: {
			name: string;
			visibility: string;
			type: string;
			params: { name: string; type: string }[];
		},
		code: string
	): string;
}
