
//每隔一段时间执行

const keepExec = () => {
    setTimeout( keepExec, 1000*10 );
    
    console.log('重新测试');
}

export default keepExec;