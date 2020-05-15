import Language from './Language';
import { CodeSpec } from './CodeSpec';

export default class TypeScriptLanguage implements Language {
	public getClass(codeSpec: CodeSpec, code: string): string {
		const { modifier, name, visibility } = codeSpec;
		let classCode = '';

		if (visibility) {
			classCode += `${visibility} `;
		}

		if (modifier) {
			classCode += `${modifier} `;
		}

		classCode += `class ${name} {\n${this.indentCode(code)}\n}`;
		return classCode;
	}

	public getMethod(codeSpec: CodeSpec, code: string): string {
		const { modifier, name, params, type, visibility } = codeSpec;
		let methodCode = '';

		if (visibility) {
			methodCode += `${visibility} `;
		}

		if (modifier) {
			methodCode += `${modifier} `;
		}

		methodCode += `${name}(`;

		if (params) {
			params.forEach((param) => {
				methodCode += `${param.name}: ${param.type}, `;
			});
			methodCode = methodCode.substr(0, methodCode.length - 2);
		}

		methodCode += `): ${type} {\n${this.indentCode(code)}\n}`;
		return methodCode;
	}

	public getVariable(codeSpec: CodeSpec): string {
		const { visibility, modifier, name, type } = codeSpec;

		let variableCode = '';
		if (visibility) {
			variableCode += `${visibility} `;
		}

		if (modifier) {
			variableCode += `${modifier} `;
		}

		variableCode += `${name}: ${type};`;
		return variableCode;
	}

	private indentCode(code: string): string {
		const codeLines = code.split('\n');
		const indentedCodeLines = codeLines.map((line) => {
			return `\t${line}`;
		});
		return indentedCodeLines.join('\n');
	}
}
