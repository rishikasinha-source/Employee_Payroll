window.addEventListener('DOMContentLoaded',(event) => {
	const name=document.querySelector('#name');
	const textError=document.querySelector('.text-error');
	name.addEvenListener('input', function() {
		if(name.value.length==0) {
			textError.textContent="";
			return;
		}
		try {
			(new EmployeePayrollData()).name=name.value;;
			textError.textContent="";
		  } catch (e) {
			textError.textContent=e;
		 }
	});

const salary=document.querySelector('#salary');
const output=document.querySelector('.salary-output');
output.textContent=salary.value;
salary.addEventListener('input',function(){
    output.textContent=salary.value;
});


document.getElementById("submit").onclick = function() {
    let employee = new EmployeePayroll();
    employee.name = document.getElementById("name").value;
    employee.profilePic = document.querySelector('input[name = profile]:checked').value;
    employee.gender = document.querySelector('input[name = gender]:checked').value;
    employee.department = document.querySelector('input[name = department]:checked').value;
    employee.salary = document.getElementById("salary").value;
    employee.note = document.getElementById("note").value;
    employee.startDate = new Date(parseInt(document.getElementById("year").value), parseInt(document.getElementById("month").value), parseInt(document.getElementById("day").value));
};
