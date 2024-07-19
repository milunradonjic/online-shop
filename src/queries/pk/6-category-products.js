const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

// Get child category products

const categoryId = '2';

const params = {
    TableName: 'OnlineShop',
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
    ExpressionAttributeValues: {
        ':pk': `CATEGORY#${categoryId}`,
        ':sk': 'PRODUCT'
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
