const baseUrl = "https://api.scryfall.com/cards/search"

if (process.argv.length < 3) {
    throw Error('Missing CMC argument!');
} 
const cmc = process.argv[2];

const reqUrl = new URL(baseUrl);
reqUrl.searchParams.append('q', `in:paper cmc:${cmc}`);

const res = fetch(reqUrl, {
    method: 'GET'
}).then((res) => {
    res.json().then((res) => console.log(res));
});
