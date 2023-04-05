const { getApiInfo, searchByIdApi } = require('./api')
const { getInfoDb, searchByIdDb } = require('./db')
const { Recipe, Diets } = require('../db');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getAllInfo = async () => {
    try {
        const infoApi = await getApiInfo();
        const infoDb = await getInfoDb();
        const allInfo = infoApi.concat(infoDb);

        return allInfo
    }
    catch (error) {
        console.log({error: error.message});
    }
}


const searchById = async (id) => {
    try {
        return (id.includes("-"))
            ? await searchByIdDb(id)
            : await searchByIdApi(id)
    } catch (error) {
        console.log({ error: error.message })
    }
}

const getDiets = async () => {
    try {
       // const infoApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const infoApi = await axios(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`);
        
        response = infoApi.data.results
            
        const dietas = [...new Set(response.flatMap(obj => obj.diets))];

        const dietasfindorcreate = await Promise.all(dietas.map(elem => Diets.findOrCreate({
            where: { name: elem },
            defaults: { name: elem }
        })))
        const dietasaDB = dietasfindorcreate.map(elem => elem[0])
        
        return dietasaDB    
    }
        
    catch (error) {
        console.log({error: error.message})
    }
}


const createRecipe = async (name, image, summary, healthScore, steps, diets) => {
    try {
        let crearRecipe = await Recipe.create({
            name,
            image,
            summary,
            healthScore,
            steps,
            Diets,
        }
        )
        crearRecipe.addDiets(await Diets.findAll({ where: { name: diets } }))
       return crearRecipe
        
    } catch (error) {
        console.log({error: error.message})
    }
}
        

module.exports = { getAllInfo, searchById, getDiets, createRecipe };

