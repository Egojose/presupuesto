export class PresupuestoAnio {
    constructor(
        public Ano: string,
        public Programa: string,
        public Valor: number,
        public ValorComprometido: number,
        public ValorDisponible: number,
        public ValorBloqueado: number,
        public Regional: string,
        public Area: string,
        public Cluster: string,
        public Id: number 
    ) {}

    public static fromJson(element: any) {
        return new PresupuestoAnio(
            element.Ano,
            element.Programa,
            element.Valor,
            element.ValorComprometido,
            element.ValorDisponible,
            element.ValorBloqueado,
            element.Regional,
            element.Area,
            element.Cluster,
            element.Id
        );
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}