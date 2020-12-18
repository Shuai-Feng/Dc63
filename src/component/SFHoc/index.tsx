//导出高阶组件函数
//@ts-nocheck
function SFhoc(WapperCompoent) {


    let myhocPorps = {
        hoctitle:'123',
        showtime:()=>{
            console.log(+ new Date())
        },
        history:window.history
    }
    return porps=>{
        return <WapperCompoent {...myhocPorps}/>
    }
}

export default SFhoc
