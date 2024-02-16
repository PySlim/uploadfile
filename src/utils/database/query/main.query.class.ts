import InsertQuery from "./insert.query.class";
import SelectWhQuery from "./select.where.query.class";
import SelectQuery from "./select.query.class";
import UpdateQuery from "./update.query.class";
import PaginationQuery from "./pagination.query.class";
import SelectGroupBy from "./select.group.by";
import SelectInQueryClass from "./select.in.query.class";
import SelectInnerQueryClass from "./select.inner.query.class";

class MainQuery{

    public insert: InsertQuery;
    public update: UpdateQuery;
    public select: SelectQuery;
    public selectWh: SelectWhQuery;
    public table : string;
    public pagination : PaginationQuery;
    public selectGroupBy: SelectGroupBy;
    public selectIn: SelectInQueryClass;
    public  selectJoin: SelectInnerQueryClass;

    constructor(table: string){
        this.table=table;
        this.insert = new InsertQuery(this.table);
        this.update = new UpdateQuery(this.table);
        this.select = new SelectQuery(this.table);
        this.selectWh = new SelectWhQuery(this.table);
        this.pagination = new PaginationQuery(this.table);
        this.selectGroupBy = new SelectGroupBy(this.table);
        this.selectIn = new SelectInQueryClass(this.table);
        this.selectJoin = new SelectInnerQueryClass(this.table);
    }
}

export default MainQuery;
