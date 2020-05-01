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

	public getMethod(
		codeSpec: {
			name: string;
			visibility: string;
			type: string;
			params: { name: string; type: string }[];
		},
		code: string
	): string {
		let methodCode = '';

		if (codeSpec.visibility) {
			methodCode = `${codeSpec.visibility} `;
		}

		methodCode += `${codeSpec.name}(`;

		if (codeSpec.params) {
			codeSpec.params.forEach((param) => {
				methodCode += `${param.name}: ${param.type}, `;
			});
			methodCode = methodCode.substr(0, methodCode.length - 2);
		}

		methodCode += `) {\n${this.indentCode(code)}\n}`;
		return methodCode;
	}

	private indentCode(code: string): string {
		const codeLines = code.split('\n');
		const indentedCodeLines = codeLines.map((line) => {
			return `\t${line}`;
		});
		return indentedCodeLines.join('\n');
	}
}
