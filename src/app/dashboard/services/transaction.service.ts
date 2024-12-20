import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "../interfaces/transaction.interface";

interface TransactionData {
    type: string;
    amount: number;
    category: string;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private readonly _http = inject(HttpClient);
    private readonly _api = 'http://localhost:3000';

    createTransaction(data: TransactionData): Observable<any>{
        const uri = `${ this._api }/api/transactions/`;
        return this._http.post<any>(uri, data);
    }
    getTransactions(): Observable<Transaction[]>{
        const uri = `${ this._api }/api/transactions/`;
        return this._http.get<Transaction[]>(uri);
    }

    getTransitionById(id: string): Observable<Transaction>{
        const uri = `${ this._api }/api/transactions/${ id }`;
        return this._http.get<Transaction>(uri);
    }

    putTransitionById(id: string, data: any): Observable<Transaction>{
        const uri = `${ this._api }/api/transactions/${ id }`;
        return this._http.put<Transaction>(uri, data);
    }

    deleteTransactions(id: string): Observable<any>{
        const uri = `${ this._api }/api/transactions/${ id }`;
        return this._http.delete<any>(uri);
    }
}