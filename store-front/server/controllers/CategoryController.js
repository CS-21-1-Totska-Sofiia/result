import * as AzureEntityService from '../services/AzureEntityService.js';

export const getAll = async (req, res) => {
    try {
        const entitiesIter = AzureEntityService.getAll('categories');
        const entities = [];
        for await (const entity of entitiesIter) {
            entities.push(entity);
        }
        res.status(200).json(entities);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to get categories"});
    }
}