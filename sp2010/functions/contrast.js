//console.log('contrast working');
// array.from polyfill
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
    Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) {
                return 0;
            }
            if (number === 0 || !isFinite(number)) {
                return number;
            }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike /*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            var C = this;

            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError('Array.from requires an array-like object - not null or undefined');
            }

            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);

            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method
            // of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < lenâ€¦ (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    }());
}
//Dynamic Nav Loading
$(document).ready(function () {
    $('#GlobalNavInclude').load('/Style%20Library/V6/Includes/GlobalNav.html');
    $('#MainFooterInclude1,#MainFooterInclude2 ').load('/Style%20Library/V6/Includes/MAinFooter.html');
});

/*!
 *   Accessibility Buttons v3.1.2
 *   http://tiagoporto.github.io/accessibility-buttons
 *   Copyright (c) 2014-2017 Tiago Porto (http://tiagoporto.com)
 *   Released under the MIT license
 */

/**
 * accessibilityButtons
 * @param  {Array}  -
 * @return
 */

/* exported accessibilityButtons */
var accessibilityButtons = function accessibilityButtons(options) {
    'use strict';

    /**
     * hasClass
     * @param  {string}  element - DOM element
     * @param  {string}  clazz   - Class Name
     * @return {Boolean}
     */

    function hasClass(element, clazz) {
        return (' ' + element.className + ' ').indexOf(' ' + clazz + ' ') > -1;
    }
    var setting = {
        font: {
            nameButtonIncrease: '+A',
            ariaLabelButtonIncrease: 'Increase Font',
            nameButtonDecrease: '-A',
            ariaLabelButtonDecrease: 'Decrease Font'
        },
        contrast: {
            nameButtonAdd: 'Add Contrast',
            ariaLabelButtonAdd: 'Add Contrast',
            nameButtonRemove: 'Remove Contrast',
            ariaLabelButtonRemove: 'Remove Contrast'
        }
    };

    // Set buttons name and aria label
    if (options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                var obj = options[key];

                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        setting[key][prop] = obj[prop];
                    }
                }
            }
        }
    }

    var $body = document.body,
        $fontButton = document.getElementById('accessibility-font'),
        $contrastButton = document.getElementById('accessibility-contrast'),
        $accessibilityButtons = document.getElementsByClassName('js-acessibility'),
        storageFont = localStorage.accessibility_font,
        storageContrast = localStorage.accessibility_contrast;

    // Check if exist storage and set the correct button names and aria attributes
    // font resizing
    if (storageFont && $fontButton) {
        $body.classList.add('accessibility-font');
        $fontButton.innerHTML = setting.font.nameButtonDecrease;
        $fontButton.setAttribute('aria-label', setting.font.ariaLabelButtonDecrease);
    } else if ($fontButton) {
        $fontButton.innerHTML = setting.font.nameButtonIncrease;
        $fontButton.setAttribute('aria-label', setting.font.ariaLabelButtonIncrease);
    }
    // contrast
    if (storageContrast && $contrastButton) {
        // IF THERE'S A CONTRAST KEY IN LOCALSTORAGE & CONTRAST BUTTON,
        // SET PAGE BLACK & BUTTON TEXT TO 'ADD CONTRAST'

        // get parent element(s)
        var content = $('div[data-name="ContentPlaceHolderMain"], #agencyInfo');
        // get all descendants of content
        var contentDesc = content.find('*');
        // get all descendants with text
        var descText = contentDesc.find('*'.innerText);
        // create array from all the things with text
        var txtArray = Array.from(descText.prevObject);
        // do things to elements of array of things with text
        txtArray.forEach(function (element) {
            // condition to not touch site nav
            if (element !== $('.navbar-desktop *') || $('.menu-horizontal *') || $('.vjs-text-track-display') || $('iframe')) {

                // do things to linked text or normal text
                if (element.hasAttribute('href')) {
                    element.style.cssText += 'color: #FFEB3B !important; background: black !important; background-color: black !important';
                } else {
                    // do things to things with linked parents
                    if (element.parentNode.hasAttribute("href") || element.querySelector('span menu-item-text')) {
                        element.style.cssText += 'color: #FFEB3B !important; background: black !important; background-color: black !important';
                    } else {
                        element.style.cssText += 'color: white !important; background-color: black !important';
                    }
                }
                // do things to other things on the page
                $('.navbar-desktop *').css('background', '#039BE5');
                $('.menu-horizontal *').css('background', '');
                $('.btn').css('border', '2px solid white');
                $('.btn, .btn-yellow:hover, .btn-yellow:active, .QL-item').css('background, background-color, color', 'black !important, black !important, #FFEB3B !important');
                content.css('background', 'black');
            }
            $('#zz18_TopNavigationMenuV4 > div').removeAttr('style');
            $('#zz18_TopNavigationMenuV4').removeAttr('style');
            $('div#accessibility-contrast, div#accessibility-font, div#translate').css('border', 'none');
            $('div.vjs-text-track-display').css('background-color', '');
        });

        //
        //
        $contrastButton.innerHTML = setting.contrast.nameButtonRemove;
        $contrastButton.setAttribute('aria-label', setting.contrast.ariaLabelButtonRemove);
    } else if ($contrastButton) {
        // IF THERE'S NO CONTRAST KEY IN LOCALSTORAGE, BUT THERE IS A BUTTON,
        $contrastButton.innerHTML = setting.contrast.nameButtonAdd;
        $contrastButton.setAttribute('aria-label', setting.contrast.ariaLabelButtonAdd);
    }
    /**
     * Get the click event
     * Rename the buttons
     * Apply/Remove Contrast or Font Size
     * Manage storage
     */

    function accessibility() {
        return function () {
            var $this = this;
            if (hasClass($body, $this.getAttribute('id'))) {
                $body.classList.remove($this.getAttribute('id'));

                if ($this.getAttribute('id') === 'accessibility-font') {
                    $this.innerHTML = setting.font.nameButtonIncrease;
                    $this.setAttribute('aria-label', setting.font.ariaLabelButtonIncrease);
                    localStorage.removeItem('accessibility_font');
                } else {
                    $this.innerHTML = setting.contrast.nameButtonAdd;
                    $this.setAttribute('aria-label', setting.contrast.ariaLabelButtonAdd);
                    localStorage.removeItem('accessibility_contrast');
                    document.location.reload(false);
                }
            } else {
                $body.classList.add($this.getAttribute('id'));

                if ($this.getAttribute('id') === 'accessibility-font') {
                    if (!storageFont) {
                        localStorage.setItem('accessibility_font', true);
                    }
                    $this.innerHTML = setting.font.nameButtonDecrease;
                    $this.setAttribute('aria-label', setting.font.ariaLabelButtonDecrease);
                } else {
                    if (!storageContrast) {
                        localStorage.setItem('accessibility_contrast', true);

                        var content = $('div[data-name="ContentPlaceHolderMain"], #agencyInfo');
                        var contentDesc = content.find('*');
                        var descText = contentDesc.find('*'.innerText);
                        var txtArray = Array.from(descText.prevObject);
                        for (var i = 0, len = txtArray.length; i < len; i++) {
                            //txtArray.map(function (element) {
                            var element = txtArray[i]
                            //console.log(txtArray[i])
                            if (element !== $('.navbar-desktop *') || $('.menu-horizontal *') || $('.vjs-text-track-display') || $('iframe')) {
                                if (element.hasAttribute('href')) {
                                    element.style.cssText += 'color: #FFEB3B !important; background: black !important; background-color: black !important';
                                } else {
                                    if (element.parentNode.hasAttribute("href") || element.querySelector('span menu-item-text')) {
                                        element.style.cssText += 'color: #FFEB3B !important; background: black !important; background-color: black !important';
                                    } else {
                                        element.style.cssText += 'color: white !important; background-color: black !important';
                                    }
                                }
                            }
                        }
                        $('.navbar-desktop *').css('background', '#039BE5 !important');
                        $('.menu.horizontal.menu-horizontal').css('background-color', '#039BE5 !important');
                        $('.menu-horizontal *').css('background', '');
                        $('.btn').css('border', '2px solid white');
                        $('.btn, .btn-yellow:hover, .btn-yellow:active, .QL-item').css('background, background-color, color', 'black !important, black !important, #FFEB3B !important');
                        content.css('background', 'black');
                        //
                    }
                    $('div#accessibility-contrast, div#accessibility-font, div#translate').css('border', 'none');
                    $('div.vjs-text-track-display').css('background-color', '');
                    $('#zz18_TopNavigationMenuV4 > div').removeAttr('style');
                    $('#zz18_TopNavigationMenuV4').removeAttr('style');
                    $this.innerHTML = setting.contrast.nameButtonRemove;
                    $this.setAttribute('aria-label', setting.contrast.ariaLabelButtonRemove);
                }
            }
        };
    }
    // Listening Click Event
    for (var i = 0; i < $accessibilityButtons.length; i++) {
        $accessibilityButtons[i].addEventListener('mouseup', accessibility());
    }
};
//jQuery function
$(document).ready(function () {
    accessibilityButtons();
});