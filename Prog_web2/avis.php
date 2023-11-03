<?php 

if(array_key_exists('lang', $_GET) && $_GET['lang'] === 'en')

	include 'src/en.php';
else
	include 'src/fr.php';

include 'src/form.php';

?>

<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="author" content="WU Florian">
	<meta name="description" content="Page de publication">

	<title><?= $lang['avis']['head']; ?></title>

	
</head>

<body>

	<?php include 'templates/header.php';?>

	

	<div class="content">
		<div class="intro">
			<p><?= $lang['publish']['content']['intro']; ?></p>
		</div>

		<div class="form">
			<form id="post_form" method="post">
				<div>
					<label for="username"><?= $lang['publish']['content']['form']['username']; ?></label>
					<input 
						type="text" 
						id="username" 
						name="username" 
						required 
						aria-required="true" 
						aria-labelledby="username"
					>
				</div>
				<div>
					<label for="message"><?= $lang['publish']['content']['form']['message']; ?></label>
					<textarea 
						name="message" 
						id="message" 
						cols="30" 
						rows="10" 
						required 
						aria-required="true"
						aria-labelledby="message"
					></textarea>
				</div>
				<button id="submit_button" type="submit"><?= $lang['publish']['content']['form']['button']; ?></button>
			</form>
		</div>
	</div>

	<!-------------------------------- CONTENU ------------------------------->
	<?php include 'templates/footer.php';?>

	<script src="src/script.js"></script>

</body>

</html>