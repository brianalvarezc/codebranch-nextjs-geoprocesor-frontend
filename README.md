
# Project: codebranch-nextjs-geoprocesor-frontend

Frontend in **Next.js** for processing and visualizing geographic coordinates, integrating an external microservice for geospatial calculations (centroid and bounding box).

## 📌 Features
- Modular and scalable architecture (App Router, features, components, services)
- Interactive visualization of points, centroid, and bounding box on a map (Leaflet)
- Dynamic form to enter coordinate pairs (lat/lng)
- Validation logic and repeatable inputs
- Decoupled HTTP calls via services
- Integration with external microservice via Next.js API
- Loading and visual feedback during processing
- Modern and minimalist design with Tailwind CSS

## 📂 Project Structure
```
.
├── app/
│   ├── geo-procesor/           # Main page with map and form
│   │   └── page.tsx
│   └── api/
│       └── geo-process/
│           └── route.ts        # API endpoint proxy to microservice
├── public/                     # Static files (Leaflet icons, images)
├── src/
│   ├── features/
│   │   └── geoProcesor/
│   │       ├── components/     # Feature-specific components (Map, CoordinateList, etc.)
│   │       ├── services/       # Business and API services
│   │       └── types/          # Types and models
│   ├── components/             # Global reusable components
│   ├── lib/                    # Utility services (httpService)
│   ├── styles/                 # Global styles
│   └── ...
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration
├── package.json                # Dependencies and scripts
├── README.md                   # Documentation
└── ...
```

## 🚀 Installation and Usage

1. Clone the repository:
	```sh
	git clone <REPOSITORY_URL>
	cd codebranch-nextjs-geoprocesor-frontend
	```

2. Install dependencies:
	```sh
	pnpm install
	# or npm install
	```

3. Configure environment variables:
	- Create a `.env.local` file in the root to customize the port and service URLs.
	- You can use the `env.example` file as a template:
	  ```env
	  PORT=4000
	  GEO_PROCESOR_API_URL=http://127.0.0.1:3000
	  GEO_PROCESOR_API_PATH=api/v1/interceptor
	  ```
	- The frontend and internal endpoint use these variables to connect to the external microservice.
	- **Note:** Environment variables that do not start with `NEXT_PUBLIC_` are only available on the backend (API routes, server components).

4. Start the application:
	```sh
	pnpm dev --port 4000
	# or npm run dev -- --port 4000
	```

5. Access the app at [http://localhost:4000/geo-procesor](http://localhost:4000/geo-procesor)

## 🗺️ Main Functionality

- Enter coordinate pairs (latitude/longitude) in the left panel
- Dynamically add/remove pairs
- Process the points by calling the external microservice
- Visualize the points, centroid, and bounding box on the map
- The map centers and zooms automatically to show the bounding box


## 🧩 Microservice Integration & API Usage

The frontend communicates with the geoprocessor microservice via an internal API route `/api/geo-process`, which acts as a proxy and handles validation and error management.

### API Endpoint
- **Endpoint:** `POST /api/geo-process`
- **Description:** Receives a list of points and returns the centroid and geographic bounds by proxying the request to the external microservice.
- **Request Body:**
		```json
		{
			"points": [
				{ "lat": 40.712776, "lng": -74.005974 },
				{ "lat": -33.868820, "lng": 151.209296 },
				{ "lat": 35.689487, "lng": 139.691711 },
				{ "lat": 55.755825, "lng": 37.617298 },
				{ "lat": -23.550520, "lng": -46.633308 }
			]
		}
		```
- **Response:**
		```json
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
		```

- **Common Errors:**
	- `400 Bad Request`: Invalid body or malformed points.
	- `401 Unauthorized`: Missing or invalid token (if authentication is enabled).

#### Notes
- Leaflet icons must be in the `public/` folder to avoid 404 errors.
- The API endpoint must be at `app/api/geo-process/route.ts` to work with the App Router.
- The frontend is decoupled from business logic and the external API.
- The design uses Tailwind CSS classes for a modern and responsive experience.
- Environment variables are automatically loaded from `.env.local` and can be validated with Joi in `src/config/envs.config.ts`.
- If you need to expose a variable to the client, it must start with `NEXT_PUBLIC_`.

## � Usage with Docker or Podman

1. Build the image (you can specify the default port with ARG):
	```sh
	docker build -t codebranch-nextjs-geoprocesor-frontend:latest --build-arg PORT=4000 .
	podman build -t codebranch-nextjs-geoprocesor-frontend:latest --build-arg PORT=4000 .
	```
	> If `--build-arg PORT=xxxx` is not specified, the default value defined in the Dockerfile (`ARG PORT=4000`) will be used.

2. Run the container (you can change the port with the environment variable):
	```sh
	docker run --rm -p 4000:4000 -e PORT=4000 codebranch-nextjs-geoprocesor-frontend:latest
	podman run --rm -p 4000:4000 -e PORT=4000 codebranch-nextjs-geoprocesor-frontend:latest
	```
	> If `-e PORT=xxxx` is not specified, the default value defined in the Dockerfile or the `.env.local` inside the image will be used.
	> The default exposed port is 4000, but you can map any external port with `-p` and change the internal one with `-e PORT=xxxx`.


## 📋 License
This project is licensed under **LICENSE**.
