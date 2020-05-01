import Language from './Language';

export default class TypeScriptLanguage implements Language {
	getClass(codeSpec: { name: string; visibility: string }, code: string): string {
		const classVisibilty = codeSpec.visibility;
		const className = codeSpec.name;
		return `
${classVisibilty} class ${className} {
  ${code}
}`.trim();
	}
}
