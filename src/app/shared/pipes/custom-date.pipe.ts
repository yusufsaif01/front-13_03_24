import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe as DatePipeAngular } from '@angular/common';
@Pipe({
  name: 'customDatePipe'
})
export class CustomDatePipe implements PipeTransform {
  transform(date: any): any {
    let created_at: any = new Date(date);
    let dateNow: any = new Date(Date.now());
    let diff = (dateNow - created_at.getTime()) / 1000;
    let second = Math.abs(Math.round(diff));
    diff = diff / 60;
    let minutes = Math.abs(Math.round(diff));
    diff = diff / 60;
    let hours = Math.abs(Math.round(diff));
    if (second < 60) {
      created_at = second <= 1 ? second + ' sec ago' : second + ' secs ago';
    }
    if (second >= 60 && minutes < 60) {
      created_at = minutes <= 1 ? minutes + ' min ago' : minutes + ' mins ago';
    }
    if (minutes >= 60 && hours < 24) {
      created_at = hours <= 1 ? hours + ' hour ago' : hours + ' hours ago';
    }
    if (hours >= 24) {
      let finalDate = new DatePipeAngular('en-US');
      created_at = finalDate.transform(created_at, 'MM-dd-yyyy');
    }
    return created_at;
  }
}
