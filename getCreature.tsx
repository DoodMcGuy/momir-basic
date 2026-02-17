export default async function getCreature(cmc: string) {
    const baseUrl = "https://api.scryfall.com/cards/random"
    const reqUrl = new URL(baseUrl);
    reqUrl.searchParams.append('q', `t:creature in:paper cmc:${cmc}`);

    const res = await fetch(reqUrl, {method: 'GET'});

    if (res.status !== 200) {
        throw Error('Request to Scryfall failed');
    }
    
    const body = await res.json();

    return {
        name: body.name,
        uri: body.scryfall_uri
    };
}
