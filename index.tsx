import getCreature from "./getCreature";

if (process.argv.length < 3) {
    throw Error('Missing CMC argument!');
} 

// No creatures over 16 cmc (draco is 16) or at 14 
if (Number(process.argv[2]) > 16 || Number(process.argv[2]) === 14)  {
    throw Error('Invalid mana value, womp womp');
}

getCreature(process.argv[2]).then((res) => console.log(res));
