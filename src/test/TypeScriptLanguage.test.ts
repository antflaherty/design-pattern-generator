import { expect } from 'chai';
import 'mocha';
import TypeScriptLanguage from '../lib/TypeScriptLanguage';

describe('TypeScriptLanguage: getClass', () => {
	const testMethod1 = `testMethod1(): void {}`;
	const testMethod2 = `testMethod2(): string { return "test"; }`;
	const code = getCodeBlock(testMethod1, testMethod2);

	it('should return a properly formatted public class', () => {
		const codeSpec: any = { name: 'TestClass', visibility: 'public' };

		const expectedClass = getExpectedCodeBlock(
			`${codeSpec.visibility} class ${codeSpec.name} {`,
			testMethod1,
			testMethod2
		);

		const language: TypeScriptLanguage = new TypeScriptLanguage(codeSpec, code);
		expect(language.getClass()).to.equal(expectedClass);
	});

	it('should return a properly formatted class if visibility is omitted', () => {
		const codeSpec: any = { name: 'TestClass', visibility: '' };

		const expectedClass = getExpectedCodeBlock(
			`class ${codeSpec.name} {`,
			testMethod1,
			testMethod2
		);

		const language: TypeScriptLanguage = new TypeScriptLanguage(codeSpec, code);
		expect(language.getClass()).to.equal(expectedClass);
	});
});

describe('TypeScriptLanguage: getMethod', () => {
	const testVariable1 = `const testVariable1: string = "This is a test";`;
	const testVariable2 = `let testVariable2: string = "This is also a test";`;
	const code = getCodeBlock(testVariable1, testVariable2);

	it('should return a properly formatted private method', () => {
		const codeSpec: any = {
			name: 'TestMethod',
			visibility: 'public',
			type: 'void',
			params: [],
		};

		const expectedMethod: string = getExpectedCodeBlock(
			`${codeSpec.visibility} ${codeSpec.name}(): ${codeSpec.type} {`,
			testVariable1,
			testVariable2
		);

		const language: TypeScriptLanguage = new TypeScriptLanguage(codeSpec, code);
		expect(language.getMethod()).to.equal(expectedMethod);
	});

	it('should return a properly formatted method if visibility is omitted', () => {
		const codeSpec: any = { name: 'TestMethod', visibility: '', type: 'string', params: [] };

		const expectedMethod: string = getExpectedCodeBlock(
			`${codeSpec.name}(): ${codeSpec.type} {`,
			testVariable1,
			testVariable2
		);

		const language: TypeScriptLanguage = new TypeScriptLanguage(codeSpec, code);
		expect(language.getMethod()).to.equal(expectedMethod);
	});
});

describe('TypeScriptLanguage: getVariable', () => {
	it('should return a properly formatted variable', () => {
		const codeSpec: any = { name: 'privateVariable', visibility: 'private', type: 'string' };

		const expectedVariable = `${codeSpec.visibility} ${codeSpec.name}: ${codeSpec.type};`;

		const language: TypeScriptLanguage = new TypeScriptLanguage(codeSpec);
		expect(language.getVariable()).to.equal(expectedVariable);
	});
});

function getCodeBlock(...lines: string[]) {
	return lines.join('\n');
}

function getExpectedCodeBlock(topLine: string, ...lines: string[]): string {
	const innerLines = lines.map((l) => `\t${l}`);
	const blockLines = [topLine].concat(innerLines).concat(['}']);
	return blockLines.join('\n');
}
