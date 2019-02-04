$.ajax({
    method: 'GET',
    url: 'http://api.theweather.com/index.php?api_lang=eu&localidad=148892&affiliate_id=1e76oxn8znyf&v=2.0&h=1',
    dataType: 'XML',
    success: function(xml){
        // get the thing
        $(xml).find(`the thing`).each(function(){
            // get the thing in the thing
            var `thing in thing`;
            // do a thing with the thing in thing
            $(`weather thing`).
        })
    },
    error: function(){
        console.log('uh oh...the thing in the thing wouldn\'t do the thing')
    }
})