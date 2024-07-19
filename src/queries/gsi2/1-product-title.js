const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

// Get product by title (exact match)

const title = '1984';

const params = {
    TableName: 'OnlineShop',
    IndexName: 'GSI2',
    KeyConditionExpression: 'GSI2PK = :gsi2pk AND GSI2SK = :gsi2sk',
    ExpressionAttributeValues: {
        ':gsi2pk': `PRODUCT#${title}`,
        ':gsi2sk': 'PRODUCT'
    }
};

console.log("Querying for items:", JSON.stringify(params, null, 2));

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query items. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded:", JSON.stringify(data, null, 2));
    }
});
