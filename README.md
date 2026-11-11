# Luis Fader — bandas sonoras de sus novelas

Reproductor con la música de las novelas de Luis Fader. Todo se escucha acá: el sitio no tiene enlaces que lleven a otras páginas.

Arriba hay un dial: cada estación es una novela, y al sintonizarla la página toma la imagen y el color de ese mundo. Más abajo están todas las pistas, que se escuchan sin salir del portal,.

El sitio está en castellano, ruso, inglés e italiano. El idioma se elige arriba a la derecha y queda guardado; también se puede abrir directo con `?lang=es`, `?lang=ru`, `?lang=en` o `?lang=it`. Sin elección previa, toma el idioma del navegador.

Dirección: https://luisfader.github.io/luisfadermusica/ (se puede entrar directo a una novela con `#misterio`, `#corazonada`, `#horizonte`, `#volny`, `#predchuvstvie`, `#onde`, `#momento`, `#maschera`, `#future`, `#silenzio`, `#zvezdy` o `#severnaya`).

## De dónde sale la música

Cada pista se reproduce desde el sitio de su novela, aunque el visitante nunca sale del portal:

| Novela | Idioma | Sitio |
|---|---|---|
| El misterio de los Fader | castellano | [misteriofader](https://luisfader.github.io/misteriofader/) |
| La Corazonada (con Proyecto R y Antitango) | castellano | [corazonada](https://luisfader.github.io/corazonada/) |
| Сияющий горизонт | ruso | [horizonte](https://luisfader.github.io/horizonte/) |
| Волны любви. Крепость в полумраке | ruso | [volny](https://luisfader.github.io/volny/) |
| Волны любви. Город без улыбок | ruso | [litmir](https://luisfader.github.io/litmir/) (`novels/volny-lyubvi-gorod-bez-ulybok/music/`); «Город без улыбок» y «Русалка в обелиске» viven en este portal (`audio/volny-gorod-bez-ulybok/`) |
| Предчувствие (todas las temporadas) | ruso | [predchuvstvie](https://luisfader.github.io/predchuvstvie/); «Ты — моя крепость» vive en este portal (`audio/predchuvstvie/`) |
| Onde d'amore | italiano | [ondedamore](https://luisfader.github.io/ondedamore/) |
| Ondas de amor | castellano | en este mismo portal (`audio/ondasdeamor/`) |
| La città triste (Momento musicale) | italiano | [momentomusicale](https://luisfader.github.io/momentomusicale/) |
| Maschera di Venezia | italiano | [mascheradivenezia](https://luisfader.github.io/mascheradivenezia/) |
| A Man from the Future | inglés | en este mismo portal (`audio/amanfromthefuture/`) |
| Ti amo in silenzio | italiano | en este mismo portal (`audio/tiamoinsilenzio/`) |
| Северная любовь | ruso | [litmir](https://luisfader.github.io/litmir/) (`novels/severnaya-lyubov/music/`) |

## Cómo funciona

- Casi todas las pistas se reproducen desde el sitio de su novela. Las excepciones son *Ondas de amor*, *A Man from the Future* y *Ti amo in silenzio*, cuyas canciones viven acá, en `audio/ondasdeamor/`, `audio/amanfromthefuture/` y `audio/tiamoinsilenzio/`, «Ты — моя крепость» de *Предчувствие*, en `audio/predchuvstvie/`, y «Город без улыбок» y «Русалка в обелиске» de *Волны любви*, en `audio/volny-gorod-bez-ulybok/`. Si se agrega una canción a uno de esos sitios, hay que sumarla también en `data.js`.
- Mezclas por ánimo: cada pista tiene una letra en el campo `mood` de su disco (A amor, L lluvia y nostalgia, F lucha y adrenalina, M misterio y penumbra, E esperanza y amanecer). Las mezclas se arman solas a partir de eso y nunca ponen dos canciones seguidas de la misma novela. Para mover una canción de mezcla, cambiá su letra. «Todo al azar» mezcla las 160 de otra forma cada vez.
- Qué escuchar: «Todo», «Canciones» o «Instrumental». Cada pista lleva además una etiqueta visible, «Canción» (dorada, con micrófono) o «Instrumental» (azul, con nota). Cada disco tiene `voice` con una letra por pista (S con voz, i instrumental). El filtro vale para las mezclas, el azar y los discos, y queda guardado en el navegador.
- Letras: el botón «Letra» del reproductor abre un panel con la letra de lo que suena, que baja sola al ritmo de la canción. Las letras están en `letras/<novela>/<archivo>.txt` (mismo nombre que el MP3) y se cargan recién al abrirlas; si hay traducción, va como `<archivo>.ru.txt`, `<archivo>.en.txt` o `<archivo>.it.txt` y aparece cuando la página está en ese idioma. En `data.js`, `ly` marca que la pista tiene letra y `lyt` qué traducciones hay.
- `data.js` tiene los mundos, los discos con sus pistas. Los textos de cada mundo van en los cuatro idiomas (`es`, `ru`, `en`, `it`), y `novel.v` dice qué versión de la novela hay en Litmir para cada idioma.
- El reproductor muestra un espectro real (Web Audio), en el color de cada novela. Tocándolo cambia entre cuatro estilos (barras, ondas, osciloscopio y aurora), y el elegido queda guardado. Solo funciona porque el portal y las bandas sonoras están en el mismo dominio, luisfader.github.io; desde otro dominio se oculta solo y la música suena igual.
- `app.js` tiene los textos de la interfaz en los cuatro idiomas (objeto `S`).
- `img/mundos/` tiene las portadas y fondos de cada banda sonora.
- Para sumar una banda sonora nueva: agregá su entrada en `worlds` dentro de `data.js`, su portada `img/mundos/<repo>.jpg` y su fondo `img/mundos/<repo>-fondo.jpg`. Si querés que tenga estación propia en el dial, sumá un nombre corto en `SHORT` dentro de `app.js`.

Sitio estático para GitHub Pages: rama `main`, carpeta raíz.

## Lo más escuchado

La sección «Lo más escuchado ahora» muestra el top 10 de la semana y de siempre. Las escuchas se guardan en Supabase (gratis):

1. En el **SQL Editor** de Supabase, pegar y correr `supabase/ranking.sql`. Crea la tabla `escuchas`, cerrada, y dos funciones: `registrar_escucha` (suma una) y `mas_escuchadas` (devuelve el ranking).
2. En `app.js`, completar `RANKING` con la dirección del proyecto y la clave pública (*anon*): `const RANKING = { url: "https://….supabase.co", key: "…" };`.

Una escucha cuenta después de 30 segundos sonando (o la mitad, si la pista es más corta), y el mismo navegador no vuelve a sumar la misma pista hasta 20 minutos después. Solo se guarda qué pista sonó y cuándo. Con `RANKING` vacío, la sección no aparece y no se cuenta nada.
