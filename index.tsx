if (process.argv.length < 3) {
    throw Error('Missing CMC argument!');
} 

if (Number(process.argv[2]) > 16) {
    throw Error('Mana value too high, womp womp');
}
getCreature(process.argv[2]).then((res) => console.log(res));

async function getCreature(cmc: string) {
    const baseUrl = "https://api.scryfall.com/cards/search"
    const reqUrl = new URL(baseUrl);
    reqUrl.searchParams.append('q', `t:creature in:paper cmc:${cmc}`);

    const res = await fetch(reqUrl, {method: 'GET'});

    if (res.status !== 200) {
        throw Error('Request to Scryfall failed');
    }
    
    const body = await res.json();
    const selectedCard = Math.floor(Math.random() * (body.total_cards - 1));
    
    // Scryfall API is paginated at 175 entries per page
    if (selectedCard > 175) {
        const page = Math.floor(selectedCard/175);
        const pagedCard = selectedCard % 175;
        
        const pageRegex = /page=[1-9]?/gm;
        const pagedUrl = body.next_page.replace(pageRegex, `page=${page}`);
        const pagedRes = await fetch(new URL(pagedUrl), {method: 'GET'});
        const pagedBody = await pagedRes.json();
        
        return {
            name: pagedBody.data[pagedCard].name,
            card_uri: pagedBody.data[pagedCard].uri
        };    
    }

    return {
        name: body.data[selectedCard].name,
        uri: body.data[selectedCard].uri
    };
}
