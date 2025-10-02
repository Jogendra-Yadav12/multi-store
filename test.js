

function nes(n,t) {   
    for(let i= 0; i<n.length; i++){  // 2<4
        // i = 2 
        for(let j=i+1 ;j<n.length;j++){  //  j = 2 +1 = 3 
            sum = n[i] + n[j];  // 4 + 2 = 6 
            if(sum == t){
                return [i,j];
            }
        }
    }
}
const n = [5,6,4,2];
const t = 6;

// console.log(nes(n,t));

jk = 'jvdfjkd';

y = '';

for(let i = 1; i<(jk.length + 1) ; i++){  
     console.log(jk[i]);
}
if(y == jk){
    return true;
}else{
    return false;
}

