import { defineComponent,ref } from "vue"

type Setup<P extends Object = any, R = any> = (setup?: (props: P, setup: Setup<P>) => R) => R


type FunctionalComponent<P extends Object = any, R = any> = (props: P, setup: Setup<P, R>) => R

function FC<P extends Object = any, R = any>(functionalComponent: FunctionalComponent<P, R>) {
    return defineComponent({
        setup(props: any) {
            const setup: Setup = (fn) => fn?.(props, setup)
            return functionalComponent(props, setup)
        }
    })
}
const configProvider=()=>{
    const state=ref(0)
    function update(){
        state.value++
    }
    return [state, update]
}



const Test2 = FC<{ name: string }>((props, setup) => {
    const [num, update] = setup(configProvider)
    return ()=><div>
        <div>{num.value}</div>
        <button onClick={update}>update</button>
    </div>
})

export default Test2
