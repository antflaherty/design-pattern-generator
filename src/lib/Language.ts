export default interface Language {
	getClass(codeSpec: { name: string; visibility: string }, code: string): string;
}
