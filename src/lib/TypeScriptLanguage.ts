import Language from './Language';
import { CodeSpec } from './CodeSpec';

export default class TypeScriptLanguage implements Language {
	public getClass(codeSpec: CodeSpec, code: string = ''): string {
		const classCode = this.prependVisibilityAndModifier(
			codeSpec,
			`class ${codeSpec.name} {\n${TypeScriptLanguage.indentCode(code)}\n}`
		);
		return classCode;
	}

	public getMethod(codeSpec: CodeSpec, code: string = ''): string {
		const params = codeSpec.params.map((p) => `${p.name}: ${p.type}`).join(', ');
		const method = `${codeSpec.name}(${params}): ${
			codeSpec.type
		} {\n${TypeScriptLanguage.indentCode(code)}\n}`;
		return this.prependVisibilityAndModifier(codeSpec, method);
	}

	public getVariable(codeSpec: CodeSpec): string {
		const basicDeclaration = `${codeSpec.name}: ${codeSpec.type};`;
		const variableCode = this.prependVisibilityAndModifier(codeSpec, basicDeclaration);
		return variableCode;
	}

	private static indentCode(code: string): string {
		return code
			.split('\n')
			.map((line) => `\t${line}`)
			.join('\n');
	}

	private prependVisibilityAndModifier(codeSpec: CodeSpec, code: string): string {
		return [codeSpec.visibility, codeSpec.modifier, code]
			.filter((property) => property)
			.join(' ')
			.trim();
	}
}
