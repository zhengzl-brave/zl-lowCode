
const useComp = () => {
    const initRefList = (refList: any, ctx: any) => {
        if(refList !== null && ctx.props.widget.options.name) {
            refList[ctx.props.widget.options.name] = ctx
        }
    }

    return {
        initRefList
    }
}

export default useComp