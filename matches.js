waitForElm('.content-match-lineup .txt-info').then(() => {
    createLineupLinks();
});

function createLineupLinks() {
    const lineupDivs = document.getElementsByClassName('content-match-lineup');

    const teamTitleDivs = document.getElementsByClassName('content-match-head-team-titles');
    teamTitleDivs[0].appendChild(createUrlLink(lineupDivs[0]));
    teamTitleDivs[1].appendChild(createUrlLink(lineupDivs[1]));
}

function createUrlLink(lineupDiv) {
    const opggUrlLinkContainer = document.createElement('div');
    opggUrlLinkContainer.className = 'txt-subtitle';

    const opggUrlLink = document.createElement('a');
    const summonerNames = getSummonerNames(lineupDiv);

    if (summonerNames.length === 0) { 
        return opggUrlLinkContainer;
    }
    const url = createOpggUrl(summonerNames);

    opggUrlLink.setAttribute('href', url);
    opggUrlLink.innerHTML = 'OP.GG';

    opggUrlLinkContainer.appendChild(opggUrlLink);

    return opggUrlLinkContainer;
}

function getSummonerNames(lineupDiv) {
    const summonerNames = [];
    const txtDivs = lineupDiv.getElementsByClassName('txt-info');

    for (let txtDiv of txtDivs) {
        if (txtDiv.className === 'txt-info') {
            summonerNames.push(txtDiv.innerText);
        }
    }

    return summonerNames;
}

function createOpggUrl(summonerNames) {
    const opggBaseUrl = 'https://www.op.gg/multisearch/euw?summoners=';
    const summonerNameString = encodeURIComponent(summonerNames.join(','));

    const url = opggBaseUrl.concat(summonerNameString);

    return url;
}


function waitForElm(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
