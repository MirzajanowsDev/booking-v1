import axios from "axios";

const ArticleService = {
    async getArticles(){
        const {data} =await axios.get('http://localhost:3200/articles')
        return data

    },
    async getArticlesDetail(slug){
        
        const {data} = await axios.get(`http://localhost:3200/articles/${slug}`)
        // const {data} = await axios.get(`/articles/${slug}`)
        return data
    },
    async postArticle(article){
        const {data} = await axios.post('http://localhost:3200/articles',article)
        return data
        // const {data} = await axios.post('/articles',{article})
        // return data
    },
    async postFavorite(slug,favorited){
        const {data} = await axios.post(`http://localhost:3200/favorite/`,favorited)
        console.log(data)
        return data
    },
    async patchArticle(id,article){
        const {data} = await axios.patch(`http://localhost:3200/articles/${id}`,article)
        return data

    },
    async deletArticle(id){
        const {data} = await axios.delete(`http://localhost:3200/articles/${id}`)
        return data
    },
    async SendArticleBusy(){
        const {data} = await axios
    }
   
}
export default ArticleService