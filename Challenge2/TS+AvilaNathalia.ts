import Operations from './operations/';

const operacion = async (numA: number, numB: number, op: string): Promise<any> => {
    let operation = null;
    switch (op) {
        case 'suma':
            operation = Operations.Suma;
            break
        case 'resta':
            operation = Operations.Resta;
            break
        default:
            return console.log('No existe esa operación')
    }
    return new operation(numA, numB).resultado();
}

const operaciones = async (numA: number, numB: number, op: string) => {
    const result = await operacion(numA, numB, op)
    console.log(result)
}

operaciones(1,2,'resta');
