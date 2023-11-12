const playersDiv = document.getElementsByClassName('content-portrait-grid-l')[0];
const playersDivParent = playersDiv.parentNode;

playersDivParent.insertBefore(createUrlLink(), playersDiv);

function createUrlLink() {
    const opggUrlLink = document.createElement('a');

    const summonerNames = getSummonerNames();
    const url = createOpggUrl(summonerNames);

    opggUrlLink.setAttribute('href', url);
    opggUrlLink.innerHTML = 'OP.GG';

    return opggUrlLink;
}

function getSummonerNames() {
    const summonerNames = [];
    const infoDivs = document.getElementsByClassName('txt-info');

    for (let infoDiv of infoDivs) {
        const childDiv = infoDiv.firstElementChild;

        if (childDiv === null) {
            continue;
        }

        const title = childDiv.getAttribute('title');

        if (title?.includes('LoL Summoner Name')) {
            summonerNames.push(childDiv.innerText);
        }
    }

    return summonerNames;
}

function createOpggUrl(summonerNames) {
    const opggBaseUrl = 'https://www.op.gg/multisearch/euw?summoners=';
    const summonerNameString = encodeURIComponent(summonerNames.join(','));

    return opggBaseUrl.concat(summonerNameString);
}
