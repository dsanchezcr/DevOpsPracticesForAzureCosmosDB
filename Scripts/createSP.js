async function createSP(endpoint, key, databaseId, containerId, storedProcedureFile, includeTest) {       
    const { CosmosClient } = require("@azure/cosmos");
    const client = new CosmosClient({ endpoint, key });
    const { database } =  await client.databases.createIfNotExists({ id: databaseId });
    const { container } =  await database.containers.createIfNotExists({ id: containerId });
    const { sampleStoredProcedure } = await require('./StoredProcedures/'+storedProcedureFile);    
    try {
        await container.scripts.storedProcedures.create(sampleStoredProcedure);            
    } catch (e) {
        if (e.code === 409) {
            await container.scripts.storedProcedure(sampleStoredProcedure.id).replace(sampleStoredProcedure);
        } else {
            throw(e);
        }
    }
    finally{
        if(includeTest>0) {
            const { resource: results } = await container.scripts.storedProcedure(sampleStoredProcedure.id).execute();
            console.log(results);
        }  
    }
}

const [endpoint, key, databaseId, containerId, storedProcedureFile, includeTest] = process.argv.slice(2);

if (!endpoint || !key || !databaseId || !containerId || !storedProcedureFile || !includeTest) {
    console.error('Please provide all the required parameters.');
    process.exit(1);
}

createSP(endpoint, key, databaseId, containerId, storedProcedureFile, includeTest).catch((error) => {
    console.error(error);
    process.exit(1);
});