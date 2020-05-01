import Language from './Language';

export default class TypeScriptLanguage implements Language {
	public getClass(codeSpec: { name: string; visibility: string }, code: string): string {
		const classVisibilty = codeSpec.visibility;
		const className = codeSpec.name;
		let classCode = '';

		if (classVisibilty) {
			classCode += `${classVisibilty} `;
		}
		classCode += `class ${className} {\n${this.indentCode(code)}\n}`;

		return classCode;
	}

	private indentCode(code: string): string {
		const codeLines = code.split('\n');
		const indentedCodeLines = codeLines.map((line) => {
			return `\t${line}`;
		});
		return indentedCodeLines.join('\n');
	}
}
