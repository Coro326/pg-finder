// console.log("one");

// setTimeout(()=>{
//     console.log("hello");
// },6000);


//-------------callback-------------



// function sum(a, b) {
//     console.log(a + b)
// }

// function calculator(a,b,sum){
//     sum(a,b);
// }

// calculator(1,2,sum);



function getData(dataId,nextGetData){

    setTimeout(()=>{
        console.log(`data is ${dataId}`)
        if(nextGetData){
            nextGetData();
        }
    },3000);
}
getData(1,()=>{
    getData(2,()=>{
        getData(3,()=>{
            getData(4,()=>{
                getData(5)
            })
        })
    })

});