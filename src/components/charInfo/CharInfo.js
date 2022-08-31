import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner.js';
import MarvelError from '../error/MarvelError.js';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

class CharInfo extends Component{
    constructor(props){
        super(props);
        this.state ={
            char: null,
            loading: false,
            error: false,
        }
    }
    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(res => {
                this.setState({
                    char: res[Math.floor(Math.random()*res.length)],
                    loading: false,
                    error: false,
                })
            })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.charId !== this.props.charId){
            this.updateChar()
        }
    }

    // componentDidCatch(err, inf){
    //     console.log(err)
    //     console.log(inf)
    // }

    updateChar = () => {
        const {charId} = this.props
        if(!charId) {
            return;
        }
        this.onLoading();

        this.marvelService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

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

    
    render(){
        const {char, loading, error} = this.state
        const skeleton = (!char && !loading && !error)? <Skeleton/>: null 
        const errorMes = error? <MarvelError/>: null;
        const load = loading? <Spinner/>: null;
        const content = (!error && !loading && char)?  <View char={char}/>: null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMes}
                {load}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, img, homepage, wiki, description, comics} = char;

    const comicsV = (comic) => {
        const arr = comic.map((e,i) => {
            return (
                <li className="char__comics-item" key={i}>
                    <a href={e.resourceURI}>{e.name}</a>
                </li>
            )
        })
        return (
            <>
                {arr}
            </>
        )
    }
    const arr1 = comicsV(comics)

    return (
        <>
            <div className="char__basics">
                <img src={img} style={img.includes('image_not_available.jpg') ? {objectFit: "contain"} : {objectFit: "cover"}} alt={name}/>
                    <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                        </a>
                            <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
            {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    arr1.props.children.length === 0? 'There is no comics with this character': arr1.props.children.slice(0,10)
                }
            </ul>
        </>
    )
}


export default CharInfo;