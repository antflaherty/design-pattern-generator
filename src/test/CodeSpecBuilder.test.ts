import { expect } from 'chai';
import 'mocha';
import CodeSpecBuilder from '../lib/CodeSpecBuilder';

describe('CodeSpecBuilder: getClassSpecBuilder', () => {
	it('should build a CodeSpec with supplied properties', () => {
		const name = 'MyClass';
		const visibility = 'public';

		const constructedCodeSpec = CodeSpecBuilder.getClassSpecBuilder(name)
			.withVisibility(visibility)
			.build();

		expect(constructedCodeSpec.name).to.equal(name);
		expect(constructedCodeSpec.visibility).to.equal(visibility);
	});
});

describe('CodeSpecBuilder: getMethodSpecBuilder', () => {
	it('should build a CodeSpec with supplied properties', () => {
		const name = 'MyClass';
		const visibility = 'private';
		const type = 'void';
		const params = [{ name: 'param', type: 'string' }];

		const constructedCodeSpec = CodeSpecBuilder.getMethodSpecBuilder(name, type)
			.withVisibility(visibility)
			.withParams(params)
			.build();

		expect(constructedCodeSpec.name).to.equal(name);
		expect(constructedCodeSpec.visibility).to.equal(visibility);
		expect(constructedCodeSpec.type).to.equal(type);
		expect(constructedCodeSpec.params).to.equal(params);
	});
});

describe('CodeSpecBuilder: getVariableSpecBuilder', () => {
	it('should build a CodeSpec with supplied properties', () => {
		const name = 'MyClass';
		const visibility = 'private';
		const modifier = 'static';
		const type = 'string';

		const constructedCodeSpec = CodeSpecBuilder.getVariableSpecBuilder(name, type)
			.withVisibility(visibility)
			.withModifier('static')
			.build();

		expect(constructedCodeSpec.name).to.equal(name);
		expect(constructedCodeSpec.visibility).to.equal(visibility);
		expect(constructedCodeSpec.type).to.equal(type);
		expect(constructedCodeSpec.modifier).to.equal(modifier);
	});
});
