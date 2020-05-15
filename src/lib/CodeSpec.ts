export { CodeSpec, Param };

class CodeSpec {
	public name: string;
	public modifier: string | undefined;
	public visibility: string | undefined;
	public type: string | undefined;
	public params: Param[] = [];

	public constructor(name: string) {
		this.name = name;
	}
}

type Param = {
	name: string;
	type: string;
};
