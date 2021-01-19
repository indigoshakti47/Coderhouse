const calculateModule = './operations.ts';

const operacion = async (numA: number, numB: number, op: string): Promise<any> => {
    let operation = null;
    switch (op) {
        case 'suma':
            operation = await import(calculateModule).then(m => m.Suma);
            break
        case 'resta':
            operation = await import(calculateModule).then(m => m.Resta);
            break
        default:
            return console.log('No existe esa operación')
    }
    return new operation(numA, numB).result();
}

const operaciones = async (numA: number, numB: number, op: string) => {
    const result = await operacion(numA, numB, op)
    console.log(result)
}
