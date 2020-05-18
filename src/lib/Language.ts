import CodeSpec from './CodeSpec';

export default interface Language {
	getClass(codeSpec: CodeSpec, code: string): string;
	getMethod(codeSpec: CodeSpec, code: string): string;
	getVariable(codesSpec: CodeSpec): string;
}
