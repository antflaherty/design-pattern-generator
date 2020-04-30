class TypeScriptLanguage {
	getClass(codeSpec: { name: string }, code: string): string {
		const className = codeSpec.name;
		return `class ${className} {\n${code}\n}\n`;
	}
}
