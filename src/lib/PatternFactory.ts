import Language from './Language';
import CodeSpecBuilder from './CodeSpecBuilder';
import { CodeSpec } from './CodeSpec';

export { Pattern, PatternFactory };

class PatternFactory {
	public getPatternByName(language: Language) {
		// This is just a template but will, in future, contain logic to get pattern by name
		return PatternFactory.getExamplePattern(language);
	}

	private static getExamplePattern(language: Language) {
		return new Pattern(language, new ExamplePatternSpec());
	}
}

class Pattern {
	private language: Language;
	private patternSpec: PatternSpec;

	public constructor(language: Language, patternSpec: PatternSpec) {
		this.language = language;
		this.patternSpec = patternSpec;
	}

	public build(): string[] {
		return this.patternSpec.getClasses().map(this.getClassesFromClassStructure);
	}

	private getClassesFromClassStructure(classStructure: ClassStructure): string {
		const variables = classStructure.getVariableSpecs().map(this.getVariableFromSpec);
		const methods = classStructure.getMethodSpecs().map(this.getMethodFromSpec);
		const classContent = [variables.join('\n'), methods.join('\n')].join('\n');
		return this.language.getClass(classStructure.getClassSpec(), classContent);
	}

	private getMethodFromSpec(methodSpec: CodeSpec): string {
		return this.language.getMethod(methodSpec, '/*STUB METHOD*/');
	}

	private getVariableFromSpec(variableSpec: CodeSpec): string {
		return this.language.getVariable(variableSpec);
	}
}

abstract class PatternSpec {
	protected classes: ClassStructure[] = [];

	public getClasses(): ClassStructure[] {
		return this.classes;
	}
}

class ExamplePatternSpec extends PatternSpec {
	public constructor() {
		super();
		const classSpec = CodeSpecBuilder.getClassSpecBuilder('ExamplePattern').build();
		const variableSpecs = [CodeSpecBuilder.getVariableSpecBuilder('name', 'string').build()];
		const methodSpecs = [CodeSpecBuilder.getMethodSpecBuilder('getName', 'string').build()];
		this.classes = [new ClassStructure(classSpec, variableSpecs, methodSpecs)];
	}
}

class ClassStructure {
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
