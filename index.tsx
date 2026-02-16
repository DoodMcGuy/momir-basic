
if (process.argv.length < 3) {
    throw Error('Missing CMC argument!');
} 
getCreature(process.argv[2]).then((res) => console.log(res));

async function getCreature(cmc: string) {
    const baseUrl = "https://api.scryfall.com/cards/search"
    const reqUrl = new URL(baseUrl);
    reqUrl.searchParams.append('q', `t:creature in:paper cmc:${cmc}`);

    const res = await fetch(reqUrl, {
        method: 'GET'
    });

    return await res.json();
}
