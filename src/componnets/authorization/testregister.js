import axios from "axios";

export async function testuser(name,password){

        const {data} = await axios(`http://localhost:3200/users?username=${name}&password=${password}`)
        return data
        
    
}