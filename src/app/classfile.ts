export class Historique {
    interventions:Intervention[] = [];
}

export class Intervention {
    idintervention:number=0;
    date:Date=new Date();
    localisation:string="";
    classefeu:string="";
    responsable:User=new User();
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

export class Responsable {
    idresponsable:number=0;
    grade:string="";
    name:string="";
    firstname:string="";
    born:Date=new Date();
}

export class Porteur {
    idporteur:number=0;
    barbe:boolean=false;
    gaz:number=0;
    masque:Masque=new Masque();
}

export class Masque {
    idmasque:number=0;
}
