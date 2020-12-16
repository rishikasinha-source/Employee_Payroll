window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0){
            textError.textContent ="";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch(e){
            textError.textContent= e;
        }
    });

     const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output');
    salary.addEventListener('input',function(){
        output.textContent=salary.value;
    });
});

const date = document.querySelector('#date');
    const dateError = document.querySelector(".date-error");
    date.addEventListener('input',function(){
        let startDate =  document.querySelector('#day').value+"-"+document.querySelector('#month').value+"-"+document.querySelector('#year').value; 
        try{
            (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
            dateError.textContent = "";     
        }
        catch(e){
            dateError.textContent= e;
        }
    });


    const save = () =>{
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch(e){
        return;      
    }
}
const createEmployeePayroll = () =>{
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getInputValueById = (id) =>{
    let value = document.querySelector(id).value;
    return value;
}
const getSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item =>{
        if(item.checked) setItems.push(item.value);
    });
    return setItems
}
function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(loacalStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
}
else {
    employeePayrollList = [EmployeePayrollData];
}
alert(employeePayrollList.toString());
localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}
const resetForm =() =>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','Select');
    setValue('#month','Select');
    setValue('#year','Select');
}
const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setValue =(id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
}