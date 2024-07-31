import supaBase from "../../../config/db";

export const bookAPI={
    table:'Book',
    async get(){
        return await supaBase.from(this.table).select('*');
    },
    async getById(id){
        return await supaBase.from(this.table).select().eq('id',id);
    },
    async add(data){
        return await supaBase.from(this.table).insert(data).select();
    },
    async delete(id){
        return await supaBase.from(this.table).delete().eq('id', id).select();
    },
    async update(id,data){
        return await supaBase.from(this.table).update(data).eq('id', id).select();
    }
}
