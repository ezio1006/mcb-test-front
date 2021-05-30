export interface Transaction {
    type: string;
    reference: string;
    idCurrency: string;
    customerNumber: number;
    customerName: string;
    customerAddress: string;
    customerPhoneNumber: number;
    transferAmount: number;
    beneficiaryBank: string;
    beneficiaryAccountNumber: string;
    paymentDetails: string;
    cardDetails: string;
    idRegion: number
}

export const emptyTransaction: Transaction={
    type: null,
    reference: null,
    idCurrency: null,
    customerNumber: null,
    customerName: null,
    customerAddress: null,
    customerPhoneNumber: null,
    transferAmount: null,
    beneficiaryBank: null,
    beneficiaryAccountNumber: null,
    paymentDetails: null,
    cardDetails: null,
    idRegion: null,
}