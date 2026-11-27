interface Entrada<T> {
  prioridad: number;
  valor: T;
}
export class HeapMaximo<T> {
  private nodos: Entrada<T>[] = [];
  agregar(valor: T, prioridad: number) {
    const entrada = { valor, prioridad };
    let i = this.nodos.length;
    this.nodos.push(entrada);
    while (i > 0) {
      const padre = Math.floor((i - 1) / 2);
      if (this.nodos[padre].prioridad >= prioridad) break;
      this.nodos[i] = this.nodos[padre];
      i = padre;
    }
    this.nodos[i] = entrada;
  }
  primero() {
    return this.nodos[0]?.valor;
  }
}
