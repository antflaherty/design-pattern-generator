import { expect } from 'chai';
import 'mocha';
import TypeScriptLanguage from '../lib/TypeScriptLanguage';

const testMethod1 = `testMethod1(): void {}`;
const testMethod2 = `testMethod2():string { return "test"; }`;

describe('TypeScriptLanguage: getClass', () => {
	it('should return a properly formatted public class', () => {
		const codeSpec: any = {
			name: 'TestClass',
			visibility: 'public',
		};

		const code: string = `
		${testMethod1}
		${testMethod2}
		`.trim();

		const expectedClassLines = [
			`${codeSpec.visibility} class ${codeSpec.name} {`,
			`	${testMethod1}`,
			`	${testMethod2}`,
			`}`,
		];
		const expectedClass = expectedClassLines.join('\n');

		const language: TypeScriptLanguage = new TypeScriptLanguage();
		expect(language.getClass(codeSpec, code)).to.equal(expectedClass);
	});

	it('should return a properly formatted class if visibility is omitted', () => {
		const codeSpec: any = {
			name: 'TestClass',
			visibility: '',
		};

		const code: string = `
		${testMethod1}
		${testMethod2}
		`.trim();

		const expectedClassLines = [
			`class ${codeSpec.name} {`,
			`	${testMethod1}`,
			`	${testMethod2}`,
			`}`,
		];
		const expectedClass = expectedClassLines.join('\n');

		const language: TypeScriptLanguage = new TypeScriptLanguage();
		expect(language.getClass(codeSpec, code)).to.equal(expectedClass);
	});
});
