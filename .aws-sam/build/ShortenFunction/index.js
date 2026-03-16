const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({});
const TABLE = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const { url } = body;

  if (!url) {
    return { statusCode: 400, body: JSON.stringify({ error: "url is required" }) };
  }

  const code = Math.random().toString(36).slice(2, 8);
  const ttl = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;

  await client.send(new PutItemCommand({
    TableName: TABLE,
    Item: {
      code:        { S: code },
      originalUrl: { S: url },
      ttl:         { N: String(ttl) },
      createdAt:   { S: new Date().toISOString() },
    },
  }));

  const apiUrl = `https://${event.requestContext.domainName}/${event.requestContext.stage}`;

  return {
    statusCode: 201,
    body: JSON.stringify({ shortUrl: `${apiUrl}/${code}`, code }),
  };
};