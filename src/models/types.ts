export interface Category {
    id?: number;
    name: string;
    surname: string;
    dateBirthday: Date | string; 
    passportSeria: string;
    passportNumber: number | null;
    gender: boolean;
    checkbox: { [key: string]: boolean | string }; 
}
export interface Documents {
    id?: number;
    typeDocument: string; 
    numberDocument: string; 
    dateDocument: Date; 
    description: string | number | undefined; 
    typeInvoices: string | undefined; 
    name: string;
    surname: string;
    secondName: string; 
}


// Enum for Document Type
export enum DocumentType {
    Invoice = 'счет-фактура',
    Authorization = 'доверенность'
}

// Enum for Invoice Type (applicable only if the document is an invoice)
export enum InvoiceType {
    Standard = 'стандартная',
    Additional = 'дополнительная'
}

// Base interface for common document fields
export interface Document {
    documentType: DocumentType; // Required (Тип документа)
    documentNumber: string; // Required (Номер документа)
    documentDate: Date | string; // Required (Дата документа)
    description: string; // Required (Описание)
}

// Interface for an Invoice document
export interface InvoiceDocument extends Document {
    invoiceType: InvoiceType; // Required if documentType is Invoice (Тип счет-фактуры)
}

// Interface for an Authorization document
export interface AuthorizationDocument extends Document {
    authorizedPersonFullName: string; // Required if documentType is Authorization (ФИО доверенного человека)
}

// Union type for any document type
export type AnyDocument = InvoiceDocument | AuthorizationDocument;