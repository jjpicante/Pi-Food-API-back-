const { Recipe, Diets } = require('../db');

const getInfoDb = async () => {
    try {
        const infoDb = await Recipe.findAll({
            include: {
                model: Diets,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });

        let response = infoDb?.map((result) => {
            return {
                id: result.id,
                name: result.name,
                image: result.image,
                summary: result.summary,
                healthScore: result.healthScore,
                steps: result.steps,
                diets: result.Diets.map(elem => elem.name),                                   
                createdInDb: result.createdInDb
            }
        })
    
        return response
        

    } catch (error) {
        console.log({ error: error.message });
    }
}

const searchByIdDb = async (id) => {
   try {
       const recipesBd = await Recipe.findByPk(id,{include: {
           model: Diets,
           attributes: ['name'],
           through: {
               attributes: [],
           }
       }})
       return {
           id: recipesBd.id,
           name: recipesBd.name,
           summary: recipesBd.summary,
           healthScore: recipesBd.healthScore,
           steps: recipesBd.steps,
           image: recipesBd.image,
           diets: recipesBd.Diets.map(elem => elem.name)
       }
    } catch (error) {
        console.log({error: error.message})
    
   }
   

}
module.exports = { getInfoDb, searchByIdDb };
