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
		const methodVisibilty = codeSpec.visibility;
		const methodName = codeSpec.name;
		const params = codeSpec.params;
		let methodCode = '';

		if (methodVisibilty) {
			methodCode = `${methodVisibilty} `;
		}

		methodCode += `${methodName}(`;

		if (params) {
			params.forEach((param) => {
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
