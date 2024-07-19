const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

// Get category by ID

const categoryId = '1';

const params = {
    TableName: 'OnlineShop',
    Key: {
        'PK': `CATEGORY#${categoryId}`,
        'SK': `CATEGORY#${categoryId}`
    }
};

console.log("Querying for items:", JSON.stringify(params, null, 2));

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Get succeeded:", JSON.stringify(data, null, 2));
    }
});

