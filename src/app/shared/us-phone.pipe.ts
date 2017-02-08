import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'usPhone'
})
export class USPhonePipe {
    transform(phoneNumber: any[], args?: any): any {

        if (!phoneNumber) {
            return ''; 
        }

        var value = phoneNumber.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return phoneNumber;
        }

        var city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 3) + '-' + number.slice(3, 7);
            } else {
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        } else {
            return "(" + city;
        }
    }
}