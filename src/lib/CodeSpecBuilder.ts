import { CodeSpec, Param } from './CodeSpec';

export default class CodeSpecBuilder {
	private name: string = '';
	private modifier: string = '';
	private visibility: string = '';
	private type: string = '';
	private params: Param[] = [];

	public static getClassSpecBuilder(name: string) {
		const builder = new CodeSpecBuilder().withName(name).withVisibility('public');
		return builder;
	}

	public static getMethodSpecBuilder(name: string, type: string) {
		const builder = new CodeSpecBuilder()
			.withName(name)
			.withType(type)
			.withVisibility('public');
		return builder;
	}

	public static getVariableSpecBuilder(name: string, type: string) {
		const builder = new CodeSpecBuilder()
			.withName(name)
			.withType(type)
			.withVisibility('private');
		return builder;
	}

	private constructor() {}

	public withName(name: string): CodeSpecBuilder {
		this.name = name;
		return this;
	}

	public withModifier(modifier: string): CodeSpecBuilder {
		this.modifier = modifier;
		return this;
	}

	public withVisibility(visibility: string): CodeSpecBuilder {
		this.visibility = visibility;
		return this;
	}

	public withType(type: string): CodeSpecBuilder {
		this.type = type;
		return this;
	}

	public withParams(params: Param[]): CodeSpecBuilder {
		this.params = params;
		return this;
	}

	public build() {
		const codeSpec = new CodeSpec(this.name);
		codeSpec.modifier = this.modifier;
		codeSpec.visibility = this.visibility;
		codeSpec.type = this.type;
		codeSpec.params = this.params;
		return codeSpec;
	}
}
