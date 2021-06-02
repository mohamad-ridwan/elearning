import PathProvider from "./path"

const IndexProvider = ({ children }) => {
    return (
        <>
            <PathProvider>
                {children}
            </PathProvider>
        </>
    )
}

export default IndexProvider;