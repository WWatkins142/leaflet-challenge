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
    zoom: 5,
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

// variable for earthquake data layer
let earthquakes = new L.layerGroup();

// api call to get earthquake data and populate layergroup
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(
    function(earthquakeData){
        console.log(earthquakeData);
        //plot the following- circles with radius dependent on magnitude and color determined by depth
        
        //function to choose color of data point
        function dataColor(depth){
            if (depth > 90)
                return "red";
            else if(depth > 70)
                return "#fc6b03";
            else if (depth > 50)
                return "#fca903";
            else if (depth >30)
                return "#fcd303";
            else if (depth > 10)
                return "#e8fc03";
            else
                return "green";
        }
        // funtion for size of radius
        function radiusSize(magnitude){
            if (magnitude == 0)
                return 1; // ensure 0 mag earthquake appears on map. 
            else
                return magnitude * 5; // ensure the circle is pronounced on map
        }

        // add on to data point style
        function dataPointStyle(feature)
        {
            return {
                opacity: 0.5,
                fillOpacity: 0.5,
                fillColor: dataColor(feature.geometry.coordinates[2]), // use index 2 for depth
                color: "000000", 
                radius: radiusSize(feature.properties.mag), // grab magnitude
                weight: 0.5,
                stroke: true
            }
        }
        
        // add GeoJson Data to earthquake layer
        L.geoJson(earthquakeData, {
            // create marker
            pointToLayer: function(feature, latLng) {
                return L. circleMarker(latLng);
            },
            // style for markers
            style: dataPointStyle, // pass in earthquake data with data style function
            // add pop-ups
            onEachFeature: function(feature, layer){
                layer.bindPopup(`Magnitude: <b>${feature.properties.mag}</b><br>
                                Depth: <b>${feature.geometry.coordinates[2]}</b><br>
                                Location: <b>${feature.properties.place}</b>`);
            }
        }).addTo(earthquakes);
    }
  
);

// add earthquake layer to map
earthquakes.addTo(Map1); 

// add overlay for tectonic plates and earthquakes
let overlays = {
    "Tectonic Plates": tectonicPlates,
    "Earthquakes": earthquakes
};

// Layer control
L.control
    .layers(basemaps, overlays)
    .addTo(Map1);

// add legend to map

let Legend = L.control({
    position: "bottomright"
});

// add legend properties
Legend.onAdd = function(){
    //div for the legend to appear in the page
    let div = L.DomUtil.create("div", "info legend");

    // intervals
    let intervals = [-10, 10, 30, 50, 70, 90];
    // interval colors
    let colors = [
        "green", 
        "#e8fc03",
        "#fcd303",
        "#fca903",
        "#fc6b03",
        "red"
    ];

    //loop through intervals and colors to generate label with colored square for the intervals
    for (var i = 0; i < intervals.length; i++)
    {
        // inner html to set square with interval and label
        div.innerHTML += "<i style='background: "
            + colors[i]
            + "'></i> "
            + intervals[i]
            + (intervals[i +1] ? 'km &ndash;' + intervals[i + 1] + 'km<br>' : '+');
    }

    return div;
};

// add legend to map
Legend.addTo(Map1);
