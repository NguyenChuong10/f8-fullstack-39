

import Context from "./Context";



const Provider = ({children , store }) => {
    return(
        <Context.Provider value={store}>{children}</Context.Provider>
    )
}
export default Provider;