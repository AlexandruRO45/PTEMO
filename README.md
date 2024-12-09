# Port Traffic Emissions Management and Optimization (PTEMO)  
## Digital Twin Visualization and Logistics for the Port of Dover Using Bentley iTwin Platform  

### Purpose  
The purpose of this project is to demonstrate the following:  
- Using Bentley iTwin for scalable digital twin creation.  
- Simulating traffic flow and emissions hotspots in constrained port environments.  
- Developing an interactive user interface (UI) for scenario-based operational analysis.  

---

### Key Features  

#### Dashboards for Traffic Monitoring and Emissions Analytics  
- **Emissions Dashboard**: Real-time emissions insights with cumulative area charts and time-based filters.  
- **Data Analytics**: Comprehensive metrics on idle times, vehicle density, and zone-specific emissions.  

#### Interactive Tools for Real-Time Operations  
- **InteractiveMap**: Visualizes the Port of Dover's road network with zooming, filtering, and simulation toggling.  
- **VehicleTrackingPanel**: Tracks vehicle status, emissions, and exportable operational data.  
- **SimulationControlPanel**: Scenario-based controls for simulations with dynamic playback options.  

---

### Tools and Frameworks  

#### Software Tools:  
- **React.js & TypeScript**: Interactive UI development.  
- **Tailwind CSS**: Rapid, customizable styling for UI components.  
- **Recharts**: Dynamic, responsive data visualizations.  
- **Bentley iTwin Platform**: Cloud-based 3D/4D modeling for traffic flow simulation and emissions tracking.  

#### Data Sources:  
- Mock datasets for vehicle counts, emissions, and traffic patterns derived from OpenStreetMap (OSM) APIs.  
- JSON/CSV formats with Bentley's default global coordinate system for accurate geospatial alignment.  

---

### Installation  

#### Prerequisites  
- **Node.js**: Install Node.js on your local system by following the instructions for your OS:  
  [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)  

#### Clone the Repository  
```bash
git clone <repository-url>
cd <repository-directory>
npm install
```  

#### Set Up Environment Variables  
1. Create a `.env` file in the root directory.  
2. Add the following environment variables to the `.env` file:  

```dotenv
# ---- Authorization Client Settings ----
# Follow this tutorial on web service deployment available on Bentley iTwin platform: https://developer.bentley.com/tutorials/web-application-quick-start/
# The IMJS_AUTH_AUTHORITY always stays the same
IMJS_AUTH_CLIENT_CLIENT_ID=
IMJS_AUTH_CLIENT_REDIRECT_URI=
IMJS_AUTH_CLIENT_LOGOUT_URI=
IMJS_AUTH_CLIENT_SCOPES=
IMJS_AUTH_AUTHORITY="https://ims.bentley.com"

# ---- Test IDs ----
# Taken directly from 'My iTwins tab'. For this project, select the template iModel called Stadium for full support.
IMJS_ITWIN_ID=
IMJS_IMODEL_ID=

# ---- Map Settings ----
# API key for Azure service: https://learn.microsoft.com/en-us/azure/azure-maps/quick-demo-map-app
IMJS_AZURE_MAPS_KEY=

# Access token for Map Box service: https://docs.mapbox.com/help/getting-started/access-tokens
IMJS_MAP_BOX_KEY=

# Access token for Cesium service: https://cesium.com/learn/ion/cesium-ion-access-tokens
IMJS_CESIUM_ION_KEY=

# Advanced CRA Config: https://create-react-app.dev/docs/advanced-configuration/
SKIP_PREFLIGHT_CHECK=true

# Advanced iTwin.js CRA Config: https://github.com/imodeljs/create-react-app/blob/imodeljs/packages/react-scripts/README-imodeljs.md
USE_FAST_SASS=true
USE_FULL_SOURCEMAP=true
TRANSPILE_DEPS=false

# Remove the following env var if using a different package manager
USING_NPM=true
```  

#### Build the Project  
Run the following command to build the application:  
```bash
npm run build
```  
If successful, the output will include a summary like:  
```plaintext
Compiled successfully.
File sizes after gzip:
1.8 MB     build/static/js/main.c0aa29c6.js
...
The build folder is ready to be deployed.
```

#### Serve the Application Locally  
1. If prompted to install `serve`, run this command (one-time setup):  
   ```bash
   npm install -g serve
   ```  
2. To start the server, run:  
   ```bash
   serve -s build
   ```  
3. Access the application via:  
   - **Local**: `http://localhost:3000`  
   - **Network**: Based on your network configuration (e.g., `http://<network-ip>:3000`).  

---

#### Example Output on Successful Local Deployment  
```plaintext
┌────────────────────────────────────────────┐
│                                            │
│   Serving!                                 │
│                                            │
│   - Local:    http://localhost:3000        │
│   - Network:  http://172.29.204.167:3000   │
│                                            │
│   Copied local address to clipboard!       │
│                                            │
└────────────────────────────────────────────┘
```  

Now you're all set to explore the Port Traffic Emissions Management and Optimization (PTEMO) application!


---

### Notes  
1. Mock data was used; future iterations aim for real-time data integration.  
2. Current limitations include non-functional traffic collisions and maximum particle counts (9,000 vehicles).  
3. Simulation fidelity constrained by OSM data and initial MVP focus on UI development.

---

### Acknowledgments  
This project contributes to the TransiT initiative for decarbonizing UK transport networks, using cutting-edge digital twin technologies to improve sustainability and operational efficiency.

---

### License  
This project is licensed under the Apache License 2.0. See the LICENSE file for more details.  

---

### Copyright Disclaimer  
- **Copyright © Bentley Systems, Incorporated**  
- **© OpenStreetMap contributors**  

This project uses OpenStreetMaps and the Overpass API under the Open Database License.  

**More information:**  
- [OSM Licensing](https://www.openstreetmap.org/copyright)  
- [OSM Map Tiles](https://wiki.openstreetmap.org/wiki/Tile_usage_policy)  
  
