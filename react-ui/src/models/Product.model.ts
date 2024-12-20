import {Company} from "./Company.model.ts";

export interface Product {
    _id?: string | undefined;
    productName:string;
    productCategory:string;
    productAmount:number;
    productUnit:string;
    companyId:string | Company;
}
