playersDiv = document.getElementsByClassName("content-portrait-grid-l")[0];
playersDivParent = playersDiv.parentNode;

playersDivParent.insertBefore(createUrlLink(), playersDiv);

function createUrlLink() {
    const opggUrlLinkContainer = document.createElement('div');
    const opggUrlLink = document.createElement('a');

    const summonerNames = getSummonerNames();
    const url = opggUrl(summonerNames);

    opggUrlLink.setAttribute('href', url);
    opggUrlLink.innerHTML = 'OP.GG';

    opggUrlLinkContainer.appendChild(opggUrlLink);

    return opggUrlLinkContainer;
}

function getSummonerNames() {
    const summonerNames = [];
    const infoDivs = document.getElementsByClassName('txt-info');

    for (const infoDiv of infoDivs) {
        const childDiv = infoDiv.firstElementChild;

        if (childDiv === null) {
            continue;
        }

        const title = childDiv.getAttribute('title');

        if (title !== null && title.includes('LoL Summoner Name')) {
            summonerNames.push(childDiv.innerText);
        }
    }

    return summonerNames;
}

function opggUrl(summonerNames) {
    const opggBaseUrl = 'https://www.op.gg/multisearch/euw?summoners=';
    const encodedSummonerNames = summonerNames.map((summonerName) => encodeURIComponent(summonerName));
    const summonerNameString = encodedSummonerNames.join(encodeURIComponent(','));

    return opggBaseUrl.concat(summonerNameString);
}
