import Language from './Language';
import { CodeSpec } from './CodeSpec';

export default class TypeScriptLanguage implements Language {
	private codeSpec: CodeSpec;
	private code: string;

	public constructor(codeSpec: CodeSpec, code: string = '') {
		this.codeSpec = codeSpec;
		this.code = TypeScriptLanguage.indentCode(code);
	}

	public getClass(): string {
		const classCode = this.prependVisibilityAndModifier(
			`class ${this.codeSpec.name} {\n${this.code}\n}`
		);
		return classCode;
	}

	public getMethod(): string {
		const params = this.codeSpec.params.map((p) => `${p.name}: ${p.type}`).join(', ');
		const method = `${this.codeSpec.name}(${params}): ${this.codeSpec.type} {\n${this.code}\n}`;
		return this.prependVisibilityAndModifier(method);
	}

	public getVariable(): string {
		const basicDeclaration = `${this.codeSpec.name}: ${this.codeSpec.type};`;
		const variableCode = this.prependVisibilityAndModifier(basicDeclaration);
		return variableCode;
	}

	private static indentCode(code: string): string {
		return code
			.split('\n')
			.map((line) => `\t${line}`)
			.join('\n');
	}

	private prependVisibilityAndModifier(code: string): string {
		return [this.codeSpec.visibility, this.codeSpec.modifier, code]
			.filter((property) => property)
			.join(' ')
			.trim();
	}
}
