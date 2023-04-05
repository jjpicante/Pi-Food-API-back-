const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;


const getApiInfo = async () => {
    try {
       // const infoApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const infoApi = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
        let response =  infoApi.data.results.map((result) => {
            return {
                id: result.id,
                name: result.title,
                image: result.image,
                summary: result.summary,
                healthScore: result.healthScore,
                steps: result.analyzedInstructions[0] &&
                result.analyzedInstructions[0].steps
                ? result.analyzedInstructions[0].steps
                    .map(elem => elem.step)
                    .join(" \n")
                : "Esta receta no tiene paso a paso",
                diets: result.diets    
                    }
                
            })
        
        return response

    } catch (error) {
        console.log({error: error.message})
    }
}

const searchByIdApi = async (id) => {
   
    try {
        const response = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=79e6ea57a4014ee8b14838fc4103dde1`);
        //const response = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=d400df556f96425fa0f8954e5685574f `);
        
        const result = {
            id: response.data.id,
            name: response.data.title,
            summary: response.data.summary,
            healthScore: response.data.healthScore,
            steps: response.data.analyzedInstructions[0] &&
            response.data.analyzedInstructions[0].steps
            ? response.data.analyzedInstructions[0].steps
                .map(elem => elem.number +"- "+ elem.step)
            : ["Esta receta no tiene paso a paso"],
            image: response.data.image,
            diets: response.data.diets
            
        };
        return result;
      } catch (error) {
        throw new Error ({error: error.message});
      }
    };


    module.exports = { getApiInfo, searchByIdApi }







  
















