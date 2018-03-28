<?php
error_reporting(-1);
ini_set('display_errors', 'On');

// Cache function
// gets the contents of a file if it exists, otherwise grabs and caches
// For caching problem, do next!
// https://davidwalsh.name/php-cache-function
function get_content($file, $url, $minutes = 10) {
	//vars
	$current_time = time(); 
	$expire_time = $minutes * 60; 
	if (file_exists($file)) {
		$file_time = filemtime($file);
	}
	
	// Check if there is a response from the remote server to check if it is up.
	$response = null;
	system('ping -c 1 ' . $url, $response);
	
	// Checked to see if the file is there and has been updated.
	// If not, write to the file again.
	// Check if there is a connection
	// || file_exists($file) && $response != 0 
	if (!file_exists($file)){
		// Write new version to the cache
		$content = file_get_contents($url);
		file_put_contents($file, $content);
		
		return $file;
	} if (file_exists($file) && ($current_time - $expire_time < $file_time) ) {
		return $file;
	} else {
		$content = file_get_contents($url);
		file_put_contents($file, $content);
		
		return $file;
	}
}

function rent_table($function_url) {
	$json = file_get_contents($function_url);

	echo $json;
}

$rent_cache = 'rentcache.json';
$rent_remote = 'https://www.rentcafe.com/rentcafeapi.aspx?requestType=apartmentavailability&APIToken=NDY5OTI%3d-XDY6KCjhwhg%3d&propertyCode=p0155985';
$time = 10;

$return_tables = get_content($rent_cache, $rent_remote, $time); 

rent_table($return_tables); 
?>