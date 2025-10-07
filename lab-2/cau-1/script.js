function cal() {
  let salary = parseFloat(document.getElementById("salary").value);
  let coeff = parseFloat(document.getElementById("coeff").value);

  let total = salary * coeff;

  document.getElementById("total_salary").value = total;
}
