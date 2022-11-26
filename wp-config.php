<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '2a=b~,T5p1^G_>.$:P+2=CL8T=Xl{afrfsuthA2@a#3;X>nKu-yC-8Uf0<q<^7By' );
define( 'SECURE_AUTH_KEY',  '~;{5m3b^n3&xuJu+[Y#7`E*of([?xGjatj>i#mOBu$Zj<X=dO>{3R9w;4!--S~&j' );
define( 'LOGGED_IN_KEY',    'Hsxh.p}N*&|YMqMk1auq[y(,z_%zy)6pn37~&8SCBz-@86XP[|=6n0fF}zjT4C6D' );
define( 'NONCE_KEY',        '&XxJ 4$ZSe+d/(q:*ZS${?U~/;.7Q.G>6@i;{.a=hyB[f##LWPEA -b2[>Fb8g(K' );
define( 'AUTH_SALT',        ']7RnXOh/drQM(T(fQ:RKvQ2,>BD=;,Fxrb!`0<(On2dd*li9FwSFF9|==$gZp12`' );
define( 'SECURE_AUTH_SALT', 'kna+7j#AtdtV<4a:$(DuKl0x Yysy1a#)+68w*c*0+v#>-}DIFP$Wh7WBLP8Ia=i' );
define( 'LOGGED_IN_SALT',   'Mjr,wL}/b#T|44SN! [zq&%]ujNAS6}g<YH1a3!T<pR$CCa*)/hu%Byj;E</]Yrc' );
define( 'NONCE_SALT',       'ru(tMzMSsi`}01 jU%W2jv5oN]ycFkzWI^nci=[U^IzDlBDkZy{,6xUdO|KyRnp^' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
