import { CodeSpec, Param } from './CodeSpec';

export { CodeSpecBuilder, ClassSpecBuilder, MethodSpecBuilder, VariableSpecBuilder };

abstract class CodeSpecBuilder {
	protected codeSpec: CodeSpec;

	public constructor() {
		this.codeSpec = new CodeSpec('');
	}

	public withName(name: string): CodeSpecBuilder {
		this.codeSpec = new CodeSpec(name);
		return this;
	}

	public withModifier(modifier: string): CodeSpecBuilder {
		this.codeSpec.modifier = modifier;
		return this;
	}

	public withVisibility(visibility: string): CodeSpecBuilder {
		this.codeSpec.visibility = visibility;
		return this;
	}

	public withType(type: string): CodeSpecBuilder {
		this.codeSpec.type = type;
		return this;
	}

	public withParams(params: Param[]): CodeSpecBuilder {
		this.codeSpec.params = params;
		return this;
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
