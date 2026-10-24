/* Catálogo editorial de Luis Fader.
   Fuentes consultadas en octubre de 2026: Apple Music, Shazam, Amazon Music, Spotify.
   No atribuir el audio a ningún enlace hasta subir el MP3 correspondiente.
   Para activar canciones: añadir un archivo dentro de media/ y declarar su ruta
   en audioSources. Ejemplo: "onde:0": "media/onde/01-balla-con-me.mp3".
   Para videoclips: añadir {title, youtubeId} a videos. */
window.FADER_DATA = {
  artist: {
    apple: "https://music.apple.com/us/artist/luis-fader/1378975839",
    spotify: "https://open.spotify.com/artist/20tM2n6v08JoTN4JPbWBYh"
  },
  albums: [
    {title:"Горизонт",year:2003,kind:"album",desc:"El comienzo de la discografía.",colors:["#4e5f65","#b9a28e"]},
    {title:"Надежда и разочарование",year:2004,kind:"album",desc:"Primeras exploraciones sonoras.",colors:["#647077","#b39d9a"]},
    {title:"Тревожный город",year:2005,kind:"album",desc:"Una ciudad como paisaje musical.",colors:["#38474c","#a76f65"]},
    {title:"Слияние с реальностью",year:2006,kind:"album",desc:"Una etapa de descubrimiento.",colors:["#4a5b5a","#bcb09a"]},
    {title:"Поиск души",year:2007,kind:"single",desc:"Single.",colors:["#6e656b","#b1a09a"]},
    {title:"Земные мечты",year:2008,kind:"single",desc:"EP.",colors:["#53756d","#baa085"]},
    {title:"Сотворение нового мира",year:2009,kind:"album",desc:"Álbum.",colors:["#4e6467","#c9b397"]},
    {title:"Фантазия",year:2012,kind:"album",desc:"Siete composiciones.",colors:["#796778","#d1b0a1"]},
    {title:"Profundidad",year:2013,kind:"single",desc:"Single.",colors:["#435a71","#83b1bc"]},
    {title:"Новые мечты",year:2018,kind:"album",desc:"Álbum.",colors:["#686e7b","#c4aaad"]},
    {title:"Junio de 2019",year:2019,kind:"album",desc:"Una etapa de emociones y cambios.",colors:["#a57d73","#dcc0ac"]},
    {title:"Предчувствие",year:2023,kind:"album",desc:"Álbum.",colors:["#3a5357","#b2a39a"]},
    {title:"Зимняя музыка",year:2023,kind:"album",desc:"Álbum de invierno.",colors:["#697f87","#d7d4bf"]},
    {title:"Воздушные замки",year:2024,kind:"album",desc:"Álbum.",colors:["#6d7374","#d7b3a1"]},
    {title:"Предчувствие II",year:2024,kind:"album",desc:"Continuación de Предчувствие.",colors:["#445b65","#b29d92"]},
    {title:"Любовь в космосе",year:2024,kind:"album",desc:"Álbum.",colors:["#2c4357","#a07c8b"]},
    {title:"Electrotango",year:2024,kind:"album",desc:"Ocho canciones; cruce de electrónica y tango.",colors:["#6d393e","#d9aa83"],url:"https://music.amazon.in/albums/B0DDCTLKYG"},
    {title:"Резонанс любви II",year:2024,kind:"album",desc:"Trece composiciones.",colors:["#614d69","#bba29b"],url:"https://www.qobuz.com/ca-en/album/-ii-luis-fader/w2mua0htx7iwa"},
    {title:"Осенний оптимизм",year:2024,kind:"album",desc:"Álbum.",colors:["#9e6954","#dfb88a"]},
    {title:"Осенние мелодии",year:2024,kind:"album",desc:"Álbum.",colors:["#94644b","#cba780"]},
    {title:"Цени момент",year:2024,kind:"single",desc:"Single.",colors:["#6c8477","#cabb9d"]},
    {title:"Новые чувства",year:2024,kind:"single",desc:"Single.",colors:["#876f74","#c3a3a9"]},
    {title:"Мой путь",year:2024,kind:"single",desc:"Single.",colors:["#4d686b","#bcb3a3"]},
    {title:"Каждый из нас-это свет и душа",year:2024,kind:"single",desc:"Single.",colors:["#b39a66","#c7bfb0"]},
    {title:"Нежные чувства",year:2025,kind:"album",desc:"Álbum.",colors:["#b27e85","#e1b9b1"]},
    {title:"Зимняя музыка 2025",year:2025,kind:"album",desc:"Una nueva edición invernal.",colors:["#5e7980","#b1c0ba"]},
    {title:"Влюблённые лебеди",year:2025,kind:"single",desc:"Single.",colors:["#87928d","#d7c8b7"]},
    {title:"Земляника",year:2025,kind:"single",desc:"Single.",colors:["#8e4e53","#c0a097"]},
    {title:"Музыкальная биография",year:2025,kind:"single",desc:"EP con Алексей Стародубцев.",colors:["#6b6061","#cba58f"],url:"https://music.amazon.com/albums/B0FJL2B4HN"},
    {title:"Король моря",year:2025,kind:"single",desc:"Colaboración con Оксиния.",colors:["#2d6974","#93b9b3"]},
    {title:"Amore lunare",year:2026,kind:"album",desc:"Álbum.",colors:["#635c74","#d0b0b3"],url:"https://music.apple.com/us/album/amore-lunare/1880793560"},
    {title:"Духи гор",year:2026,kind:"album",desc:"Álbum.",colors:["#455e50","#b7a181"],url:"https://music.apple.com/us/album/%D0%B4%D1%83%D1%85%D0%B8-%D0%B3%D0%BE%D1%80/1885071666"},
    {title:"Onde d'amore",year:2026,kind:"album",desc:"14 canciones en italiano y ruso; 46 minutos.",colors:["#344e4b","#c18c78"],url:"https://music.apple.com/us/album/onde-damore/1895754149"},
    {title:"Intimidad lunar",year:2026,kind:"single",desc:"Single.",colors:["#736873","#c1ad9b"]}
  ],
  playlists: {
    onde: {
      title:"Onde d'amore",year:2026,
      link:"https://music.apple.com/us/album/onde-damore/1895754149",
      tracks:[
        ["Balla con me sotto la Luna","3:31"],
        ["Arraffami se puoi","3:12"],
        ["Addio con le lacrime negli occhi","3:30"],
        ["Controcorrente","2:48"],
        ["Il volo dell angelo","4:01"],
        ["Lentamente","4:52"],
        ["Il destino","3:17"],
        ["Immagina","3:52"],
        ["La vita è bella con te","3:53"],
        ["Onde d'amore","3:08"],
        ["Pioggia segreta","2:32"],
        ["Волны любви","2:34"],
        ["Dare passione","3:12"],
        ["Due parole potenti","2:31"]
      ]
    },
    electrotango:{
      title:"Electrotango",year:2024,
      link:"https://music.amazon.in/albums/B0DDCTLKYG",
      tracks:[
        ["Controlador de sentimientos","4:59"],
        ["Me gusta el tango","2:41"],
        ["Inevitable destino","3:34"],
        ["Bailamos en la niebla","2:54"],
        ["Южный маяк","2:53"],
        ["Adiós, mamá","4:48"],
        ["Noches de dolor","3:35"],
        ["Танец в тумане","3:16"]
      ]
    },
    biografia:{
      title:"Музыкальная биография",year:2025,
      link:"https://music.amazon.com/albums/B0FJL2B4HN",
      tracks:[
        ["Горизонт","3:54"],
        ["Плач с севера","6:29"],
        ["Страсти","3:05"]
      ]
    }
  },
  /* MP3 locales: dejar vacío hasta incorporar los archivos.
     Clave = nombre de playlist + ":" + índice de pista empezando desde cero.
     Ejemplo: "onde:0": "media/onde/01-balla-con-me-sotto-la-luna.mp3" */
  audioSources:{},
  /* Videoclips reales: [{title:"...",youtubeId:"ID_OFICIAL_DE_YOUTUBE"}] */
  videos:[]
};