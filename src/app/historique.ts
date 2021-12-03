export class Historique {
    interventions:Intervention[] = [];
}

export class Intervention {
    idintervention:number=0;
    date:Date=new Date();
    localisation:string="";
    classefeu:string="";
    responsable:Responsable=new Responsable();
    porteurs:Porteur[]=[];
}

export class Responsable {
    idresponsable:number=0;
    grade:string="";
    name:string="";
    firstname:string="";
    born:Date=new Date();
    mail:String="";
    password:String="";
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
