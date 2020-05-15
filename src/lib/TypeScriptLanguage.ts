import Language from './Language';
import { CodeSpec } from './CodeSpec';

export default class TypeScriptLanguage implements Language {
	public getClass(codeSpec: CodeSpec, code: string): string {
		const { modifier, name, visibility } = codeSpec;

		const classCode = this.prependVisibilityAndModifier(
			`class ${name} {\n${this.indentCode(code)}\n}`,
			visibility,
			modifier
		);
		return classCode;
	}

	public getMethod(codeSpec: CodeSpec, code: string): string {
		const { modifier, name, params, type, visibility } = codeSpec;

		let methodCode = `${name}(`;
		if (params) {
			params.forEach((param) => {
				methodCode += `${param.name}: ${param.type}, `;
			});
			methodCode = methodCode.substr(0, methodCode.length - 2);
		}
		methodCode += `): ${type} {\n${this.indentCode(code)}\n}`;

		methodCode = this.prependVisibilityAndModifier(methodCode, visibility, modifier);
		return methodCode;
	}

	public getVariable(codeSpec: CodeSpec): string {
		const { visibility, modifier, name, type } = codeSpec;

		const variableCode = this.prependVisibilityAndModifier(
			`${name}: ${type};`,
			modifier,
			visibility
		);
		return variableCode;
	}

	private indentCode(code: string): string {
		const codeLines = code.split('\n');
		const indentedCodeLines = codeLines.map((line) => {
			return `\t${line}`;
		});
		return indentedCodeLines.join('\n');
	}

	private prependVisibilityAndModifier(
		code: string,
		visibility?: string,
		modifier?: string
	): string {
		if (modifier) {
			code = `${modifier} ${code}`;
		}

		if (visibility) {
			code = `${visibility} ${code}`;
		}

		return code;
	}
}
