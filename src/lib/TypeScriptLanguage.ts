import Language from './Language';
import { CodeSpec } from './CodeSpec';

export default class TypeScriptLanguage implements Language {
	public getClass(codeSpec: CodeSpec, code: string = ''): string {
		code = TypeScriptLanguage.indentCode(code);
		const classDeclaration = `class ${codeSpec.name} {\n${code}\n}`;
		return TypeScriptLanguage.prependVisibilityAndModifier(codeSpec, classDeclaration);
	}

	public getMethod(codeSpec: CodeSpec, code: string = ''): string {
		code = TypeScriptLanguage.indentCode(code);
		const params = codeSpec.params.map((p) => `${p.name}: ${p.type}`).join(', ');
		const method = `${codeSpec.name}(${params}): ${codeSpec.type} {\n${code}\n}`;
		return TypeScriptLanguage.prependVisibilityAndModifier(codeSpec, method);
	}

	public getVariable(codeSpec: CodeSpec): string {
		const basicDeclaration = `${codeSpec.name}: ${codeSpec.type};`;
		return TypeScriptLanguage.prependVisibilityAndModifier(codeSpec, basicDeclaration);
	}

	private static indentCode(code: string): string {
		return code
			.split('\n')
			.map((line) => `\t${line}`)
			.join('\n');
	}

	private static prependVisibilityAndModifier(codeSpec: CodeSpec, code: string): string {
		return [codeSpec.visibility, codeSpec.modifier, code]
			.filter((property) => property)
			.join(' ')
			.trim();
	}
}
