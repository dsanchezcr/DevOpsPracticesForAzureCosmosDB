function validateDocument() {
    var context = getContext();
    var request = context.getRequest();
    var documentToCreate = request.getBody();

    // perform validation
    if (documentToCreate.id === undefined) {
        throw new Error('Document must have an id.');
    }

    if (documentToCreate.name === undefined) {
        throw new Error('Document must have a name.');
    }

    // if validation passed, continue with creation
}