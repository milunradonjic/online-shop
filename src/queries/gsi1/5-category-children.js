const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

// Get child categories for parent category

const categoryId = '1';

const params = {
    TableName: 'OnlineShop',
    IndexName: 'GSI1',
    KeyConditionExpression: 'GSI1PK = :gsi1pk AND begins_with(GSI1SK, :gsi1sk)',
    ExpressionAttributeValues: {
        ':gsi1pk': `CATEGORY#${categoryId}`,
        ':gsi1sk': 'CATEGORY#'
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