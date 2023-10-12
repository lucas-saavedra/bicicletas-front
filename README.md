URL API : laravelapp.tramo4.ap
URL FRONTEND:  reactapp.tramo4.ar

**Paso 1:** Reemplazar en la aplicación todas las URL.
**Paso 2:** Modificar el .env con los datos del servidor. En mi caso, la bd es nombre\_base\_datos o base\_prueba.

El app url y demás url cambiarlas por la correcta (<http://laravelapp.tramo4.ap>)
Agregar archivo cors en carpeta config
Mover la aplicación de laravel a la carpeta compartida.
Renombrarla “bicicletas-api” y copiarla en /var/www

```shell
sudo cp bicicletas-api /var/www
```
o 
clonar el proyecto de github

```shell
sudo git clone https://github.com/lucas-saavedra/bicicletas-front.git
```
**Paso 3:**

Instalar composer

```shell
sudo apt install composer
```

**Paso 4:**

Instalar las extensiones de php necesarias (ext-dom y ext-curl)

  ```shell
sudo apt-get install php8.1-dom
sudo apt-get install php8.1-curl
sudo service apache2 restart
```
  
Ejecutar Composer install en la raíz del sistema api
**Paso 5:**

Copiar un virtualhost de sites-available y nombrarlo laravel.conf

Debe contener:

```html
<VirtualHost \*:80>
  ServerAdmin admin@hwdomain.io
  ServerName laravelapp.tramo4.ap
  DocumentRoot /var/www/bicicletas-api/public
 <Directory />
  Options FollowSymLinks
  AllowOverride None
 </Directory>
 
 <Directory /var/www/bicicletas-api/public>
  AllowOverride All
 </Directory>
  ErrorLog ${APACHE\_LOG\_DIR}/error.log
  CustomLog ${APACHE\_LOG\_DIR}/access.log combined
</VirtualHost>
```

**Paso 6 :**

Habilitar la extensión de postgresql en php.ini

```shell
sudo nano /etc/php/8.1/apache2/php.ini
```
  
**Paso 7:**

Cargar el nuevo modulo creado.

  ``` shell
sudo a2ensite laravel.conf
sudo a2enmod rewrite
sudo systemctl restart apache2
```

**Paso 8:**

Modificar el archivo hosts de Windows para poder acceder al sistema mediante la URL

En C:/windows/system32/drivers/etc/host

```shell
192.168.100.20 laravelapp.tramo4.ap
192.168.100.20 reactapp.tramo4.ar
```

**Paso 9:**
Buildear el proyecto de react

```node
npm install
npm run build
```

**Paso 10:**

Renombrar la carpeta build a bicicletas-front

Revisar que exista en la raíz el archivo .htaccess con el siguiente contenido:

```html
<IfModule mod\_rewrite.c>
 RewriteEngine On
 RewriteBase /
 RewriteRule ^index\.html$ - [L]
 RewriteCond %{REQUEST\_FILENAME} !-f
 RewriteCond %{REQUEST\_FILENAME} !-d
 RewriteCond %{REQUEST\_FILENAME} !-l
 RewriteRule . /index.html [L]
</IfModule>
```

Mover a la carpeta compartida y copiarlo en /var/www

```shell
sudo cp bicicletas-front /var/www
```

**Paso 11:**

Crear un host virtual para este sistema, copiar a partir de uno existente y nombrarlo react.conf

El contenido debe ser:

```html
<VirtualHost *:80>
    ServerAdmin admin@hwdomain.io
    ServerName reactapp.tramo4.ar
    DocumentRoot /var/www/bicicletas-front
    <Directory />
        Options FollowSymLinks
        AllowOverride None
    </Directory>
    <Directory /var/www/bicicletas-front>
        AllowOverride All
    </Directory>
    ErrorLog ${APACHE\_LOG\_DIR}/error.log
    CustomLog ${APACHE\_LOG\_DIR}/access.log combined
</VirtualHost>
```

**Paso 12:**
Activar el sitio y reiniciar apache:

```shell
sudo a2ensite react.conf
sudo systemctl restart apache2
```

**PASO 13:**
Ir a la raíz del proyecto laravel

```shell
  cd /var/www/bicicletas-api
```

Instalar extensión de pgsql con php:
  
```shell
sudo apt-get install php-pgsql
```

  o

```shell
sudo apt-get install php8.1-pgsql
sudo service apache2 restart
```
  
Dar permisos a la carpeta de logs en laravel:

```shell
sudo chmod -R 777 storage/logs
sudo chmod -R 777 storage/framework/cache
```

Ejecutar optimize, migraciones y seed

```php
php artisan optimize
php artisan migrate –seed
```
