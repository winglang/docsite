require("dotenv").config();

const BASE64_BASIC_AUTH = `Basic ${Buffer.from(
    `${process.env.CRAWLER_USER_ID}:${process.env.CRAWLER_API_KEY}`
).toString('base64')}`;

async function reindex() {
    console.log(`Triggering reindex on ${process.env.CRAWLER_ID}`);
    const res = await fetch(
        `${process.env.CRAWLER_API_BASE_URL}/crawlers/${process.env.CRAWLER_ID}/reindex`,
        {
            method: 'POST',
            headers: {
                Authorization: BASE64_BASIC_AUTH,
                'Content-Type': 'application/json',
            },
        }
    );
    const jsonResponse = await res.json();
    console.log(jsonResponse);
}

void reindex();
