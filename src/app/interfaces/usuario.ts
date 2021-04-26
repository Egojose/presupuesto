export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public id: number
    ) {}

    public static fromJson(element: any) {
        return new Usuario(
            element.Title,
            element.EMail,
            element.Id, 
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