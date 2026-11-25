# Luis Fader — bandas sonoras de sus novelas

Reproductor con la música de las novelas de Luis Fader. Todo se escucha acá: el sitio no tiene enlaces que lleven a otras páginas.

Arriba hay un dial: cada estación es una novela, y al sintonizarla la página toma la imagen y el color de ese mundo. Más abajo están todas las pistas, que se escuchan sin salir del portal,.

El sitio está en castellano, ruso, inglés e italiano. El idioma se elige arriba a la derecha y queda guardado; también se puede abrir directo con `?lang=es`, `?lang=ru`, `?lang=en` o `?lang=it`. Sin elección previa, toma el idioma del navegador.

Dirección: https://luisfader.github.io/luisfadermusica/ (se puede entrar directo a una novela con `#misterio`, `#corazonada`, `#horizonte`, `#volny`, `#predchuvstvie`, `#onde`, `#momento`, `#maschera`, `#future`, `#silenzio`, `#zvezdy`, `#severnaya`, `#rezonans`, `#retrato`, `#drakon`, `#maska`, `#golos` o `#piramidy`).

## De dónde sale la música

Cada pista se reproduce desde el sitio de su novela, aunque el visitante nunca sale del portal:

| Novela | Idioma | Sitio |
|---|---|---|
| El misterio de los Fader | castellano | [misteriofader](https://luisfader.github.io/misteriofader/) |
| La Corazonada (con Proyecto R y Antitango) | castellano | [corazonada](https://luisfader.github.io/corazonada/) |
| Сияющий горизонт | ruso | [horizonte](https://luisfader.github.io/horizonte/) |
| Волны любви (trilogía): 1. Волны любви | ruso | [volny](https://luisfader.github.io/volny/) («Глубина любви», «Дождь», «Волны любви», «Судьба»); «Misterio en tus lágrimas», «Noche profunda» y «Abrazos de cristal» viven en este portal (`audio/volny-lyubvi/`) |
| Волны любви: 2. Крепость в полумраке | ruso | [volny](https://luisfader.github.io/volny/) |
| Волны любви: 3. Город без улыбок | ruso | [litmir](https://luisfader.github.io/litmir/) (`novels/volny-lyubvi-gorod-bez-ulybok/music/`); «Город без улыбок», «Русалка в обелиске», «Доброе утро, Синея», «Улыбаюсь без страха», «Подарок», «Я твоя», «Однажды мы поедем к морю», «Звон без колоколов» y «Золотая нить» viven en este portal (`audio/volny-gorod-bez-ulybok/`) |
| Предчувствие (todas las temporadas) | ruso | [predchuvstvie](https://luisfader.github.io/predchuvstvie/); «Ты — моя крепость» y las dos versiones de «Страсти» viven en este portal (`audio/predchuvstvie/`) |
| Onde d'amore | italiano | [ondedamore](https://luisfader.github.io/ondedamore/) |
| Ondas de amor | castellano | en este mismo portal (`audio/ondasdeamor/`) |
| La città triste (Momento musicale) | italiano | [momentomusicale](https://luisfader.github.io/momentomusicale/) |
| Maschera di Venezia | italiano | [mascheradivenezia](https://luisfader.github.io/mascheradivenezia/) |
| A Man from the Future | inglés | en este mismo portal (`audio/amanfromthefuture/`) |
| Ti amo in silenzio | italiano | en este mismo portal (`audio/tiamoinsilenzio/`) |
| Северная любовь | ruso | [podcasts](https://luisfader.github.io/podcasts/) (`novels/severnaya-lyubov/music/`); «Уголок в твоём сердце» vive en este portal (`audio/severnaya-lyubov/`) |
| Северная любовь: Плач с севера | ruso | [litmir](https://luisfader.github.io/litmir/) (`novels/severnaya-lyubov-2/music/`) |
| Резонанс любви | ruso | en este mismo portal (`audio/rezonans/`) |
| La chica del retrato | castellano | [litmir](https://luisfader.github.io/litmir/) (`novels/la-chica-del-retrato/`) |
| Сердце дракона (álbum «Corazón de dragón») | ruso | [podcasts](https://luisfader.github.io/podcasts/) (`novels/serdce-drakona/music/`) |
| Венецианская маска (no confundir con *Maschera di Venezia*: son novelas distintas) | ruso | en este mismo portal (`audio/venecianskaya-maska/`) |
| Голос | ruso | [litmir](https://luisfader.github.io/litmir/) (`novels/golos/music/`) |
| Дикий час: Тайна пирамид | ruso | en este mismo portal (`audio/dikij-chas-tajna-piramid/`) |

## Donaciones

La única salida del portal es la de donaciones: «Donar» en el menú de arriba lleva a la sección `#donar`, al final de la página, con un botón a https://boosty.to/fader26/donate y el código QR (`img/app/donate-qr.png`). Los textos están en `app.js` (`navDonate`, `donateH`, `donateP`, `donateBtn`, `donateQr`) en los cuatro idiomas.

## Cómo funciona

- Las bandas sonoras se muestran como una cuadrícula de discos (un cuadrado por disco). Al tocar uno se abre su página, con la portada, la información de la novela, el botón «Escuchar», «Guardar disco» y todas las pistas; abajo aparecen los otros discos de la misma novela. Cada disco tiene su dirección (`#disco-<novela>-<n>`, por ejemplo `#disco-corazonada-2`), y se cierra con «Volver a los discos», con el botón atrás o con Escape. El botón de reproducción sobre cada cuadrado hace sonar el disco sin abrirlo.
- Casi todas las pistas se reproducen desde el sitio de su novela. Las excepciones son las publicaciones de «Música nueva» (`canal/audio/`), *Ondas de amor*, *A Man from the Future*, *Ti amo in silenzio*, *Резонанс любви*, *Венецианская маска* y *Дикий час: Тайна пирамид*, cuyas canciones viven acá, en `audio/ondasdeamor/`, `audio/amanfromthefuture/`, `audio/tiamoinsilenzio/`, `audio/rezonans/`, `audio/venecianskaya-maska/` y `audio/dikij-chas-tajna-piramid/`; «Ты — моя крепость» y «Страсти» de *Предчувствие*, en `audio/predchuvstvie/`, tres pistas del disco *Волны любви*, en `audio/volny-lyubvi/`, nueve pistas de *Волны любви. Город без улыбок*, en `audio/volny-gorod-bez-ulybok/`, y «Уголок в твоём сердце» de *Северная любовь*, en `audio/severnaya-lyubov/`. Si se agrega una canción a uno de esos sitios, hay que sumarla también en `data.js`.
- Canciones guardadas: cada disco tiene el botón «Guardar disco», que lo baja entero al dispositivo para escucharlo sin internet (se quita con «Quitar»). Además, mientras suena una canción se baja sola la siguiente de la lista, así no se traba al cambiar; de esas se guardan como mucho 40 y se borran las más viejas. Todo va en la caché `fader-audio`, y `sw.js` sirve desde ahí las canciones guardadas (la página las pide con `?fc=1`). Si una canción queda colgada más de 10 s, el reproductor se reconecta solo desde el mismo segundo.
- Mezclas por ánimo: cada pista tiene una letra en el campo `mood` de su disco (A amor, L lluvia y nostalgia, F lucha y adrenalina, M misterio y penumbra, E esperanza y amanecer). Las mezclas se arman solas a partir de eso y nunca ponen dos canciones seguidas de la misma novela. Para mover una canción de mezcla, cambiá su letra. «Todo al azar» mezcla las 200 de otra forma cada vez.
- Cada disco muestra y hace sonar todo lo que tiene, canciones e instrumentales juntos (no hay filtro: confundía y parecía que faltaba música). Cada pista lleva una etiqueta visible, «Canción» (dorada, con micrófono) o «Instrumental» (azul, con nota), según `voice`, con una letra por pista (S con voz, i instrumental).
- Letras: el botón «Letra» del reproductor abre un panel con la letra de lo que suena, que baja sola al ritmo de la canción. Las letras están en `letras/<novela>/<archivo>.txt` (mismo nombre que el MP3) y se cargan recién al abrirlas; si hay traducción, va como `<archivo>.ru.txt`, `<archivo>.en.txt` o `<archivo>.it.txt` y aparece cuando la página está en ese idioma. En `data.js`, `ly` marca que la pista tiene letra y `lyt` qué traducciones hay.
- `data.js` tiene los mundos, los discos con sus pistas. Los textos de cada mundo van en los cuatro idiomas (`es`, `ru`, `en`, `it`), y `novel.v` dice qué versión de la novela hay en Litmir para cada idioma.
- El reproductor muestra un espectro real (Web Audio), en el color de cada novela. Tocándolo cambia entre cuatro estilos (barras, ondas, osciloscopio y aurora), y el elegido queda guardado. Solo funciona porque el portal y las bandas sonoras están en el mismo dominio, luisfader.github.io; desde otro dominio se oculta solo y la música suena igual.
- `app.js` tiene los textos de la interfaz en los cuatro idiomas (objeto `S`).
- `img/mundos/` tiene las portadas y fondos de cada banda sonora.
- Para sumar una banda sonora nueva: agregá su entrada en `worlds` dentro de `data.js`, su portada `img/mundos/<repo>.jpg` y su fondo `img/mundos/<repo>-fondo.jpg`. Si querés que tenga estación propia en el dial, sumá un nombre corto en `SHORT` dentro de `app.js`.

Sitio estático para GitHub Pages: rama `main`, carpeta raíz.

## Música nueva (el canal)

Arriba de todo está «Música nueva»: un feed como el de un canal de Telegram, con publicaciones sueltas (una imagen, un texto y una canción o un instrumental), sean o no de una novela. La más nueva va primero; se ven cinco y el resto con «Ver publicaciones anteriores». Cada una tiene su dirección (`#post-<id>`) y un botón «Compartir». Las canciones suenan en el mismo reproductor, con su imagen como portada, y entran en «Todo al azar», en el ranking y, si se les elige un ánimo, en esa mezcla. Mientras no haya ninguna publicación, la sección y su enlace («Canal») no aparecen.

**Para publicar:** abrir `https://luisfader.github.io/luisfadermusica/publicar.html` (no está enlazada desde el portal). La primera vez en cada dispositivo pide una clave de GitHub (*fine-grained token* con acceso solo a `luisfadermusica` y permiso **Contents: Read and write**); queda guardada en ese navegador. Después: imagen, MP3, título, texto, si es canción o instrumental, la letra si tiene, y «Publicar». Cada publicación es un solo commit. En uno o dos minutos aparece en el portal.

- **Programar:** con «Programar» se elige día y hora; «Próximo día libre» pone el día siguiente a la última programada. La publicación queda en el repositorio pero el portal no la muestra hasta ese momento, así que se pueden dejar cargadas muchas de una vez para que salga una por día.
- **Editar y borrar:** desde la lista «Tus publicaciones», en la misma página.
- **Archivos:** las publicaciones están en `canal/posts.js`; las imágenes (achicadas a 1400 px, en JPG) en `canal/img/`, los MP3 en `canal/audio/` y las letras en `letras/canal/<mismo nombre que el MP3>.txt`. GitHub no acepta archivos de más de 100 MB: un MP3 a 192–320 kbps entra sin problema.

## Lo más escuchado

La sección «Lo más escuchado ahora» muestra el top 10 de la semana y de siempre. Las escuchas se guardan en Supabase (gratis):

1. En el **SQL Editor** de Supabase, pegar y correr `supabase/ranking.sql`. Crea la tabla `escuchas`, cerrada, y dos funciones: `registrar_escucha` (suma una) y `mas_escuchadas` (devuelve el ranking).
2. En `app.js`, completar `RANKING` con la dirección del proyecto y la clave pública (*anon*): `const RANKING = { url: "https://….supabase.co", key: "…" };`.

Una escucha cuenta después de 30 segundos sonando (o la mitad, si la pista es más corta), y el mismo navegador no vuelve a sumar la misma pista hasta 20 minutos después. Solo se guarda qué pista sonó y cuándo. Con `RANKING` vacío, la sección no aparece y no se cuenta nada.

## Aplicación

El portal se puede instalar en el teléfono como aplicación (PWA), sin tiendas:

- **Android (Chrome):** botón «Instalar la app» arriba, o menú ⋮ → «Instalar aplicación».
- **iPhone (Safari):** botón «Compartir» → «Agregar a inicio». El botón «Instalar la app» del portal muestra estas instrucciones.

Archivos: `manifest.webmanifest` (nombre, colores e íconos en `img/app/`) y `sw.js` (service worker). El service worker guarda en el teléfono la página, los estilos, el código, `data.js`, portadas y letras, para que la app abra rápido y aunque falle la red; los **mp3 no pasan por él** (los pide el navegador directo, con pedidos por partes), para que la música se pueda adelantar y siga sonando en segundo plano. Al cambiar algo importante de la app conviene subir `VERSION` en `sw.js`.
