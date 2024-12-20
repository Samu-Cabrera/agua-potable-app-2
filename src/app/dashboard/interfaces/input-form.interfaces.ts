export interface InputForm {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    defaultValue?: any;
    required?: boolean;
    class?: string;
    errorMessage?: string;
}