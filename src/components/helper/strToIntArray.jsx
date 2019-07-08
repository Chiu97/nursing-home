const strToIntArray = (str) => {
    let myArray = str.split(",");
    for(let i=0; i<myArray.length; i++){
        myArray[i] = +myArray[i];
    }
    return myArray;
}

export default strToIntArray;