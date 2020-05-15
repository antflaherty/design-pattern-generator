import Language from './Language';
import { CodeSpec } from './CodeSpec';

export default class TypeScriptLanguage implements Language {
	public getClass(codeSpec: CodeSpec, code: string): string {
		const classVisibilty = codeSpec.visibility;
		const classModifier = codeSpec.modifier;
		const className = codeSpec.name;
		let classCode = '';

		if (classVisibilty) {
			classCode += `${classVisibilty} `;
		}

		if (classModifier) {
			classCode += `${classModifier} `;
		}

		classCode += `class ${className} {\n${this.indentCode(code)}\n}`;
		return classCode;
	}

	public getMethod(codeSpec: CodeSpec, code: string): string {
		const methodVisibilty = codeSpec.visibility;
		const methodModifier = codeSpec.modifier;
		const methodName = codeSpec.name;
		const params = codeSpec.params;
		const returnType = codeSpec.type;
		let methodCode = '';

		if (methodVisibilty) {
			methodCode += `${methodVisibilty} `;
		}

		if (methodModifier) {
			methodCode += `${methodModifier} `;
		}

		methodCode += `${methodName}(`;

		if (params) {
			params.forEach((param) => {
				methodCode += `${param.name}: ${param.type}, `;
			});
			methodCode = methodCode.substr(0, methodCode.length - 2);
		}

		methodCode += `): ${returnType} {\n${this.indentCode(code)}\n}`;
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
