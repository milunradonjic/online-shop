const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const userData1 = [
    // USER
    { PK: 'USER#1', SK: 'USER#1', _Type: 'USER', Name: 'John Doe', Email: 'john.doe@example.com', CardNumber: '1234-5678-9012-3456', GSI1PK: 'USER#john.doe@example.com', GSI1SK: 'USER' },

    // BASKET
    { PK: 'USER#1', SK: 'BASKET#1', _Type: 'BASKET' },
    { PK: 'USER#1', SK: 'BASKET_ITEM#1', _Type: 'BASKET_ITEM', Price: 5.99, Quantity: 1, GSI1PK: 'BASKET#1', GSI1SK: 'PRODUCT#1' },

    // ORDER 1
    { PK: 'USER#1', SK: 'ORDER#1', _Type: 'ORDER', Status: 'Done', Date: '2024-03-03', Total: 18.49, GSI1PK: 'USER#1', GSI1SK: 'ORDER#2024-03-03', GSI2PK: 'USER#1', GSI2SK: 'ORDER#0000018.49', GSI3PK: 'USER#1', GSI3SK: 'ORDER#DONE#2024-03-03' },
    { PK: 'USER#1', SK: 'ORDER_ITEM#1', _Type: 'ORDER_ITEM', Price: 5.99, Quantity: 1, GSI1PK: 'ORDER#1', GSI1SK: 'PRODUCT#1' },
    { PK: 'USER#1', SK: 'ORDER_ITEM#2', _Type: 'ORDER_ITEM', Price: 12.50, Quantity: 1, GSI1PK: 'ORDER#1', GSI1SK: 'PRODUCT#2' },

    // ORDER 2
    { PK: 'USER#1', SK: 'ORDER#2', _Type: 'ORDER', Status: 'Done', Date: '2024-03-03', Total: 30.50, GSI1PK: 'USER#1', GSI1SK: 'ORDER#2024-02-02', GSI2PK: 'USER#1', GSI2SK: 'ORDER#0000030.50', GSI3PK: 'USER#1', GSI3SK: 'ORDER#DONE#2024-02-02' },
    { PK: 'USER#1', SK: 'ORDER_ITEM#3', _Type: 'ORDER_ITEM', Price: 5.99, Quantity: 1, GSI1PK: 'ORDER#2', GSI1SK: 'PRODUCT#1' },
    { PK: 'USER#1', SK: 'ORDER_ITEM#4', _Type: 'ORDER_ITEM', Price: 12.50, Quantity: 2, GSI1PK: 'ORDER#2', GSI1SK: 'PRODUCT#2' },

    // ORDER 3
    { PK: 'USER#1', SK: 'ORDER#3', _Type: 'ORDER', Status: 'Pending', Date: '2024-03-03', Total: 5.99, GSI1PK: 'USER#1', GSI1SK: 'ORDER#2024-02-02', GSI2PK: 'USER#1', GSI2SK: 'ORDER#0000005.99', GSI3PK: 'USER#1', GSI3SK: 'ORDER#PENDING#2024-02-02' },
    { PK: 'USER#1', SK: 'ORDER_ITEM#5', _Type: 'ORDER_ITEM', Price: 5.99, Quantity: 1, GSI1PK: 'ORDER#3', GSI1SK: 'PRODUCT#1' },
]

const categoryData = [
    // PARENT CATEGORY
    { PK: 'CATEGORY#1', SK: 'CATEGORY#1', _Type: 'CATEGORY', Name: 'Books' },
    
    // CHILD CATEGORIES
    { PK: 'CATEGORY#2', SK: 'CATEGORY#2', _Type: 'CATEGORY', Name: 'Fiction', GSI1PK: 'CATEGORY#1', GSI1SK: 'CATEGORY#2' },
    { PK: 'CATEGORY#3', SK: 'CATEGORY#3', _Type: 'CATEGORY', Name: 'Non-Fiction', GSI1PK: 'CATEGORY#1', GSI1SK: 'CATEGORY#3' },
    
]

const productData = [
    // PRODUCTS
    { PK: 'CATEGORY#2', SK: 'PRODUCT#1', _Type: 'PRODUCT', Name: '1984', Price: 5.99, Quantity: 50, GSI1PK: 'CATEGORY#1', GSI1SK: 'PRODUCT#1', GSI2PK: 'PRODUCT#1984', GSI2SK: 'PRODUCT' },
    { PK: 'CATEGORY#3', SK: 'PRODUCT#2', _Type: 'PRODUCT', Name: 'Greenlights', Price: 12.50, Quantity: 50, GSI1PK: 'CATEGORY#1', GSI1SK: 'PRODUCT#2', GSI2PK: 'PRODUCT#Greenlights', GSI2SK: 'PRODUCT' },
]


const allItems = [...userData1, ...categoryData, ...productData];

// Store Data
const putRequests = allItems.map(item => {
    console.log("Adding item:", JSON.stringify(item, null, 2));
    return {
        PutRequest: {
            Item: item
        }
    }
});

const params = {
    RequestItems: {
        'OnlineShop': putRequests
    }
};

docClient.batchWrite(params, function(err, data) {
    if (err) {
        console.error("Unable to add items. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added items:", JSON.stringify(data, null, 2));
    }
});
