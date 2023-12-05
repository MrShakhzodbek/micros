export interface Category {
    id?: number;
    name: string;
    surname: string;
    dateBirthday: Date | string; 
    passportSeria: string;
    passportNumber: number | null | undefined;
    gender: string;
    checkbox: string | Object; 
}
export interface Documents {
    id?: number;
    typeDocument: string; 
    numberDocument: string | number; 
    dateDocument: Date | string; 
    description: string | number | undefined; 
    typeInvoices: string | undefined; 
    name: string;
    surname: string;
    secondName: string; 
}

