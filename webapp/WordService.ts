import axios from 'axios'

export default {
    async getWord() {
        try {
            let res = await axios.get(`http://localhost:3001/word`)
            // console.dir(res)
            return res.data
        } catch(e) {
            console.error(e)
        }
    }
}