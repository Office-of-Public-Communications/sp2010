var toEs = function () {
    Microsoft.Translator.Widget.Translate('en', 'es', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toFr = function () {
    Microsoft.Translator.Widget.Translate('en', 'fr', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toHt = function () {
    Microsoft.Translator.Widget.Translate('en', 'ht', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toPt = function () {
    Microsoft.Translator.Widget.Translate('en', 'pt', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toEn = function () {
    Microsoft.Translator.Widget.Translate('en', 'en', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toZh = function () {
    Microsoft.Translator.Widget.Translate('en', 'zh-Hans', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toDe = function () {
    Microsoft.Translator.Widget.Translate('en', 'de', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toHi = function () {
    Microsoft.Translator.Widget.Translate('en', 'hi', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toNe = function () {
    Microsoft.Translator.Widget.Translate('en', 'nl', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toPe = function () {
    Microsoft.Translator.Widget.Translate('en', 'pl', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toIt = function () {
    Microsoft.Translator.Widget.Translate('en', 'it', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toJa = function () {
    Microsoft.Translator.Widget.Translate('en', 'ja', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
if (localStorage.getItem('translation')) {
    switch (localStorage.getItem('translation')) {
        case 'es':
            toEs();
            break;
        case 'fr':
            toFr();
            break;
        case 'ht':
            toHt();
            break;
        case 'pt':
            toPt();
            break;
        case 'en':
            toEn();
            break;
        case 'zh-Hans':
            toZh();
            break;
        case 'de':
            toDe();
            break;
        case 'hi':
            toHi();
            break;
        case 'nl':
            toNe();
            break;
        case 'pl':
            toPe();
            break;
        case 'it':
            toIt();
            break;
        case 'ja':
            toJa();
            break;
        default:
            console.log('local storage set to: ');
    }
}
$("#translate").on("click", function (e) {
    $("ul.tr-dd").toggleClass("showtr");
    e.stopPropagation();
    //  $(this).find("ul.tr-dd").toggleClass("");
});
$(document).on("click", function (e) {
    if ($(e.target).is("ul.tr-dd") === false) {
        $("ul.tr-dd").removeClass("showtr");
    }
});
//Spanish
document.getElementById("lang-es").onclick = function () {
    localStorage.setItem('translation', 'es');
    toSpanish();
};
//French
document.getElementById("lang-fr").onclick = function () {
    localStorage.setItem('translation', 'fr');
    toFr();
};
//Creole
document.getElementById("lang-ht").onclick = function () {
    localStorage.setItem('translation', 'ht');
    toHt();
};
//Portuguese
document.getElementById("lang-pt").onclick = function () {
    localStorage.setItem('translation', 'pt');
    toPt();
};
//English
document.getElementById("lang-en").onclick = function () {
    localStorage.setItem('translation', 'en');
    toEn();
};
//Chinese
document.getElementById("lang-zh-Hans").onclick = function () {
    localStorage.setItem('translation', 'zh-Hans');
    toZh();
};
//German
document.getElementById("lang-de").onclick = function () {
    localStorage.setItem('translation', 'de');
    toDe();
};
//Hindi
document.getElementById("lang-hi").onclick = function () {
    localStorage.setItem('translation', 'hi');
    toHi();
};
//Dutch
document.getElementById("lang-nl").onclick = function () {
    localStorage.setItem('translation', 'nl');
    toNl();
};
//Polish
document.getElementById("lang-pl").onclick = function () {
    localStorage.setItem('translation', 'pl');
    toPl();
};
//Italian
document.getElementById("lang-it").onclick = function () {
    localStorage.setItem('translation', 'it');
    toIt();
};
//Japanese
document.getElementById("lang-ja").onclick = function () {
    localStorage.setItem('translation', 'ja');
    toJa();
};

//You can use Microsoft.Translator.Widget.GetLanguagesForTranslate to map the language code with the language name
function onProgress(value) {
    document.getElementById('counter').innerHTML = Math.round(value);
}

function onError(error) {
    alert("Translation Error: " + error);
}

function onComplete() {
    document.getElementById('counter').style.color = 'green';
}
//fires when the user clicks on the exit box of the floating widget
function onRestoreOriginal() {
    alert("The page was reverted to the original language. This message is not part of the widget.");
}
