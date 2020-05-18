import CodeSpecBuilder from './CodeSpecBuilder';
import PatternSpec from './PatternSpec';
import ClassStructure from './ClassStructure';

export default class ExamplePatternSpec extends PatternSpec {
	public constructor() {
		super();
		const classSpec = CodeSpecBuilder.getClassSpecBuilder('ExamplePattern').build();
		const variableSpecs = [CodeSpecBuilder.getVariableSpecBuilder('name', 'string').build()];
		const methodSpecs = [CodeSpecBuilder.getMethodSpecBuilder('getName', 'string').build()];
		this.classes = [new ClassStructure(classSpec, variableSpecs, methodSpecs)];
	}
}
