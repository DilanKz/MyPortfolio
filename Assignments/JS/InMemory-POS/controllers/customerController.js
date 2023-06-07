let selectedCustomerRow;
let customerList=[];
let customerIndex;

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

    let tr=$('<tr> <td>'+ cusID +'</td> <td>'+ cusName +'</td> <td>'+ cusAddress +'</td> <td>'+ cusContact +'</td> </tr>');
    $('#tblCustomers').append(tr);

    //adding the customer to the list
    customerList.push({id: cusID ,name: cusName, address: cusAddress,contact: cusContact});
    console.log(customerList);

    clearCustomerFields();

    btnUpdate.prop('disabled',false);
    btnDelete.prop('disabled',false);

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

});

btnClear.click(function (){
    clearCustomerFields();
})