import getCreature from "./getCreature";

if (process.argv.length < 3) {
    throw Error('Missing CMC argument!');
} 

if (Number(process.argv[2]) > 16) {
    throw Error('Mana value too high, womp womp');
}
getCreature(process.argv[2]).then((res) => console.log(res));

