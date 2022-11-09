<?php

if (isset($_POST['fnumber']) & isset($_POST['snumber']) & isset($_POST['tnumber'])) {
	$FristNumber = $_POST['fnumber'];
	$SecondNumber = $_POST['snumber'];
	$TreeNumber  = $_POST['tnumber'];
}
?>
<!DOCTYPE html>

<html lang="en">

<head>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
	<link href="https://fonts.cdnfonts.com/css/matematica" rel="stylesheet" />
	<style type="text/css">
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-family: 'Matematica';
		}
	</style>
	<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
	<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

	<script>
		MathJax.Hub.Config({
			messageStyle: "none",
			TeX: {
				equationNumbers: {
					autoNumber: "all"
				}
			},
			tex2jax: {
				inlineMath: [
					['$', '$'],
					['\\(', '\\)']
				],
				displayMath: [
					['\\begin{displaymath}', '\\end{displaymath}'],
					['\\begin{equation}', '\\end{equation}']
				],
				processEscapes: true,
				preview: "none"
			}
		});

		function CreateExyRad(n, a, m) {
			var res = "$\[ {\sqrt[m]{a \div \sqrt[m]{a \div }} }$"

			var element = document.getElementById("resultEcuacion")
			element.innerHTML = res
			//MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
		}

		function FristItem(KeyItem, VariableSend, ArgumentShow) {
			//console.log(KeyItem)
			console.log(isNaN(parseInt(KeyItem)))
			if ((!isNaN(parseInt(KeyItem)))) {


				if (KeyItem.length == 0) {
					document.getElementById("FristItem").innerHTML = "";
					return
				} else {
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							var jsonItem = JSON.parse(this.responseText);
							document.getElementById("FristItem").innerHTML = jsonItem.voids;
							CreateExyRad(jsonItem.voids, jsonItem.variable, jsonItem.radicando)
						}
					};
					xmlhttp.open("POST", "ExYRadAjax.php", true);
					xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					xmlhttp.send(VariableSend + "=" + KeyItem)
				}
			} else {
				if (KeyItem.length >= 1) {
					document.getElementById(ArgumentShow).innerHTML = KeyItem[0];
				} else {
					console.log("Se envio")
					document.getElementById(ArgumentShow).innerHTML = "m"
				}
			}
		}
	</script>


</head>

<body>
	<div class="d-flex">
		<div class="card text-center p-4 flex-shrink-1 w-100">
			<div class="card-header">
				<strong> Exponentes y Radicales </strong>
			</div>
			<div class="card-body text-center center text-black bg-primary mb-3">

				<form name="number" action="#" method="POST">
					<button class="btn btn-success" style="position: absolute; bottom:50%; left:90%;  border-radius: 50%; width: 5rem; height: 5rem; ">PLAY</button>

					<h5 style='font-family: "Matematica"'>Inserte el numero de veces que se necestia: </h5>
					<div class="input-group mb-3">

						<input onkeyup="FristItem(this.value,'fnumber','basic-frist')" type="text" class="form-control" placeholder="Primer Numero" aria-label="Recipient's username" aria-describedby="basic-addon2" />
						<div class="input-group-append">
							<span class="input-group-text" id="basic-frist">n</span>
						</div>
					</div>
					<h5>Inserte el coeficiente que tendra las variables:</h5>
					<div class="input-group mb-3">

						<input onkeyup="FristItem(this.value,'snumber','basic-two')" type="text" class="form-control" placeholder="Coeficiente, Variable" aria-label="Recipient's username" aria-describedby="basic-addon2" />
						<div class="input-group-append">
							<span class="input-group-text" id="basic-two">a</span>
						</div>
					</div>
					<h5>Inserte el radicando que tendra cada uno de los coeficientes:</h5>
					<div class="input-group mb-3">

						<input onkeyup="FristItem(this.value,'tnumber','basic-tree')" type="text" class="form-control" placeholder="Radical Numero" aria-label="Recipient's username" aria-describedby="basic-addon2" />
						<div class="input-group-append">
							<span class="input-group-text" id="basic-tree">m</span>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="flex-fill m-2">
			<div>
				<h2>Inserte sus valores Para continuar con la operación: </h2>
			</div>
			<div class="minotacionmatematica4">

				<p>
					\[A). {\sqrt[m]{a \div \sqrt[m]{a \div \cdots}} } = (\sqrt[m^n]{a})^{m^n-1 \over m-1} \]
				</p>
				<H2>Creando elemento</H2>
				<p id="resultEcuacion">
					\[ {\sqrt[m]{a \times \sqrt[m]{a \times \cdots}} } = (\sqrt[m^n]{a})^{m^n-1 \over m-1} \]
				</p>

				<?php
				echo '<span id="FristItem"></span>';
				echo $_POST['fnumber'];
				?>
			</div>
		</div>
	</div>
</body>

</html>