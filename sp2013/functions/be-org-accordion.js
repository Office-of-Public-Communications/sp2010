$(document).ready(function () {

    /*r container = document.createElement("div");
    container.setAttribute('id', 'container');
    container.classList.add('container', 'text-center', 'my-5');*/

    $.ajax({
        url: "http://bc-net/_api/web/lists/GetByTitle('specialDiscounts')/items",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            var items = data.d.results;
            console.log(items);

            var createRows = function (i, items) {

                //Creates 3 Rows inside container
                var row = document.createElement("div");

                row.setAttribute('id', 'row' + i);
                row.classList.add('row', 'animated', 'fadeInUp');

                //Appends Row to Container
                var getContainer = document.getElementById('automotive');
                getContainer.appendChild(row);

                createColumns(i, items);

            }; //End of creare Rows Function

            //Creates columns
            var createColumns = function (i, items) {

                for (var j = i; j < (i + 3); j++) {

                    //Creates 3 Columns inside the 3 rows
                    var columns = document.createElement("div");
                    columns.setAttribute('id', 'columns' + j);
                    columns.classList.add('col-md-4');

                    //appends the 3 columns inside the rows
                    var getRow = document.getElementById('row' + i);
                    getRow.appendChild(columns);

                    //Create single News
                    var singleNews = document.createElement("div");
                    singleNews.setAttribute('id', 'singleNews' + j);
                    singleNews.classList.add("single-news", "mb-4");

                    var getColumns = document.getElementById('columns' + j);
                    getColumns.appendChild(singleNews);

                    //Inside Row
                    var insideRow = document.createElement("div");
                    insideRow.setAttribute('id', 'insideRow' + j);
                    insideRow.classList.add('row');

                    var getsingleNews = document.getElementById('singleNews' + j);
                    getsingleNews.appendChild(insideRow);

                    //Col-md-3
                    var insideCol = document.createElement("div");
                    insideCol.setAttribute('id', 'insideCol' + j);
                    insideCol.classList.add('col-md-3');

                    //Col-md-9
                    var insideColRight = document.createElement("div");
                    insideColRight.setAttribute('id', 'insideColRight' + j);
                    insideColRight.classList.add('col-md-9');

                    var getInsideRow = document.getElementById('insideRow' + j);
                    getInsideRow.appendChild(insideCol);
                    getInsideRow.appendChild(insideColRight);

                    //Rounded Image Class
                    var rounded = document.createElement("div");
                    rounded.setAttribute('id', 'rounded' + j);
                    rounded.classList.add('rounded', 'z-depth-1', 'mb-4');

                    var getinsideCol = document.getElementById('insideCol' + j);
                    getinsideCol.appendChild(rounded);

                    //Pulls the images from the list
                    var image = document.createElement("img");
                    image.setAttribute('id', 'image' + j);
                    image.classList.add("img-fluid");
                    image.src = items[j].Image.Url;

                    var getRounded = document.getElementById('rounded' + j);
                    getRounded.appendChild(image);

                    //Pulls header from the list
                    var title = document.createElement("p");
                    title.setAttribute('id', 'title' + j);
                    title.innerHTML = items[j].Title;
                    title.classList.add("font-weight-bold", "dark-grey-text");

                    insideColRight.appendChild(title);

                    var justifyContent = document.createElement('div');
                    justifyContent.setAttribute('id', 'justifyContent' + j);
                    justifyContent.classList.add('d-flex', 'justify-content-between', 'topSpace');

                    insideColRight.appendChild(justifyContent);

                    var textTruncate = document.createElement('div');
                    textTruncate.setAttribute('id', 'textTruncate' + j);
                    textTruncate.classList.add('col-11', 'text-truncate', 'pl-0', 'mb-3');


                    justifyContent.appendChild(textTruncate);

                    //Pulls anchor from the list
                    var anchor = document.createElement("a");
                    anchor.setAttribute('id', 'anchor' + j);
                    anchor.setAttribute('href', items[j].Link.Url, +j);
                    anchor.setAttribute('target', '_blank', +j);
                    anchor.classList.add("dark-grey-text");
                    anchor.innerHTML = items[j].Description;

                    textTruncate.appendChild(anchor);

                    var arrowAnchor = document.createElement("a");
                    arrowAnchor.setAttribute('id', 'arrowAnchor' + j);
                    arrowAnchor.setAttribute('target', '_blank' + j);
                    arrowAnchor.setAttribute('href', items[j].Link.Url, +j);

                    justifyContent.appendChild(arrowAnchor);

                    var iconArrow = document.createElement('i');
                    iconArrow.classList.add('fas', 'fa-angle-double-right');

                    var getarrowAnchor = document.getElementById('arrowAnchor' + j);
                    getarrowAnchor.appendChild(iconArrow);

                    //var test = document.getElementById( 'arrowAnchor' + j);
                    //test.onclick = function() {
                    //  console.log('Hello');
                    //}

                } //End of j Loop
                return;


            } // End of createColumns function

            //Array of categories
            var catGroup = [];
            console.log(catGroup);


            if (items.length > 0) {


                for (var i = 0; i < items.length; i++) {

                    var categories = items[i].Category;
                    console.log(categories)
                    catGroup.push(categories);

                    if (catGroup[i] === "Automotive") {
                        var automotive = document.getElementById('automotive');
                        console.log(catGroup[i]);

                    } else if (catGroup[i] === "Entertainment") {
                        var entertainment = document.getElementById('entertainment');
                        console.log(catGroup[i]);

                    } else if (catGroup[i] === "Health and Beauty") {
                        var health = document.getElementById('health');
                        console.log(catGroup[i]);

                    } else if (catGroup[i] === "Travel") {
                        var travel = document.getElementById('travel');
                        console.log(catGroup[i]);

                    } else if (catGroup[i] === "Electronics") {
                        var electronics = document.getElementById('electronics');
                        console.log(catGroup[i]);

                    } else if (catGroup[i] === "Services") {
                        var services = document.getElementById('services');
                        console.log(catGroup[i]);

                    } else if (catGroup[i] === "Housing") {
                        var housing = document.getElementById('housing');
                        console.log(catGroup[i]);

                    } else {}

                    if (i % 3 == 0) {
                        createRows(i, items);

                    } //end of % if statement

                } //End of for loop



            } //End of if item.length statement

        },
        error: function (data) {
            alert("Error: " + data);
        }
    }); //End Service Icons  //End Service Icons

}); //End ready function