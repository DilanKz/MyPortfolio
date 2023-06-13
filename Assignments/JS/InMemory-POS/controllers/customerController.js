let selectedCustomerRow;
let customerList=[];
let customerIndex;
let cusId;
let lastTr;


function incrementCusId(currentID) {
    if (currentID==='no'){
        cusId='C001';
    }else {
        let number =parseInt(currentID.slice(1), 10);
        number++;
        cusId = "C" + number.toString().padStart(3, "0");
        console.log(cusId);
    }
}

incrementCusId('no');
$('#cid').val(cusId);

function clearCustomerFields() {
    $('#cid').val("");
    $('#Name').val("");
    $('#Address').val("");
    $('#contact').val("");

}

let btnAdd = $("#btnAdd");
let tblCustomers = $("#tblCustomers");
let btnUpdate = $("#btnUpdate");
let btnDelete = $("#btnDelete");
let btnClear = $("#btnClear");


btnUpdate.prop('disabled',true);
btnDelete.prop('disabled',true);


//Button Add function
btnAdd.click(function (){

    let cusID = $('#cid').val();
    let cusName = $('#Name').val();
    let cusAddress = $('#Address').val();
    let cusContact = $('#contact').val();

    lastTr=$('<tr> <td>'+ cusID +'</td> <td>'+ cusName +'</td> <td>'+ cusAddress +'</td> <td>'+ cusContact +'</td> </tr>');
    $('#tblCustomers').append(lastTr);

    //adding the customer to the list

    let customer={
        id: cusID ,
        name: cusName,
        address: cusAddress,
        contact: cusContact
    }

    customerList.push(customer);

    customerList[0].name;

    console.log(customerList);
    loadCustomerOptionIds();

    clearCustomerFields();

    btnUpdate.prop('disabled',false);
    btnDelete.prop('disabled',false);

    incrementCusId(lastTr.find('td:first').text());
    $('#cid').val(cusId);

});

tblCustomers.dblclick(function (event){

    btnUpdate.prop('disabled',false);
    btnDelete.prop('disabled',false);
    btnAdd.prop('disabled',true);

    selectedCustomerRow = event.target.closest("tr");
    //getting the index of the selected customer
    customerIndex = customerList.findIndex(customerList => customerList.id === selectedCustomerRow.cells[0].textContent);
    console.log(customerIndex)

    $('#cid').val(selectedCustomerRow.cells[0].textContent);
    $('#Name').val(selectedCustomerRow.cells[1].textContent);
    $('#Address').val(selectedCustomerRow.cells[2].textContent);
    $('#contact').val(selectedCustomerRow.cells[3].textContent);

});
//Button delete function
btnUpdate.click(function (){

    let cusID = $('#cid').val();
    let cusName = $('#Name').val();
    let cusAddress = $('#Address').val();
    let cusContact = $('#contact').val();

    selectedCustomerRow.cells[0].textContent=cusID;
    selectedCustomerRow.cells[1].textContent=cusName;
    selectedCustomerRow.cells[2].textContent=cusAddress;
    selectedCustomerRow.cells[3].textContent=cusContact;

    clearCustomerFields();



    //updating the selected customer from the list
    customerList[customerIndex].id=cusID;
    customerList[customerIndex].name=cusName;
    customerList[customerIndex].address=cusAddress;
    customerList[customerIndex].contact=cusContact;

    console.log(customerList);

    btnUpdate.prop('disabled',true);
    btnDelete.prop('disabled',true);
    btnAdd.prop('disabled',false);

    //getting the first td of the last tr and
    incrementCusId(lastTr.find('td:first').text());
    $('#cid').val(cusId);
});

btnDelete.click(function (){
    selectedCustomerRow.remove();

    //removing the selected customer from the list
    customerList.splice(customerIndex,1);
    console.log(customerList);

    clearCustomerFields();

    btnUpdate.prop('disabled',true);
    btnDelete.prop('disabled',true);
    btnAdd.prop('disabled',false);

    incrementCusId(lastTr.find('td:first').text());
    $('#cid').val(cusId);

});

btnClear.click(function (){
    clearCustomerFields();
})