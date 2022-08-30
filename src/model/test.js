let data = `{"code":"function main(a,b) { var x=0;      if(a.split().reverse().join(\'\')==a)     {             x=1;     }         if(x==1)    {        console.log(\"nohhhh\");    }    else    {         }}","language":"Java","questionid":10,"custominput":""}`;

let str = JSON.parse(data);

console.log(str);
