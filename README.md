# Luis Fader — bandas sonoras de sus novelas

Portal a todos los sitios con la música de las novelas de Luis Fader.

Arriba hay un dial: cada estación es una novela, y al sintonizarla la página toma la imagen y el color de ese mundo. Más abajo están todas las pistas, que se escuchan sin salir del portal, las primeras grabaciones y la pared con todas las novelas publicadas en Litmir.

Dirección: https://luisfader.github.io/luisfadermusica/ (se puede entrar directo a una novela con `#misterio`, `#corazonada`, `#horizonte`, `#volny`, `#onde` o `#momento`).

## Qué sitios reúne

| Novela | Idioma | Sitio |
|---|---|---|
| El misterio de los Fader | castellano | [misteriofader](https://luisfader.github.io/misteriofader/) |
| La Corazonada (con Proyecto R y Antitango) | castellano | [corazonada](https://luisfader.github.io/corazonada/) |
| Сияющий горизонт | ruso | [horizonte](https://luisfader.github.io/horizonte/) |
| Волны любви. Крепость в полумраке | ruso | [volny](https://luisfader.github.io/volny/) |
| Onde d'amore | italiano | [ondedamore](https://luisfader.github.io/ondedamore/) |
| La città triste (Momento musicale) | italiano | [momentomusicale](https://luisfader.github.io/momentomusicale/) |

Primeras grabaciones: [animaitaliana](https://luisfader.github.io/animaitaliana/), [violoncello](https://luisfader.github.io/violoncello/) y [musica](https://luisfader.github.io/musica/) (Тайна пирамид).

## Cómo funciona

- Acá no hay MP3: el reproductor toma cada pista del sitio de su novela. Si se agrega una canción a uno de esos sitios, hay que sumarla también en `data.js`.
- `data.js` tiene los mundos, los discos con sus pistas y la lista de novelas de Litmir para la pared.
- `img/mundos/` tiene las portadas y fondos de cada banda sonora; `img/universo/` las portadas de las novelas, copiadas de Litmir en tamaño chico.
- Para sumar una banda sonora nueva: agregá su entrada en `worlds` dentro de `data.js`, su portada `img/mundos/<repo>.jpg` y su fondo `img/mundos/<repo>-fondo.jpg`. Si querés que tenga estación propia en el dial, sumá un nombre corto en `SHORT` dentro de `app.js`.

Sitio estático para GitHub Pages: rama `main`, carpeta raíz.
