import { Pipe, PipeTransform } from '@angular/core';
import { Usuario, User } from '../interfaces/user.interface';

@Pipe({
    name: 'photo',
    standalone: true
}) 
export class PhotoPipe implements PipeTransform {
    transform(user: Usuario | User ): string {
        if(user.imagen === ''){
            return 'https://th.bing.com/th/id/OIG1.FWCfEKjDBNu4.SIQYnrd?pid=ImgGn';
        }

        return user.imagen;
    }
}