import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterByText',
    pure: false               // explanation: http://stackoverflow.com/questions/34456430/ngfor-doesnt-update-data-with-pipe-in-angular2
})

export class FilterByTextPipe implements PipeTransform {

    transform(items: any[], args?: any): any {
        if (items.length === 0 ) {
            return items;
        } 

        return items.filter(item => { 
            return item.name.toLowerCase().indexOf(args.toLowerCase()) !== -1 || item.surname.toLowerCase().indexOf(args.toLowerCase()) !== -1;
        });

    }
}