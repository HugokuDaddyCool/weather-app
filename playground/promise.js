var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve('Hey, it worked!');        
        reject('Unable to fulfill promise :(');        
    }, 2500);
    
});

var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500);
    });
}

somePromise.then((message) => {
    console.log('Success: ', message);
}, (message) => {
    console.log('Failure: ', message);
});

asyncAdd(5,'7').then((result) => {
    console.log(`Sum is ${result}`);
    return asyncAdd(result, 33);
}).then((result) => {
    console.log('Should be 45: ', result);
}).catch((errorMessage) => {
    console.log(errorMessage);
});