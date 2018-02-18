export abstract class Configurable {
    constructor(
        public readonly name: string,
        public readonly label: string
    ) {
    }
}

export class SelectionConfigurable extends Configurable {
    constructor(name: string, label: string,
        public readonly options: string[]
    ) {
        super(name, label);
    }
}

export class SliderConfigurable extends Configurable {
    constructor(name: string, label: string,
        public readonly min = 0,
        public readonly max = 100
    ) {
        super(name, label);
    }
}

export class ColorConfigurable extends Configurable {
    constructor(name: string, label: string) {
        super(name, label);
    }
}