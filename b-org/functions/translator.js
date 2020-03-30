var lang = 'es';
var con = $('#vidMainInfo');
var cttx = con[0].innerHTML;
var ctt = cttx.replace(/ {2,}/g, ' ');
console.log(ctt);
var ttt = [{"text": ctt}];

fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + lang + '&textType=html', {
  method: 'post',
  body: JSON.stringify(ttt),
  headers: { 'Content-Type': 'application/json; odata=verbose', 'Ocp-Apim-Subscription-Key': '937e78fa81e94398aa55b2cfc814183d', 'Accept': 'application/json; odata=verbose' }
}).then(response => response.json()).then(response => console.log(response))//[0].translations[0].text));