import { CodeSpec, Param } from './CodeSpec';

export { CodeSpecBuilder, ClassSpecBuilder, MethodSpecBuilder, VariableSpecBuilder };

abstract class CodeSpecBuilder {
	protected codeSpec: CodeSpec;

	public constructor() {
		this.codeSpec = new CodeSpec('');
	}

	public setName(name: string): void {
		this.codeSpec = new CodeSpec(name);
	}

	public setModifier(modifier: string): void {
		this.codeSpec.modifier = modifier;
	}

	public setVisibility(visibility: string): void {
		this.codeSpec.visibility = visibility;
	}

	public setType(type: string): void {
		this.codeSpec.type = type;
	}

	public setParams(params: Param[]): void {
		this.codeSpec.params = params;
	}
	abstract getCodeSpec(): CodeSpec;
}

class ClassSpecBuilder extends CodeSpecBuilder {
	public getCodeSpec(): CodeSpec {
		return this.codeSpec;
	}
}

class MethodSpecBuilder extends CodeSpecBuilder {
	public getCodeSpec(): CodeSpec {
		if (!this.codeSpec.type) {
			throw new Error('Return type required for methods');
		}
		return this.codeSpec;
	}
}

class VariableSpecBuilder extends CodeSpecBuilder {
	public getCodeSpec(): CodeSpec {
		if (!this.codeSpec.type) {
			throw new Error('Type required for variables');
		}
		return this.codeSpec;
	}
}
