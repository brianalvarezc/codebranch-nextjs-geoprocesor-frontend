/public                # Archivos estáticos (imágenes, favicon, etc.)
/src
  /app                 # Rutas y páginas (Next.js App Router)
    /api               # Endpoints API (si usas API routes)
    /[route]           # Carpeta por cada ruta/página
      page.tsx         # Componente de página
      layout.tsx       # Layout específico (opcional)
      loading.tsx      # Estado de carga (opcional)
      error.tsx        # Manejo de errores (opcional)
  /components          # Componentes reutilizables
  /features            # Módulos o dominios (ej: mapas, usuarios, auth)
    /[feature]         # Carpeta por feature
      components/      # Componentes específicos del feature
      hooks/           # Custom hooks del feature
      services/        # Lógica de negocio, llamadas a APIs
      types.ts         # Tipos y modelos del feature
  /hooks               # Custom hooks globales
  /lib                 # Utilidades, helpers, funciones compartidas
  /styles              # Archivos CSS/SCSS globales y por módulo
  /types               # Tipos globales (interfaces, enums)
  /constants           # Constantes globales
  /config              # Configuración global (ej: endpoints, env)
  /context             # React Contexts globales
  /store               # Estado global (ej: Redux, Zustand)
  /middleware          # Middlewares Next.js (autenticación, etc.)
  /assets              # Imágenes, SVGs, fuentes
/tests                 # Pruebas unitarias y de integración
.env.local             # Variables de entorno locales
next.config.js         # Configuración Next.js
package.json
README.md

con base en esa estructura, vamos a generar una estructura de aplicación next que haga lo siguiente:
- Mostrar en una ruta /geo-procesor un mapa con leaflet o cualquier otro servicio de mapas y a su izquierda un input repetible que tenga dos campos, uno para latitutude y otro para longitude.
- El componente de inputs siempre muestra mínimo dos inputs uno para latitutude y otro para longitude y tiene un componente botón de agregar (puede ser un icono +) para agregar otros dos input uno para latitutude y otro para longitude. También tiene la posibilidad de eliminar los input agregados, tengan o no tengan información.
- Los input son componentes qque solo reciben valores numéricos
- Cuando se tienen llenos los input parejas de latitude y longitude, se habilita un botón que diga Process para que se llame a un endpoint con POST y un body con la siguiente estructura:
    {
        "points": [
            { "lat": -33.868820, "lng": 151.209325 },
            { "lat": 35.689487, "lng": 139.691711 },
            { "lat": 40.712776, "lng": -74.106984 },
            { "lat": 55.755825, "lng": 37.6142958 },
            { "lat": -23.550520, "lng": -46.633308 }
        ]
    }
- Cuando se llama al endpoint, se muestra un component de loading hasta que el enpoint entrega la respuesta
- Cuando la respuesta se recibe, lo que se recibe es un objeto con la siguiente estructura:
    {
        "centroid": {
            "lat": 14.9477496,
            "lng": 41.5758046
        },
        "bounds": {
            "north": 55.755825,
            "south": -33.86882,
            "east": 151.209296,
            "west": -74.005974
        }
    }
    Y lo que se hace con ese response es then visualizing the computed bounding box and centroid on a simple map