import Language from './Language';
import Pattern from './Pattern';
import ExamplePatternSpec from './ExamplePatternSpec';

export default class PatternFactory {
	public getPatternByName(language: Language) {
		// This is just a template but will, in future, contain logic to get pattern by name
		return PatternFactory.getExamplePattern(language);
	}

	private static getExamplePattern(language: Language) {
		return new Pattern(language, new ExamplePatternSpec());
	}
}
