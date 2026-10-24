# Luis Fader — sitio musical

Primera edición del sitio musical de **Luis Fader**, adaptable a móviles y preparada para incorporar audio y videoclips sin frameworks ni servidores.

## Contenido

- Portada y álbum destacado: *Onde d'amore* (2026).
- Discografía desde *Горизонт* (2003), con búsqueda, filtros y orden cronológico.
- Listas de canciones verificadas: *Onde d'amore*, *Electrotango* y *Музыкальная биография*.
- Reproductor HTML5 preparado para MP3 locales; pausa, anterior, siguiente y progreso.
- Espacio para videoclips con futuro soporte para YouTube.
- Historia musical basada en «Mi música y yo», enlaces a Apple Music y Spotify y archivo.

**Importante:** esta primera entrega no tiene archivos MP3 ni videoclips. Las canciones pendientes se indican con claridad. La entrevista a Radio Nacional se presenta como perfil personal, no como entrevista musical.

## Publicación con GitHub Pages

1. Abrí [Settings → Pages](https://github.com/luisfader/luisfadermusica/settings/pages).
2. En Build and deployment → Source, elegí **Deploy from a branch**.
3. Elegí rama **main** y carpeta **/(root)**. Guardá.
4. Una vez que GitHub confirme el despliegue, la URL habitual será https://luisfader.github.io/luisfadermusica/.

El proyecto tiene enlaces relativos y debería funcionar en esa ruta. No hay confirmación de sitio público en línea hasta que se active Pages.

## Cómo cargar MP3

1. Subí archivos a una carpeta como media/onde/; por ejemplo: media/onde/01-balla-con-me.mp3.
2. Abrí catalog.js y agregá la ruta a audioSources usando el identificador de playlist, seguido del índice de pista empezando en cero.
3. Ejemplo: audioSources: {"onde:0":"media/onde/01-balla-con-me.mp3"}
4. Guardá. La canción pasa a figurar como disponible y podrá reproducirse.

La pista se selecciona desde la lista. Si todavía no existe el archivo, no se finge una reproducción. Para álbumes nuevos, agregá el lanzamiento a albums y, si querés una nueva lista, agregá la entrada en playlists y la opción de selección correspondiente en index.html.

## Cómo cargar videoclips

Editá videos dentro de catalog.js e incorporá objetos con title y youtubeId. El ID tiene 11 caracteres y debe corresponder al videoclip oficial. Ejemplo de estructura: videos: [{title:"Título del videoclip",youtubeId:"ID_OFICIAL"}]. Cuando haya videos válidos, el sitio mostrará sus reproductores integrados de YouTube.

## Archivos

- **index.html**: página, textos y navegación.
- **styles.css**: diseño, colores y estilos responsive.
- **catalog.js**: discos, pistas, fuentes de audio y videos.
- **app.js**: filtros, búsqueda, reproductor y carga opcional de portadas desde la API pública de Apple Music.

Las portadas tienen un diseño visual de reserva. Si el servicio de Apple devuelve la portada real de un disco, se puede mostrar sin que falle el diseño cuando no haya conexión.

## Fuentes consultadas en octubre de 2026

- [Apple Music — Luis Fader](https://music.apple.com/us/artist/luis-fader/1378975839)
- [Spotify — Luis Fader](https://open.spotify.com/artist/20tM2n6v08JoTN4JPbWBYh)
- [Shazam — Luis Fader](https://www.shazam.com/artist/luis-fader/1685456156)
- [Amazon — Onde d'amore](https://music.amazon.es/albums/B0GYT9DNQN)
- [Amazon — Electrotango](https://music.amazon.in/albums/B0DDCTLKYG)
- [Amazon — Музыкальная биография](https://music.amazon.com/albums/B0FJL2B4HN)
- [«Mi música y yo» — La TeLaRaÑA](https://luisfader.wordpress.com/2019/07/16/mi-musica-y-yo/)
- [Radio Nacional — entrevista general](https://cdn.radionacional.com.ar/fader-es-imposible-vivir-en-rusia-ser-argentino-y-no-tener-anecdotas/)

Algunos servicios clasifican álbumes, singles o EP de manera diferente. Esta es una selección curada y ampliable, no una garantía de discografía exhaustiva.
