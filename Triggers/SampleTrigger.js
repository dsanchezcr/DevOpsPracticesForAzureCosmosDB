const sampleTrigger = {
    id: 'SampleTrigger',
    body: function SampleTrigger() {
        const context = getContext();
        const request = context.getRequest();
        const document = request.getBody();
  
        document.timestamp = new Date().toISOString();
        
        request.setBody(document);
      },
    triggerOperation: 'All',
    triggerType: 'Pre'
};
exports.sampleTrigger = sampleTrigger;