import axios from "axios"

export const ServicePrice = {
    async getPrice(){
        const {data} = await axios("http://localhost:3200/PriceRoom")
        return data
    },
    async getPriceDetail(id){
        const {data} = await axios(`http://localhost:3200/PriceRoom/${id}`,)
        return data
    },
    async PostPrice(id,post){
        const {data} = await axios.put(`http://localhost:3200/PriceRoom/${id}`,post)
        return data
    }
}