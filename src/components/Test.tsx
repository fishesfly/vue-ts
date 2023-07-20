import { defineComponent } from "vue"

type Setup<P extends Object = any, R = any> = (setup?: (props: P, setup: Setup<P>) => R) => R


type FunctionalComponent<P extends Object = any, R = any> = (props: P, setup: Setup<P, R>) => R

function FC<P extends Object = any, R = any>(functionalComponent: FunctionalComponent<P, R>) {
    return defineComponent({
        setup(props: any) {
            const setup: Setup = (fn) => fn?.(props, setup)
            return () => functionalComponent(props, setup)
        }
    })
}

const Test2 = FC<{ name: string }>((props, setup) => {
    const num = setup((props, setup) => {
        const num2 = setup((props, setup) => {
            const num3 = setup(() => {
                return 3
            })
            return num3
        })
        return num2
    })
    return <div>{num}</div>
})

export default Test2
