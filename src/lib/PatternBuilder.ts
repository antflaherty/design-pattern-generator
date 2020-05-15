import Language from './Language';
import CodeSpecBuilder from './CodeSpecBuilder';
import { CodeSpec } from './CodeSpec';

export { Pattern, PatternBuilder };

class PatternBuilder {
	public static getExamplePattern(language: Language) {
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
		return this.patternSpec.getClasses().map((classStructure) => {
			const variables = classStructure.getVariableSpecs().map((variableSpec) => {
				return this.language.getVariable(variableSpec);
			});

			const methods = classStructure.getMethodSpecs().map((methodSpec) => {
				return this.language.getMethod(methodSpec, '/*STUB METHOD*/');
			});

			return this.language.getClass(
				classStructure.getClassSpec(),
				[...variables, ...methods].join('\n')
			);
		});
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
		this.classes.push(
			new ClassStructure(
				CodeSpecBuilder.getClassSpecBuilder('ExamplePattern').build(),
				[
					CodeSpecBuilder.getVariableSpecBuilder('name', 'string')
						.withVisibility('private')
						.build(),
				],
				[CodeSpecBuilder.getMethodSpecBuilder('getName', 'string').build()]
			)
		);
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
