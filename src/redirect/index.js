const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({});
const TABLE = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const { code } = event.pathParameters;

  const result = await client.send(new GetItemCommand({
    TableName: TABLE,
    Key: { code: { S: code } },
  }));

  if (!result.Item) {
    return { statusCode: 404, body: JSON.stringify({ error: "Short URL not found" }) };
  }

  return {
    statusCode: 301,
    headers: { Location: result.Item.originalUrl.S },
    body: "",
  };
};