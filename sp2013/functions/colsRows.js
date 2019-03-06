$(document).ready(function() {

    var container = document.createElement("div");
    container.setAttribute('id', 'container');
    container.classList.add('container', 'text-center', 'my-5');

    $.ajax({
        url: "http://bc-net/Sandbox/juandev/_api/web/lists/GetByTitle('Qlinks')/items",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function(data) {
            var items = data.d.results;
           // console.log(items);



            var createRows = function(i, items) {

                //Creates 3 Rows inside container
                var row = document.createElement("div");
                row.setAttribute('id', 'row' + i);
                row.classList.add('row', 'mb-5');

                //Appends Row to Container
                var getContainer = document.getElementById('container');
                getContainer.appendChild(row);

                createColumns(i, items);

            }; //End of creare Rows Function

            

            //Creates Rows for every 3 items
            var createColumns = function(i, items) {

                for (var j = i; j < (i + 3); j++) {


                    //Creates 3 Columns inside the 3 rows
                    var columns = document.createElement("div");
                    columns.setAttribute('id', 'columns' + j);
                    columns.classList.add('col-md-4', 'slide-in-demo');
                    columns.style.left = '0%';

                    //appends the 3 columns inside the rows
                    var getRow = document.getElementById('row' + i);
                    getRow.appendChild(columns);

                    //Pulls the images from the list

                    var icon = document.createElement("img");
                    icon.setAttribute('id', 'icon' + j);
                    icon.style.width = '15%';
                    icon.src = items[j].IconImage1.Url;

                    //Pulls header from the list
                    var header = document.createElement("h5");
                    header.setAttribute('id', 'header' + j);
                    header.innerHTML = items[j].Title;
                    header.classList.add("font-weight-bold", "my-4");

                    //Appends elements columns
                    var getColumns = document.getElementById('columns' + j);
                    getColumns.appendChild(icon);
                    getColumns.appendChild(header);

                    //Creates buttons
                    var button = document.createElement("button");
                    button.classList.add('btn', 'btn-primary', 'btn-sm', 'waves-effect', 'waves-light');
                    button.setAttribute('id', 'button' + j);
                    button.setAttribute('href', '#');

                    //Appends button to coulmns
                    getColumns.appendChild(button);

                    var txt = document.createTextNode('LEARN MORE');

                    var getButton = document.getElementById('button' + j);
                    getButton.appendChild(txt);

                    var para = document.createElement("p");
                    para.classList.add('grey-text', 'mb-md-0', 'mb-5');



                } //End of j Loop
                return;


            } // End of createColumns function


            if (items.length > 0) {


                //Gets Section in DOM
                var getSection = document.getElementById('services');

                getSection.appendChild(container);

                //var trow = 0;

                for (var i = 0; i < items.length; i++) {
                    //This loops creates Rows, Columns, H5, Images and Buttons   

                    var itemId = items[i].ID;

                    //console.log(itemId); 

                    if (i % 3 == 0) {

                        createRows(i, items);

                    } //end of % if statement

                } //End of for loop
                

                //function that targets dynamic id         
                function getColElement(row, column) {
                    var targetId = row * 3 + column;
                    //console.log(targetId);
                    var getTargetId = document.getElementById("columns" + targetId);
                    getTargetId.style.backgroundColor = 'red';
                   
                 
                } //End of function that targets id

                getColElement(1, 2);
                getColElement(2, 0);

            }//End of if item.length statement

        },
        error: function(data) {
            alert("Error: " + data);
        }
    }); //End Service Icons  //End Service Icons

}); //End ready function  