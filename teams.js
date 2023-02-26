playersDiv = document.getElementsByClassName("content-portrait-grid-l")[0];
playersDivParent = playersDiv.parentNode;

playersDivParent.insertBefore(createUrlButton(),playersDiv);

function createUrlButton() {
    var opggUrlButtonContainer = document.createElement("div");
    var opggUrlButton = document.createElement("button");
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
    var summonerNames = [];
    var infoDivs = document.getElementsByClassName("txt-info");

    for (var index = 0; index < infoDivs.length; index++) {
        var childDiv = infoDivs[index].firstElementChild;

        if (childDiv == null) {continue;}

        var title = childDiv.getAttribute("title");
        if (title != null) {
            if (title.includes("LoL Summoner Name")) {
                summonerNames.push(infoDivs[index].firstElementChild.innerText);
            }
        }
    }
    var opggUrl = "https://euw.op.gg/multi/query=";
    summonerNames.forEach(summonerName => {
        opggUrl = opggUrl + "%2C" + summonerName;
    });

    return opggUrl;
}
