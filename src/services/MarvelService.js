

class MarvelService {
    _url = 'https://gateway.marvel.com:443/v1/public/';
    _key = '0978caa084dd68ce915e1e66d1fbdecb';
    _baseOffset = 700;
    
    getResources = async(url) =>{
        let res = await fetch(url)
    
        if(!res.ok) {
            console.log('Ошибка!')
        }
        return await res.json();
    }

    getAllCharacters = async(offset = this._baseOffset) => {
        const res = await this.getResources(`${this._url}characters?limit=9&offset=${offset}&apikey=${this._key}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async(id) => {
        const result = await this.getResources(`${this._url}characters/${id}?apikey=${this._key}`)
        return this._transformCharacter(result.data.results[0])
    }

    _transformCharacter = (result) =>{
        return {
            name: result.name,
            description: result.description,
            img: Object.values(result.thumbnail).join('.'),
            homepage: result.urls[0].url,
            wiki: result.urls[1].url,
            id: result.id,
            comics: result.comics.items
        }
    }

}

export default MarvelService;
