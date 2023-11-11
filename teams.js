playersDiv = document.getElementsByClassName("content-portrait-grid-l")[0];
playersDivParent = playersDiv.parentNode;

playersDivParent.insertBefore(createUrlButton(), playersDiv);

function createUrlButton() {
    const opggUrlButtonContainer = document.createElement("div");
    const opggUrlButton = document.createElement("button");
    const summonerNames = getSummonerNames();
    const url = opggUrl(summonerNames);
    opggUrlButton.onclick = function () { window.open(url) };
    opggUrlButton.style.backgroundImage = `url('${browser.runtime.getURL("img/opgg.png")}'`;
    opggUrlButton.style.backgroundSize = "cover";
    opggUrlButton.style.minHeight = 0;
    opggUrlButton.style.width = "50px";
    opggUrlButton.style.height = "12px";
    opggUrlButton.style.border = "none";
    opggUrlButton.style.cursor = "pointer";

    opggUrlButtonContainer.appendChild(opggUrlButton);

    return opggUrlButtonContainer;
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
