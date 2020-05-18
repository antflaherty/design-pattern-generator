import ClassStructure from './ClassStructure';

export default abstract class PatternSpec {
	protected classes: ClassStructure[] = [];

	public getClasses(): ClassStructure[] {
		return this.classes;
	}
}
