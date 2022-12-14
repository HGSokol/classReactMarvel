import { Component } from 'react';

import MarvelService from '../../services/MarvelService.js';
import Spinner from '../spinner/Spinner.js';
import MarvelError from '../error/MarvelError.js';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component{
   constructor(props){
        super(props)
        this.state ={
            char: {},
            loading: true,
            error: false,
        }
   }
    componentDidMount = () => {
        this.getRandomCharacter()
    }


    marvelService = new MarvelService();
    
    onError = () => {
        this.setState({
            loading:false,
            error: true,
        })
    }
// spinner before render
    onLoading = () => {
        this.setState({
            loading: true,
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false,
        });
    }
    
    getRandomCharacter = () => {
        const id = Math.floor(Math.random()*(1011400 - 1011000) + 1011000)
        this.onLoading()
        this.marvelService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }  

    stateUp = () => {
        // this.props.stateLift(this.state.char.id)
        console.log(1)
    }

    render(){

        const {char, loading, error} = this.state;

        let errorMes = error? <MarvelError/>: null;
        let load = loading? <Spinner/>: null;
        let content = !error && !loading?  <View char={char} func={this.props}/>: null;
        return (
            <div className="randomchar">
                {/* условный рендеринг */ }
                {errorMes}
                {load}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner"
                            onClick = {this.getRandomCharacter}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

// простой рендарящий компонент
class View extends Component {
    constructor(props){
        super(props);
    }

    onClLoad = (id) => {
        this.props.func.stateLift(id)
    }

    render(){
        const {img, name, description, homepage, wiki, id} = this.props.char
        // console.log(this.props)
        return (
                <div className="randomchar__block" >
                    <img 
                        src={img} 
                        style={img.includes('image_not_available.jpg') ? {objectFit: "contain"} : {objectFit: "cover"}}
                        alt="Random character" className="randomchar__img"
                        onClick={() => this.onClLoad(id)}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {(description === undefined || description === '')?  'Not Found': `${description.slice(0,150)}...`}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
            )
    }
}

export default RandomChar;