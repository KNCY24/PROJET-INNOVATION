export class Historique {
    interventions:Intervention[] = [];
}

export class Intervention {
    idintervention:number=0;
    date:Date=new Date();
    localisation:string="";
    classefeu:string="";
    responsable:string="";
    porteurs:Porteur[]=[];
}

export class Users {
    users:User[] = [];
}

export class User {
    iduser:number=0;
    statut:string="";
    grade:string="";
    name:string="";
    firstname:string="";
    born:Date=new Date();
    mail:string="";
    password:string="";
    nouveau:boolean=false;
}

export class Porteur {
    idporteur:number=0;
    barbe:boolean=false;
    gaz:number=0;
    masque:number=0;
}

