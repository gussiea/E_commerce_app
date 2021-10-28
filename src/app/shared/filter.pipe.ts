import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../product.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  //value: products array
  //filterString: what i want to filt
  //propName: which property i want to filter out
  transform(value: any, filterString:string, propName:string ) {
    const result: any = [];
    //special case
    if (!value || filterString==="" || propName === ""){
      return value
    }
    //有点像再object中get key的value product['title'] 所以每次遍历的元素不能用product type
    //trim(): 删除字符串两端空白字符
    //includes(): 判断一个数组是否包含指定的值
    value.forEach((product:any) => {
      if(product[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(product);
      }
    });
    return result;
  }

}
