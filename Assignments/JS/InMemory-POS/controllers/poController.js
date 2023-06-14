let selectCusIds = $('#customerIds');
let selectItemIds = $('#itemIds');

function loadCustomerOptionIds(){
    selectCusIds.empty();
    selectCusIds.append($('<option selected>Select_ID</option>'));

    for (let index in customerList) {
        let option = $('<option value="'+index+'"> '+customerList[index].id+' </option>');
        selectCusIds.append(option)
    }
}


function loadItemOptionIds(){
    selectItemIds.empty();
    selectItemIds.append($('<option selected>Select_ID</option>'));

    for (let index in itemList) {
        let option = $('<option value="'+index+'"> '+itemList[index].id+' </option>');
        selectItemIds.append(option)
    }
}

//Date formatter

let date=new Date();

let fullDay = date.getDay();
let fullMonth = date.getMonth()+1;
let fullYear = date.getFullYear();

let dateFormatter=`${fullDay}-${fullMonth}-${fullYear}`;
$('#dtf').val(dateFormatter);

selectCusIds.click(function (){
    let text = $("#customerIds :selected").text();
    let index = $("#customerIds").val();
    if (text!=='Select_ID'){
        console.log(text+" "+index);

        let customerListElement = customerList[Number(index)];
        console.log(Number(index));
        $('#poCustomerName').val(customerListElement.name);
    }
});

selectItemIds.click(function (){
    let text = $("#itemIds :selected").text();
    let index = $("#itemIds").val();
    if (text!=='Select_ID'){
        console.log(text+" "+index);

        let itemListElement = itemList[Number(index)];

        $('#poItemDesc').val(itemListElement.desc);
        $('#poItemQtyOnHand').val(itemListElement.qty);
        $('#poItemUP').val(itemListElement.Up);

    }
});
