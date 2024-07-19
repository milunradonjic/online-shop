const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

// Get users orders between dates

const userId = '1';
const firstDate = '2024-01-01';
const secondDate = '2024-12-31';

const params = {
    TableName: 'OnlineShop',
    IndexName: 'GSI1',
    KeyConditionExpression: 'GSI1PK = :gsi1pk AND GSI1SK BETWEEN :firstDate AND :secondDate',
    ExpressionAttributeValues: {
        ':gsi1pk': `USER#${userId}`,
        ':firstDate': `ORDER#${firstDate}`,
        ':secondDate': `ORDER#${secondDate}`
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
