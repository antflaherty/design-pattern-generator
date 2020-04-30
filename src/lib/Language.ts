export default interface Language {
	getClass(codeSpec: { name: string }, code: string): string;
}
