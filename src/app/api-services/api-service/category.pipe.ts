import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'category' })
export class CategoryPipe implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if (searchText == null) return categories;

    return categories.filter(function (category) {
      return (!category.acc_name) ? false : 
              (category.acc_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 
              || category.g_acc_id.indexOf(searchText) > -1);
    })
  }
}
