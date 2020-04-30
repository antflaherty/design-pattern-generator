import Language from './Language';

export default class TypeScriptLanguage implements Language {
	getClass(codeSpec: { name: string }, code: string): string {
		const className = codeSpec.name;
		return `class ${className} {\n${code}\n}\n`;
	}
}
