

var Inventory = [];
var indexCounter = 1;
var invItems = document.getElementById("invItems");
var total = 0;




// our constructor
function Item(pType, pCount, pPrice) {
    this.type = pType;
    this.count = pCount;
    this.ID = indexCounter++;;  //each time we create a new Item type and variation we give it a unique ID 
    this.price = pPrice;

}





// Now comes the code that must wait to run until the document is fully loaded
document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("addButton").addEventListener("click", function () {

        var selectElement = document.getElementById("invItems");
        var itemType = selectElement.options[selectElement.selectedIndex].value;
        //var choice = document.getElementById("invItems");

        //if statements for when a varient is used then the data from invItems would not be used


        if (itemType === "starFragchoice") {
            choice = document.getElementById("starfragtype");
            itemType = choice.options[choice.selectedIndex].value;
        }
        else if (itemType === "bambooPiece") {
            choice = document.getElementById("bambootype");
            itemType = choice.options[choice.selectedIndex].value;
        }

        else if (itemType === "woodchoice") {
            choice = document.getElementById("woodtype");
            itemType = choice.options[choice.selectedIndex].value;
        }
        else if (itemType === "eggsType") {
            choice = document.getElementById("eggs");
            itemType = choice.options[choice.selectedIndex].value;
        }


        //Tells the user that they need to insert a number value
        count = document.getElementById("count").value;
        price = document.getElementById("price").value;
        price = price * count;
        
        if ((isNaN(count)) || count < 1 || (isNaN(price)) || price < 1) {
            alert("Please enter an amount");
        }
        else {
            Inventory.push(new Item(itemType, count, price));
            newItem = new Item(itemType, count, price)

            $.ajax({
                url: "/AddDelete",
                type: "POST",
                data: JSON.stringify(newItem),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    console.log(result);
                    document.location.href = "index.html#Show";  // go to this page to show item was added
                }
            })
        }
        console.log(Inventory);


    });

    //EventListener here shows a hidden menu
    //Else if allows for when the user changes selections
    invItems.addEventListener("change", function (event) {
        console.log("invItem = " + invItems.options[invItems.selectedIndex].value);
        document.getElementById("starfrags").style.display = "none";
        document.getElementById("woods").style.display = "none";
        document.getElementById("bamboos").style.display = "none";
        document.getElementById("eggtype").style.display = "none";
        if (invItems.options[invItems.selectedIndex].value == "starFragchoice") {
            document.getElementById("starfrags").style.display = "block";
        }


        else if (invItems.options[invItems.selectedIndex].value == "woodchoice") {
            document.getElementById("woods").style.display = "block";
        }


        else if (invItems.options[invItems.selectedIndex].value == "bambooPiece") {
            document.getElementById("bamboos").style.display = "block";
        }
        else if (invItems.options[invItems.selectedIndex].value == "eggsType") {
            document.getElementById("eggtype").style.display = "block";
        }



    });
    document.getElementById("buttonDelete").addEventListener("click", function () {

        var ID =  document.getElementById("deleteID").value; 
        $.ajax({
            type: "DELETE",
            url: "/DeleteItem/" + ID,
            success: function (result) {
                console.log(result);
                document.location.href = "index.html#Show";  // go to this page to show item was deleted
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
                alert("Server could not delete Note with ID " + ID)
            }
        });

    });


    // this will refresh the data each time you navigate back to the Show page
    $(document).on('pagebeforeshow', '#Show', function () {
        UpdateDisplay();
    }
    );

    function UpdateDisplay() {
        $.get("/getItems", function (data, status) {  // AJAX get
            Inventory = data;  // put the returned server json data into our local array

            whichElement = document.getElementById("Inventory")
            var li = document.createElement('li');
            var priceTotal = document.getElementById("totalPrice");
            var theList = document.getElementById("listUl");
            var totalPrice = 0;

            theList.innerHTML = "";
            Inventory.forEach(function (item, index) {
                var li = document.createElement('li');
                document.getElementById("ulID");
                theList.appendChild(li);
                li.setAttribute("data-parm", item.ID);
                li.setAttribute("class", "itemClass");
                li.innerHTML = li.innerHTML + "ID: " + (item.ID).toString() + " " + item.type + "  " + ":  " + (item.count).toString() + " Bells: " + (item.price).toString();
                totalPrice += item.price;
                

            });
            priceTotal.innerHTML ="Your Inventory Costs "+ (totalPrice).toString()+" Bells!";
            

        });






    }




});
