var textToTranslate = "";
var ttt = [{ text: textToTranslate }];

// escape characters so no JSON errors
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// translate stuff
fetch(
        "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&?from=en&to=es&textType=html", {
            method: "post",
            body: JSON.stringify(ttt),
            headers: {
                "Content-Type": "application/json; odata=verbose",
                "Ocp-Apim-Subscription-Key": "xxx",
                Accept: "application/json; odata=verbose"
            }
        }
    )
    .then(response => response.json())
    .then(response => console.log(response[0].translations[0].text));