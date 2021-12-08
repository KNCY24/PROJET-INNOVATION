export class CSV{
    records:CSVRecord[]=[]
}

export class CSVRecord {
    barbe:boolean=true
    masque:number=0
    values:Values[]=[]
}

export class Values{
    temps:string=""
    gaz:number=0
}