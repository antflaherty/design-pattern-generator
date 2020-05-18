import CodeSpec from './CodeSpec';

export default class ClassStructure {
	private classSpec: CodeSpec;
	private variableSpecs: CodeSpec[];
	private methodSpecs: CodeSpec[];

	public constructor(classSpec: CodeSpec, variableSpecs: CodeSpec[], methodSpecs: CodeSpec[]) {
		this.classSpec = classSpec;
		this.variableSpecs = variableSpecs;
		this.methodSpecs = methodSpecs;
	}

	public getClassSpec(): CodeSpec {
		return this.classSpec;
	}

	public getVariableSpecs(): CodeSpec[] {
		return this.variableSpecs;
	}

	public getMethodSpecs(): CodeSpec[] {
		return this.methodSpecs;
	}
}
