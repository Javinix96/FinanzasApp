import { useEffect, useState } from "react";

export function GetTotal(expenses:any) {

     let total:number = 0;
     total = 0;
     expenses.forEach( (item:any) => {
          total += Number( item.amount);
     })
     return total;
}