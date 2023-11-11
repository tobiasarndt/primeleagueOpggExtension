waitForElm('.content-match-lineup .txt-info').then(() => {
    createLineupLinks();
});

function createLineupLinks() {
    const lineupDivs = document.getElementsByClassName("content-match-lineup");

    const teamTitleDivs = document.getElementsByClassName("content-match-head-team-titles");
    teamTitleDivs[0].appendChild(createLinupButton(lineupDivs[0]));
    teamTitleDivs[1].appendChild(createLinupButton(lineupDivs[1]));
}

function createLinupButton(lineupDiv) {
    const opggUrlButton = document.createElement("button");
    const summonerNames = getSummonerNames(lineupDiv);
    const url = opggUrl(summonerNames);
    opggUrlButton.onclick = function () { window.open(url) };
    opggUrlButton.style.backgroundImage = `url('${browser.runtime.getURL("img/opgg.png")}'`;
    opggUrlButton.style.backgroundSize = "cover";
    opggUrlButton.style.minHeight = 0;
    opggUrlButton.style.width = "50px";
    opggUrlButton.style.height = "12px";
    opggUrlButton.style.border = "none";
    opggUrlButton.style.cursor = "pointer";

    return opggUrlButton;
}

function getSummonerNames(lineupDiv) {
    const summonerNames = [];
    const txtDivs = lineupDiv.getElementsByClassName('txt-info');

    for (const txtDiv of txtDivs) {
        if (txtDiv.className === 'txt-info') {
            summonerNames.push(txtDiv.innerText);
        }
    }

    return summonerNames;
}

function opggUrl(summonerNames) {
    const opggBaseUrl = 'https://www.op.gg/multisearch/euw?summoners=';
    const encodedSummonerNames = summonerNames.map((summonerName) => encodeURIComponent(summonerName));
    const summonerNameString = encodedSummonerNames.join(encodeURIComponent(','));

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
