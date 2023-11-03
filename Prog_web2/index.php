<?php

session_start();

if(array_key_exists('lang', $_GET) && $_GET['lang'] === 'en')

	include 'src/en.php';
else
	include 'src/fr.php';

?>
<!DOCTYPE html>
<!--
<html lang="fr">-->

<head>
	<meta charset="UTF-8">
	<meta name="author" content="WU Florian">
	<meta name="description" content="Page d'accueil">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?= $lang['index']['head']; ?></title>


	<link rel="icon" type="image/png" href="img/MultiAnime.png"/>
	<link rel="stylesheet" type="text/css" href="css/style.css"/>
</head>

<body>

 	<?php include 'templates/header.php';?>

</body>

</html>