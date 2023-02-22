//Objeto USUARIO
class User{
    constructor(obj){
        this._user = obj._user;
        this._mail = obj._mail;
        this._pass = obj._pass;
        this._date = obj._date;
        this._age = obj._age;
        this._tasks = [];
    }

    agregarTarea(content, type){
        this._tasks.push(new Tarea(content, type));
    }

    removerTarea(task){
        let arr = [];

        for (const e of this._tasks){
            if( e._content !== task){
                arr.push(e);
            }
        }
        this._tasks = arr;
    }
}

//objeto TAREA
class Tarea{
    constructor(content, type){
        this._type = type;
        this._content = content;
    }
}


