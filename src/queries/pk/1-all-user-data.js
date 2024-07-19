const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

// Get all user data (user, basket, basket items, orders and order items)

const userId = '1';

const params = {
    TableName: 'OnlineShop',
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
        ':pk': `USER#${userId}`
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
