interface Calculator {
    result(): Promise<any>;
}

export class Suma implements Calculator {
    private readonly numA: number;
    private readonly numB: number;

    constructor(numA: number, numB: number) {
        this.numA = numA;
        this.numB = numB
    }

    public async result(): Promise<number> {
        return this.numA + this.numB;
    }
}

export class Resta implements Calculator{
    private readonly numA: number;
    private readonly numB: number;

    constructor(numA: number, numB: number) {
        this.numA = numA;
        this.numB = numB
    }

    public async result(): Promise<number> {
        return this.numA - this.numB;
    }
}