export class Ordering {
    static Asc = new Ordering('asc');
    static Desc = new Ordering('desc');

    constructor(name) {
        this.name = name;
    }
}
