const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

// Get users orders between dates with given status 

const userId = '1';
const status = 'DONE';
const firstDate = '2024-02-02';
const secondDate = '2024-03-03';

const params = {
    TableName: 'OnlineShop',
    IndexName: 'GSI3',
    KeyConditionExpression: 'GSI3PK = :gsi3pk AND GSI3SK BETWEEN :firstDate AND :secondDate',
    ExpressionAttributeValues: {
        ':gsi3pk': `USER#${userId}`,
        ':firstDate': `ORDER#${status}#${firstDate}`,
        ':secondDate': `ORDER#${status}#${secondDate}`
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
