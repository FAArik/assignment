import {Company} from "./Company.model.ts";
import {Product} from "./Product.model.ts";

export interface CompanyModalFormProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (company: Company) => void;
    currentItem?: Company | null;
}
export interface ProductModalFormProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (product: Product) => void;
    currentItem?: Product | null;
}