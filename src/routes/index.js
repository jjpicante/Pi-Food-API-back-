const { Router } = require('express');
const { getAllInfo, searchById, getDiets, createRecipe } = require("../controlers/general")


const router = Router();

//////////////////////////////////CREAR RECETA////////////////////////////////////////////////////////////

router.post("/recipes", async (req, res) => {
    try{
     let { name, image, summary, healthScore, steps, Diets } = req.body;
        
         let crearRecipe = await createRecipe(name, image, summary, healthScore, steps, Diets)
 
         return res.status(200).send(crearRecipe)
 
     } catch (error) {
         return res.status(400).json({ error: error.message });
     }
 });
//////////////////////////////////////////////////////////////////////////////////////////////////////////


router.get("/diets",async (req, res) => {
    try{
        const diets = await getDiets()
        if(diets.length === 0){throw Error}
        return res.status(200).send(diets)
    }
        catch (error) {
        return res.status(400).send({error: error.message})
    }}
)

//////////////////////////////////////////////////////////////////////////////////////////////////////////


router.get("/recipes", async (req, res) => {
    const { name } = req.query;
    try {
        const allRecipes = await getAllInfo();

        if (name) {
            let recipeFind = allRecipes.filter(elem => elem.name.toLowerCase().indexOf(name.toLowerCase()) !== -1)
            if (recipeFind.length) {
                return res.status(200).json(recipeFind)
            }
            else {
                return res.status(400).send(`No se encontraron recetas que contengan "${name}"`)
            }
        }
    
        return res.status(200).send(allRecipes)

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////


router.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        if (id === undefined) throw new Error("Se requiere un id")

        const response = await searchById(id)
            
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
 
 


module.exports = router;

