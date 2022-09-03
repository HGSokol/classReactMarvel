import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component{

    state ={
        selectedChar: null,
    }

    stateLift = (id) => {
        this.setState({
            selectedChar: id,
        })
    }


    render(){
        const {selectedChar} = this.state
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar stateLift={this.stateLift}/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList stateLift={this.stateLift}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;