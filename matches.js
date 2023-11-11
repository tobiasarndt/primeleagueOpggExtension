createLineupLinks();

function createLineupLinks() {
    const lineupDivs = document.getElementsByClassName("content-match-lineup");

    const teamTitleDivs = document.getElementsByClassName("content-match-head-team-titles");
    teamTitleDivs[0].appendChild(createLinupButton(lineupDivs[0]));
    teamTitleDivs[1].appendChild(createLinupButton(lineupDivs[1]));
}

function createLinupButton(lineupDiv) {
    const opggUrlButton = document.createElement("button");
    opggUrlButton.onclick = function () { window.open(opggUrl(lineupDiv)) };
    opggUrlButton.style.backgroundImage = `url('${browser.runtime.getURL("img/opgg.png")}'`;
    opggUrlButton.style.backgroundSize = "cover";
    opggUrlButton.style.minHeight = 0;
    opggUrlButton.style.width = "50px";
    opggUrlButton.style.height = "12px";
    opggUrlButton.style.border = "none";
    opggUrlButton.style.cursor = "pointer";

    return opggUrlButton;
}

function opggUrl(lineupDiv) {
    const txtDivs = lineupDiv.getElementsByClassName("txt-info");
    const summonerNames = [];
    for (const txtDiv of txtDivs) {
        if (txtDiv.className === "txt-info") {
            summonerNames.push(txtDiv.innerText);
        }
    }
    let opggUrl = "https://euw.op.gg/multi/query=";
    summonerNames.forEach(summonerName => {
        opggUrl = opggUrl + "%2C" + summonerName;
    });

    return opggUrl
}
