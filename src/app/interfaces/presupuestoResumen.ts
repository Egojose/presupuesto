export class PresupuestoResumen {
    constructor(
        public Tipo: string,
        public Enero: string,
        public Febrero: string,
        public Marzo: string,
        public Abril: string,
        public Mayo: string,
        public Junio: string,
        public Julio: string, 
        public Agosto: string,
        public Septiembre: string,
        public Octubre: string,
        public Noviembre: string,
        public Diciembre: string
    ) {}

    public static fromJson(element: any) {
        let tipo = '';
        return new PresupuestoResumen(
            tipo,
            element.Enero,
            element.Febrero,
            element.Marzo,
            element.Abril,
            element.Mayo,
            element.Junio,
            element.Julio,
            element.Agosto,
            element.Septiembre,
            element.Octubre,
            element.Noviembre,
            element.Diciembre
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