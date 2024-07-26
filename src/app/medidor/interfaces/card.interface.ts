export interface Card {
    title?: string;
    icon?: string;
    value: number;
    fecha: Date;
    className?: string,
    onAction?: () => void;
}