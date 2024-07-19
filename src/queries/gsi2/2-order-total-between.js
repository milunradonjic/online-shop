const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

// Get users orders with total between values

const userId = '1';
const firstValue = '0000018.49';
const secondValue = '0000030.50';

const params = {
    TableName: 'OnlineShop',
    IndexName: 'GSI2',
    KeyConditionExpression: 'GSI2PK = :gsi2pk AND GSI2SK BETWEEN :firstValue AND :secondValue',
    ExpressionAttributeValues: {
        ':gsi2pk': `USER#${userId}`,
        ':firstValue': `ORDER#${firstValue}`,
        ':secondValue': `ORDER#${secondValue}`
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
