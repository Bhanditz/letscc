# About Let's CC

"Let's CC" is a search engine service that helps finding contents such
as images, music, videos, and documents distributed under CCL
(Creative Commons License) quickly, and easily. It was planned and
developed by CC Korea volunteers in 2011.

Additional development by Matt Lee at Creative Commons in 2014.

It utilizes many global service api such as Flickr, YouTube, CCMixter,
Jamendo, and SlideShare.

This project is to encourage many people to share their knowledge,
art, and data effectively, and experts of various areas to cooperate
and collaborate to create innovative contents continuously.

homepage: http://www.cckorea.org/xe/?mid=english

## Requirements

* MySQL: 5.1.0 or more
* PHP: 5.3.0 or more, ext-curl, ext-json required

## How to install

1. Create database and user for MySQL.

	$ mysql -u root -p
	mysql> CREATE DATABASE [databasename];
	mysql> GRANT ALL PRIVILEGES ON [databasename].* TO
	  -> "[username]"@"[hostname]" IDENTIFIED BY "[password]";
	mysql> FLUSH PRIVILEGES;
	mysql> EXIT
	
    [databasename] : Name of the database for the project
    [username] : Name of the user account for the project
    [password] : Password for user account

2. Create table

	$ mysql -u [username] -p [databasename] < [download path]/doc/schema.sql

3. Create Facebook app here

* You can create Facebook app here : https://developers.facebook.com/apps

4. Create Twitter app

* You can create Twitter app here : https://dev.twitter.com/apps/new

5. Create SlideShare API

* You can create SlideShare app here : http://www.slideshare.net/developers

6. Update/modify config.php

* Copy "lib/config.sample.php" to "config.php".

* Rename "config.sample.php" to "config.php".

	- Set a key for 'cookie' encryption.
	define('COOKIE_SECRET_KEY','');

	- Set the admin’s ID and PW.
	define('ADMIN_ID','');
	define('ADMIN_PASSWD','');

	- Set the email address and name.
	define('EMAIL_FROM_ADDR','');
	define('EMAIL_FROM_NAME','');

	- Set the database information.
	define('DB_HOST','');
	define('DB_NAME','');
	define('DB_USER','');
	define('DB_PASSWD','');

	- Set the Facebook App ID and App secret code.
	define('FACEBOOK_APPID', '');
	define('FACEBOOK_SECRET', '');
	define('FACEBOOK_CALLBACK', 'http://'.$_SERVER['SERVER_NAME'].'/member/oauth/facebook/callback.php');

	- Set the Twitter Consumer Key and Consumer Secret.
	define('CONSUMER_KEY', '');
	define('CONSUMER_SECRET', '');
	define('TWITTER_CALLBACK', 'http://'.$_SERVER['SERVER_NAME'].'/member/oauth/twitter/callback.php');

	- Set the SlideShare API.
    define('SLIDESHARE_KEY', '');
    define('SLIDESHARE_SECRET', '');
