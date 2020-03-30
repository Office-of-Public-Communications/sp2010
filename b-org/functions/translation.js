window.addEventListener('load', event => {
  //"use strict";

  var results, sresults;
  var textArray;
  var charLimit = 4800;
  var maxBSLimit = 9600;
  var sumsum = 0;
  // array limited to 5000 chars || 100 items for ms translate
  var bigArr = [];
  bigArr.length = 0;
  // a ginormous array for insane cases..
  var biggerArr = [];
  biggerArr.length = 0;
  var sumSumArray = [];
  sumSumArray.length = 0;
  // console.log(bigArr, biggerArr, sumSumArray)

  async function getBreaks() {
    // console.log(filteredParents);

    for (var i = 0; i < filteredParents.length; i++) {
      var chars = filteredParents[i].text.length;

      var ctt = filteredParents[i].text.replace(/\s\s+/g, ' ');

      var a = [ctt];

      // console.log(a)

      if (chars > charLimit) {
        // console.log(filteredParents[i])
        // break down chars > maxBSLimit
        if (chars > maxBSLimit) {
          //console.log(ctt);
        }
        var arrayMe = function arrayMe(texts) {
          textArray =
            '[' +
            texts
            .map(function(text) {
              return text;
            })
            .join(', ') +
            ']';
        };

        arrayMe(a);
        var ttt = [{
          text: textArray
        }];
        //console.log(ttt);

        var sentences = await fetch(
          'https://api.cognitive.microsofttranslator.com/breaksentence?api-version=3.0&textType=html', {
            method: 'post',
            body: JSON.stringify(ttt),
            headers: {
              'Content-Type': 'application/json; odata=verbose',
              'Ocp-Apim-Subscription-Key': '937e78fa81e94398aa55b2cfc814183d' // Accept: 'application/json; odata=verbose'
            }
          }
        );
        var jsons = await sentences.text();
        var _sresults = JSON.parse(jsons)[0].sentLen; // if chars > 2000, sum sresults

        // console.log(_sresults);
        var index;
        sum = 0;
        total = 0;
        breaks = []; // for items that are under charLimit, sum

        _sresults.some(function(a, i) {
          index = i; // if string is over limit, do this

          if (a > charLimit) {
            breaks.push(sum);
          } // else, do this
          else {
            if (sum + a > charLimit) {
              breaks.push(sum);
              sum = a;
            } else {
              sum += a;
            }

            total += a;
          }
        });
        // console.log(index, total, breaks);
        // console.log(breaks.length)
        var firstCut = 0;

        for (var b = 0; b < breaks.length; b++) {
          firstCut += breaks[b];
          // console.log(firstCut);
          // console.log(b);

          var rb = filteredParents[i].transarray;

          // console.log(b != 0 && b == breaks.length)

          // take care of cases where there's only one break
          if (breaks.length == 1) {
            var first = textArray.slice(0, breaks[0]).split('[')[1];
            rb.push(first);
            var last = textArray.slice(firstCut).split(']')[0];
            // console.log(last)
            rb.push(last);
          }
          // all other cases with >1 break
          if (breaks.length != 1) {
            if (b == 0) {
              var first = textArray.slice(0, breaks[0]).split('[')[1];
              rb.push(first);
              // console.log('first: ' + first);
            } else if (b != 0 && b == breaks.length - 1) {
              var last = textArray.slice(firstCut).split(']')[0];
              //console.log('last' + textArray.slice(firstCut));
              rb.push(last);
              // console.log('last: ');
            } else if (b != breaks.length - 1) {
              var inner = textArray.slice(firstCut, firstCut + breaks[b + 1]);
              rb.push(inner);
              // console.log('inner: ' + inner);
            } else {
              // console.log(b)
              // console.log('no breaks');
            }
          }
          //console.log(rb);
        }
      }

      var arrLimit = 100;
      if (chars < charLimit) {
        sumsum += chars;

        // console.log(chars, sumsum);
        // if sumsum < char limit, push item to array
        if (sumsum < charLimit) {
          // console.log(text.length)
          sumSumArray.push({
            text: ctt
          });
          // console.log(sumSumArray)
        }
        // if sumsum > char limit
        //  - push array to big array
        //  - reset sumsum to current chars
        //  - clear array
        //  - push current text to array as obj
        if (sumsum >= charLimit && bigArr.length < arrLimit) {
          // console.log(chars, sumsum)
          var sumToPush = sumSumArray;
          bigArr.push(sumToPush);
          sumSumArray = [];
          sumsum = chars;
          // console.log('new sum')

          //   console.log(sumsum);
          sumSumArray.push({
            text: ctt
          });
        }

        // grab that last array
        // TODO: push remaining array to last subarray if there's space
        if (
          i == filteredParents.length - 1 &&
          sumsum != 0 &&
          bigArr.length < arrLimit
        ) {
          bigArr.push(sumSumArray);
        }
        // // in case things get nuts, make an even bigger array & dump everything into it...
        // if (bigArr.length >= arrLimit) {
        //   biggerArr.push({
        //     bigArr
        //   });
        //   bigArr = [];
        //   sumSumArray = [];
        //   sumsum = chars;
        //   console.log(sum);
        //   sumSumArray.push({
        //     text: text
        //   });
        // }

        //console.log(sumSumArray);
        // console.log(bigArr);
        // console.log(biggerArr);
      }
    }
  }

  // send down-chunked requests, join responses & return to object
  // send up-chunked requests & return to object

  // put language into variable for use as query param

  (async function() {
    await getNodes();
    await getBreaks();
  })();
  $(document).ready(function() {
    $('a.trBt').click(function() {
      var lan = $(this).data('lang');
      //console.log(lan == 'en');
      if (lan !== 'en') {
        async function getTranslation() {
          // fetch translations
          console.log(bigArr);
          for (var i = 0; i < bigArr.length; i++) {
            // console.log(bigArr[i]);
            // TODO:  - send request to relay instead of translator
            //        - process results on server instead of client
            //        - return JSON as res
            var translations = await fetch(
              'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' +
              lan +
              '&textType=html', {
                method: 'post',
                body: JSON.stringify(bigArr[i]),
                headers: {
                  'Content-Type': 'application/json; odata=verbose',
                  'Ocp-Apim-Subscription-Key': '937e78fa81e94398aa55b2cfc814183d'
                    //"Access-Control-Allow-Origin": "https://broward.org"
                }
              }
            );
            var jsons = await translations.text();
            // console.log(jsons);
            tresults = JSON.parse(jsons);
            // console.log(tresults);
            for (var j = 0; j < tresults.length; j++) {
              bigArr[i][j].text = tresults[j].translations[0].text;
            }
            //console.log(bigArr);
          }
          var flatArr = bigArr.flat(2);
          //console.log(flatArr);
          var counter = 0;
          for (var i = 0; i < filteredParents.length; i++) {
            if (filteredParents[i].text.length < charLimit) {
              filteredParents[i].translation = flatArr[counter].text;
              counter += 1;
            }
          }

          for (var i = 0; i < filteredParents.length; i++) {
            //console.log(filteredParents[i]);

            var transJoint = '';
            if (filteredParents[i].transarray.length > 0) {
              for (var j = 0; j < filteredParents[i].transarray.length; j++) {
                ttt = [{
                  text: filteredParents[i].transarray[j]
                }];
                var translations = await fetch(
                  'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' +
                  lan +
                  '&textType=html', {
                    method: 'post',
                    body: JSON.stringify(ttt),
                    headers: {
                      'Content-Type': 'application/json; odata=verbose',
                      'Ocp-Apim-Subscription-Key': '937e78fa81e94398aa55b2cfc814183d'
                        //"Access-Control-Allow-Origin": "https://broward.org"
                    }
                  }
                );
                var jsons = await translations.text();
                // console.log(jsons);
                ttresults = JSON.parse(jsons);
                // console.log(ttresults);
                transJoint = ttresults[0].translations[0].text;
                filteredParents[i].translations.push(transJoint);
              }
              var joint = filteredParents[i].translations.join(' ');
              filteredParents[i].translation = joint;
            }
          }
        }
        async function replaceText() {
          // loop through response and inject translated text back into page
          for (var i = 0; i < filteredParents.length; i++) {
            var xp = filteredParents[i].xpath;
            var translatedText = filteredParents[i].translation; // XPath of single element to target

            var xpath = document.evaluate(
              xp,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            $(xpath).html(translatedText);
          }
        }
        (async function() {
          await getTranslation();
          await replaceText();
        })();
      } else if (lan === 'en') {
        for (var i = 0; i < filteredParents.length; i++) {
          var xp = filteredParents[i].xpath;
          var originalText = filteredParents[i].text;

          var xpath = document.evaluate(
            xp,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          $(xpath).html(originalText);
        }
      }
    });
  });
});

$('#translate').on('click', function(e) {
  $('ul.tr-dd').toggleClass('showtr');
  e.stopPropagation();
  //  $(this).find("ul.tr-dd").toggleClass("");
});
$(document).on('click', function(e) {
  if ($(e.target).is('ul.tr-dd') === false) {
    $('ul.tr-dd').removeClass('showtr');
  }
}); //Spanish
document.getElementById('lang-es').onclick = function() {
  localStorage.setItem('translation', 'es');
};
//French
document.getElementById('lang-fr').onclick = function() {
  localStorage.setItem('translation', 'fr');
};
//Creole
document.getElementById('lang-ht').onclick = function() {
  localStorage.setItem('translation', 'ht');
};
//Portuguese
document.getElementById('lang-pt').onclick = function() {
  localStorage.setItem('translation', 'pt');
};
//English
document.getElementById('lang-en').onclick = function() {
  localStorage.setItem('translation', 'en');
};

// (async function() {
//   await getTranslation();
//   await replaceText();
// })()