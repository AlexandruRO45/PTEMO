<div align="center">
    <img src="https://github.com/AlexandruRO45/PTEMO/blob/main/public/logo.svg" alt="PTEMO Logo" width="200"/>
    <p>
        <i>Transforming Port Logistics Through Digital Twin Innovation 🚢</i>
    </p>
    <div id="badges">
        <!-- GitHub Badges -->
        <a href="https://github.com/AlexandruRO45/PTEMO/releases">
            <img src="https://img.shields.io/github/v/release/AlexandruRO45/PTEMO?color=blue&label=Latest%20Release" alt="Latest Release Badge"/>
        </a>
        <a href="https://github.com/AlexandruRO45/PTEMO/issues">
            <img src="https://img.shields.io/github/issues/AlexandruRO45/PTEMO.svg" alt="Issues Badge"/>
        </a>
        <a href="https://github.com/AlexandruRO45/PTEMO/pulls">
            <img src="https://img.shields.io/github/issues-pr/AlexandruRO45/PTEMO.svg" alt="Pull Requests Badge"/>
        </a>
    </div>
    <div id="badges">
        <!-- External Website Badge -->
        <a href="https://transit.ac.uk/">
            <img src="https://img.shields.io/badge/Website-TransiT-blue" alt="TransiT Website Badge"/>
        </a>
        <!-- YouTube Presentation Badge -->
        <a href="https://youtube.com/your-video-link">
            <img src="https://img.shields.io/badge/Watch-YouTube-red" alt="YouTube Presentation Badge"/>
        </a>
    </div>
</div>

---

# Port Traffic Emissions Management and Optimization (PTEMO)  Digital Twin Visualization and Logistics for the Port of Dover Using Bentley iTwin Platform  

**Welcome to PTEMO!**  
This project harnesses the power of **digital twins** to revolutionize logistics and emissions management at one of the UK’s busiest transport hubs, the Port of Dover.  

---

## 🌟 Purpose  
- Develop scalable digital twin models for constrained environments.  
- Simulate and analyze traffic flow and emissions hotspots.  
- Build an intuitive user interface (UI) for scenario-based operational analysis.  



## 🚀 Key Features  

### Dashboards for Traffic Monitoring and Emissions Analytics  
- **Emissions Dashboard**: Real-time insights with cumulative area charts and filters.  
- **Data Analytics**: Metrics on idle times, vehicle density, and emissions.  

### Interactive Tools for Real-Time Operations  
- **InteractiveMap**: Visualize road networks with zooming, filtering, and simulation toggling.  
- **VehicleTrackingPanel**: Track vehicle statuses, idle times, and emissions data.  
- **SimulationControlPanel**: Run scenario-based simulations with dynamic playback options.  



## 🛠 Tools and Frameworks  

### Software Tools:  
- **React.js & TypeScript**: Dynamic and modular UI development.  
- **Tailwind CSS**: Customizable styling for a seamless user experience.  
- **Recharts**: Responsive visualizations for traffic and emissions data.  
- **Bentley iTwin Platform**: 3D/4D modeling for simulation and analysis.  

### Data Sources:  
- Mock datasets for vehicles, emissions, and road networks sourced via OpenStreetMap APIs.  
- JSON/CSV data formats aligned with Bentley’s default global coordinate system.  

---

## ⚙️ Installation  

### Prerequisites  
- **Node.js**: Install via [Node.js Package Manager](https://nodejs.org/en/download/package-manager).  

### Step-by-Step Setup  

#### Clone the Repository  
```bash
git clone <repository-url>
cd <repository-directory>
npm install
 

#### Set Up Environment Variables  
1. Create a `.env` file in the root directory.  
2. Copy and configure the following variables:  

```dotenv
# ---- Authorization Client Settings ----
IMJS_AUTH_CLIENT_CLIENT_ID=
IMJS_AUTH_CLIENT_REDIRECT_URI=
IMJS_AUTH_CLIENT_LOGOUT_URI=
IMJS_AUTH_CLIENT_SCOPES=
IMJS_AUTH_AUTHORITY="https://ims.bentley.com"

# ---- Test IDs ----
IMJS_ITWIN_ID=
IMJS_IMODEL_ID=

# ---- Map Settings ----
IMJS_AZURE_MAPS_KEY=
IMJS_MAP_BOX_KEY=
IMJS_CESIUM_ION_KEY=

# Advanced CRA Config
SKIP_PREFLIGHT_CHECK=true
USE_FAST_SASS=true
USE_FULL_SOURCEMAP=true
TRANSPILE_DEPS=false
USING_NPM=true
```  

#### Build and Serve the Application  

1. Build the project:  
   ```bash
   npm run build
   ```  
2. Serve the application locally (install `serve` if prompted):  
   ```bash
   npm install -g serve
   serve -s build
   ```  
3. Access the application via:  
   - Local: `http://localhost:3000`  
   - Network: `http://<network-ip>:3000`  

---

## 📊 Results and Impact  

- **Simulation Insights**: Pinpointed emissions hotspots and inefficiencies via heatmaps.  
- **Scalability**: Demonstrated a replicable model for other transport hubs.  
- **Sustainability**: Supported TransiT’s mission to decarbonize UK logistics.  



## 📝 Notes  
- Mock data was used; future iterations aim for real-time data integration.  
- Current limitations include capped vehicle counts and simulation fidelity dependent on OSM data.  

---

## 📜 License and Copyright  

This project is licensed under the Apache License 2.0. See the LICENSE file for more details.  

### Copyright Disclaimer  
- Copyright © Bentley Systems, Incorporated.  
- © OpenStreetMap contributors.  

This project uses OpenStreetMaps and the Overpass API under the Open Database License.  

**More Information:**  
- [OSM Licensing](https://www.openstreetmap.org/copyright)  
- [OSM Map Tiles](https://wiki.openstreetmap.org/wiki/Tile_usage_policy)  

---

## 💡 Acknowledgments  
This project was completed as part of the **TransiT Initiative**, a collaborative effort aimed at leveraging digital twin technologies to decarbonize UK transport infrastructure. I am deeply grateful to my supervisors, **Dr. Daniel Mitchell** and **Prof. David Flynn**, for their guidance and for providing this opportunity to develop PTEMO as my Master’s dissertation project.  

Special thanks to **Bentley Systems** for enabling this work with their innovative iTwin platform and to the wider TransiT team for their invaluable feedback and resources. This research underscores the critical role of digital twins in modernizing logistics and contributing to sustainable operations.

---

<div align="center">
    <i>Empowering smarter, greener logistics with PTEMO 🚢</i>
</div>
