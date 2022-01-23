// create tile layer for background of map
var DefaultMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// grayscale layer
var Grayscale = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

// satelite layer
var Satelite = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});

// make a basemaps object
let basemaps = {
    
GrayScale: Grayscale,
    Satelite: Satelite,
    Default: DefaultMap

};

// create map object
var Map1 = L.map("map", {
    center: [36.7783, -119.4179],
    zoom: 3,
    layers: [DefaultMap, Grayscale, Satelite]
});

// add default map to map
DefaultMap.addTo(Map1);


// data for tectonic plates - variable
let tectonicPlates = new L.layerGroup();

// api call
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
.then(function(plateData){
    // console log to make sure the data loads
    //console.log(plateData);

    // load using geoJson, add plate layer group
    L.geoJson(plateData,{
        color: "orange",
        weight: 1

    }).addTo(tectonicPlates);
});

// add tectonic plates to map
tectonicPlates.addTo(Map1);



// add overlay for tectonic plates and earthquakes
let overlays = {
    "Tectonic Plates": tectonicPlates
};

// Layer control
L.control
    .layers(basemaps, overlays)
    .addTo(Map1);
