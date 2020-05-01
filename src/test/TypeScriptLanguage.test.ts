import { expect } from 'chai';
import 'mocha';
import TypeScriptLanguage from '../lib/TypeScriptLanguage';

const testMethod1 = `testMethod1(): void {}`;
const testMethod2 = `testMethod2(): string { return "test"; }`;

describe('TypeScriptLanguage: getClass', () => {
	it('should return a properly formatted public class', () => {
		const codeSpec: any = {
			name: 'TestClass',
			visibility: 'public',
		};

		const codeLines: string[] = [`${testMethod1}`, `${testMethod2}`];
		const code = codeLines.join('\n');

		const expectedClassLines: string[] = [
			`${codeSpec.visibility} class ${codeSpec.name} {`,
			`\t${testMethod1}`,
			`\t${testMethod2}`,
			`}`,
		];
		const expectedClass = expectedClassLines.join('\n');
		console.log(expectedClass);
		const language: TypeScriptLanguage = new TypeScriptLanguage();
		expect(language.getClass(codeSpec, code)).to.equal(expectedClass);
	});

	it('should return a properly formatted class if visibility is omitted', () => {
		const codeSpec: any = {
			name: 'TestClass',
			visibility: '',
		};

		const codeLines: string[] = [`${testMethod1}`, `${testMethod2}`];
		const code = codeLines.join('\n');

		const expectedClassLines = [
			`class ${codeSpec.name} {`,
			`\t${testMethod1}`,
			`\t${testMethod2}`,
			`}`,
		];
		const expectedClass = expectedClassLines.join('\n');

		const language: TypeScriptLanguage = new TypeScriptLanguage();
		expect(language.getClass(codeSpec, code)).to.equal(expectedClass);
	});
});
