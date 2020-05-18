import Language from './Language';
import CodeSpec from './CodeSpec';
import PatternSpec from './PatternSpec';
import ClassStructure from './ClassStructure';

export default class Pattern {
	private language: Language;
	private patternSpec: PatternSpec;

	private static stub = '/*STUB METHOD*/';

	public constructor(language: Language, patternSpec: PatternSpec) {
		this.language = language;
		this.patternSpec = patternSpec;
	}

	public build(): string[] {
		return this.patternSpec.getClasses().map(this.getClassesFromClassStructure);
	}

	private getClassesFromClassStructure = (classStructure: ClassStructure): string => {
		const variables = this.getVariablesFromSpecs(classStructure.getVariableSpecs());
		const methods = this.getMethodsFromSpecs(classStructure.getMethodSpecs());
		const classContent = [variables.join('\n'), methods.join('\n')].join('\n\n');
		return this.language.getClass(classStructure.getClassSpec(), classContent);
	};

	private getMethodsFromSpecs(methodSpecs: CodeSpec[]): string[] {
		return methodSpecs.map((spec: CodeSpec) => this.language.getMethod(spec, Pattern.stub));
	}

	private getVariablesFromSpecs(variableSpecs: CodeSpec[]): string[] {
		return variableSpecs.map((spec) => this.language.getVariable(spec));
	}
}
