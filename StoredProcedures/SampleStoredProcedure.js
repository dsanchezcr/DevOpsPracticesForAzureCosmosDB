const sampleStoredProcedure = {
    id: "SampleStoredProcedure",
    body: function () {
        var context = getContext();
        var response = context.getResponse();
        console.log("Logging message from the stored procedure...")
        response.setBody('Hello, Azure Cosmos DB!');
    }
}
exports.sampleStoredProcedure = sampleStoredProcedure;