async function createTrigger(endpoint, key, databaseId, containerId, triggerFile, includeTest) {       
    const { CosmosClient } = require("@azure/cosmos");
    // Disable SSL verification for the Node.js process to allow self-signed certificates for Cosmos DB Emulator
    const client = new CosmosClient({ endpoint, key, 
        agent: new https.Agent({
            rejectUnauthorized: false
        })
    });
    const { database } =  await client.databases.createIfNotExists({ id: databaseId });
    const { container } =  await database.containers.createIfNotExists({ id: containerId });
    const { sampleTrigger } = await require('./Triggers/' + triggerFile);    
    try {
        await container.scripts.triggers.create(sampleTrigger)              
    } catch (e) {
        if (e.code === 409) {
            await container.scripts.trigger(sampleTrigger.id).replace(sampleTrigger) 
        } else {
            throw(e)
        }
    }
    finally {
        if(includeTest>0) {
            const newItem = {
                id: Math.floor(Math.random() * 10000).toString(),
                name: 'Sample Item'
            };
            const options = { preTriggerInclude: ['SampleTrigger'] };
            const { resource: trigger_result } = await container.items.create(newItem, options)
            console.log(trigger_result)
        } 
    }    
}

const [endpoint, key, databaseId, containerId, triggerFile, includeTest] = process.argv.slice(2);

if (!endpoint || !key || !databaseId || !containerId || !triggerFile || !includeTest) {
    console.error('Please provide all the required parameters.');
    process.exit(1);
}

createTrigger(endpoint, key, databaseId, containerId, triggerFile, includeTest).catch((error) => {
    console.error(error);
    process.exit(1);
});