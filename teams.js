playersDiv = document.getElementsByClassName("content-portrait-grid-l")[0];
playersDivParent = playersDiv.parentNode;

playersDivParent.insertBefore(createUrlButton(), playersDiv);

function createUrlButton() {
    const opggUrlButtonContainer = document.createElement("div");
    const opggUrlButton = document.createElement("button");
    opggUrlButton.onclick = function () { window.open(opggUrl()) };
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

function opggUrl() {
    const summonerNames = [];
    const infoDivs = document.getElementsByClassName("txt-info");

    for (const infoDiv of infoDivs) {
        const childDiv = infoDiv.firstElementChild;

        if (childDiv == null) {
            continue;
        }

        const title = childDiv.getAttribute("title");
        if (title != null && title.includes("LoL Summoner Name")) {
            summonerNames.push(childDiv.innerText);
        }
    }
    let opggUrl = "https://euw.op.gg/multi/query=";
    summonerNames.forEach(summonerName => {
        opggUrl = opggUrl + "%2C" + summonerName;
    });

    return opggUrl;
}
