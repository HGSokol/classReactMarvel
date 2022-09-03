import React, { Component } from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import MarverlError from '../error/MarvelError'

import './charList.scss';
import CharInfo from '../charInfo/CharInfo';

class CharList extends Component{
    constructor(props){
        super(props);
        this.state ={
            item:[],
            loading: true,
            error:false,
            newItemLoading: false,
            offset: 700,
            charEnded: false,
        }
    }
   
    getNewState = (newCharlist) => {
        let ended = false;
        if( newCharlist.length < 9 ){
            ended = true;
        }

        this.setState(({offset, item}) => ({
            item: [...item,...newCharlist],
            loading: false,
            error: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }))
    }
    
    catchError = (error) => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    marvelService = new MarvelService()
    componentDidMount = () => {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.getNewState)
            .catch(this.catchError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,

        })
    }

    getAllCards = (item) => {
        const all = item.map(e =>{
           return(
                <li className="char__item"  key={e.id} onClick={() => this.props.stateLift(e.id)}>
                    <img src={e.img} alt="abyss"/>
                    <div className="char__name">{e.name}</div>
                </li>
           )
        })

        return (
            <>
                {all}
            </>
        )
    }

    render (){
        const {item, loading, error, offset, newItemLoading, charEnded} = this.state
        const allItems = this.getAllCards(item)
        const load = loading? <Spinner /> : null
        const errors = error? <MarverlError/>: null
        return (
            <div className="char__list">
                <ul className="char__grid" >
                    {load}
                    {errors}
                    {allItems}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charEnded? "none": "block"}}
                    onClick={() => this.onRequest(offset)}>
                        <div className="inner" >load more</div>
                </button>
            </div>
        )
    }
 
}

// test types
CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharList;