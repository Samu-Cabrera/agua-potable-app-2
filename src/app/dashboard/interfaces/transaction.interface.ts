export interface Transaction {
    _id:         string;
    type:        string;
    amount:      number;
    category:    string;
    description: string;
    date:        Date;
    createdAt:   Date;
    updatedAt:   Date;
}
