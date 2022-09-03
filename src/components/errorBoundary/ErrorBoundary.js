import { Component } from "react";

import MarvelError from '../error/MarvelError.js'

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    componentDidCatch(error, errorInfo){
        console.log(error)
        console.log(errorInfo)

        this.setState({
            error:true,
        })
    }

    render(){
        if(this.state.error){
            return <MarvelError/>
        } 

        return this.props.children;
    }
}

export default ErrorBoundary;