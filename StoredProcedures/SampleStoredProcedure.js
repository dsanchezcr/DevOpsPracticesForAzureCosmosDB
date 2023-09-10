function sample() 
{
    var context = getContext();
    var response = context.getResponse();
    response.setBody('Hello, Azure Cosmos DB!');
}