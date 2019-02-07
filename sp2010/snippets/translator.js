var toSpanish = function () {
    Microsoft.Translator.Widget.Translate('en', 'es', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toFrench = function () {
    Microsoft.Translator.Widget.Translate('en', 'fr', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toCreole = function () {
    Microsoft.Translator.Widget.Translate('en', 'ht', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toPortuguese = function () {
    Microsoft.Translator.Widget.Translate('en', 'pt', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};
var toEnglish = function () {
    Microsoft.Translator.Widget.Translate('en', 'en', onProgress, onError, onComplete, onRestoreOriginal, 8000);
    Microsoft.Translator.Widget.domTranslator.showHighlight = false;
    Microsoft.Translator.Widget.domTranslator.showTooltips = false;
};

if (localStorage.getItem('translation')) {
    switch (localStorage.getItem('translation')) {
        case 'es':
            console.log('local storage set to: es');
            toSpanish();
            break;
        case 'fr':
            console.log('local storage set to: fr');
            toFrench();
            break;
        case 'ht':
            console.log('local storage set to: ht');
            toCreole();
            break;
        case 'pt':
            console.log('local storage set to: pt');
            toPortuguese();
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
}); //Spanish
document.getElementById("lang-es").onclick = function () {
    localStorage.setItem('translation', 'es');
    toSpanish();
};
//French
document.getElementById("lang-fr").onclick = function () {
    localStorage.setItem('translation', 'fr');
    toFrench();
};
//Creole
document.getElementById("lang-ht").onclick = function () {
    localStorage.setItem('translation', 'ht');
    toCreole();
};
//Portuguese
document.getElementById("lang-pt").onclick = function () {
    localStorage.setItem('translation', 'pt');
    toPortuguese();
};
//English
document.getElementById("lang-en").onclick = function () {
    localStorage.setItem('translation', 'en');
    toEnglish();
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