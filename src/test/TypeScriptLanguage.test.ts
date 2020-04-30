import { expect } from 'chai';
import 'mocha';
import TypeScriptLanguage from '../lib/TypeScriptLanguage';

const testMethod1 = `testMethod1(): void {}`;
const testMethod2 = `testMethod2():string { return "test"; }`;

describe('Template: testMethod', () => {
	it('should return 0', () => {
		const codeSpec: any = {
			name: 'TestClass',
			visibility: 'public',
		};

		const code: string = `
    ${testMethod1}
    ${testMethod2}
    `.trim();

		const expectedClass = `
${codeSpec.visibility} class ${codeSpec.name} {
  ${code}
}
    `.trim();

		const language: TypeScriptLanguage = new TypeScriptLanguage();
		expect(language.getClass(codeSpec, code)).to.equal(expectedClass);
	});
});
