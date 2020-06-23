import React, { Component } from "react";
import countryTag from "../assets/CountryTag";
import genderColors from "../assets/GenderColors";
import CountryDetails from "./CountryDetails.js";
import DecadeInput from "./DecadeInput.js";
import MapLegend from "./MapLegend.js";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldHigh";
import lodash from 'lodash'
am4core.useTheme(am4themes_animated);

export default class Map extends Component {
    curDecade = "1990"
    morphedPolygon = null
    albumData = null
    colorSet = new am4core.ColorSet()
    countryclicked=false
    hoverGenre=null
    prevPolygon={states:{hasKey(){return false}}}
    showAllEnabled = false
    lockhover= false
    countryColors={}
    globeView = false
    move = false
    // Get album info for the clicked country
    getAlbum=(country,target)=>{
        let query = `http://localhost:4000/getcountry?decade=${this.curDecade}&country=${country}`
        fetch(query)
        .then(response => response.json())
        .then(({data})=> {
            this.albumData = data
            if(this.albumData.length<1){
                // Error handling
                this.albumData = "err"
            }
            else{
                // Get current polygon
                this.selectPolygon(country,target); 
            }
        })
        .catch(err => console.log(err));
    }
    // Set pie chart info for the clicked country
    showPieChart = (country,polygon) => {
        if (this.albumData==="err"){
            console.log("not found")
        }
        this.genres=[
            [this.albumData[0].blues,genderColors.blues],
            [this.albumData[0].classical,genderColors.classical],
            [this.albumData[0].electronic,genderColors.electronic],
            [this.albumData[0].folk,genderColors.folk],
            [this.albumData[0].funk,genderColors.funk],
            [this.albumData[0].hiphop,genderColors.hiphop],
            [this.albumData[0].jazz,genderColors.jazz],
            [this.albumData[0].latin,genderColors.latin],
            [this.albumData[0].pop,genderColors.pop],
            [this.albumData[0].reggae,genderColors.reggae],
            [this.albumData[0].rock,genderColors.rock]
        ]
        polygon.polygon.measure();
        let radius = 70;
        let innerRadius = 50;
        this.pieChart.width = radius * 2;
        this.pieChart.height = radius * 2;
        this.pieChart.innerRadius=innerRadius
        this.pieChart.radius = radius;
    
        let centerPoint = am4core.utils.spritePointToSvg(polygon.polygon.centerPoint, polygon.polygon);
        centerPoint = am4core.utils.svgPointToSprite(centerPoint, this.map.seriesContainer);
        console.log(this.pieSeries)
        this.pieChart.x = centerPoint.x - radius;
        this.pieChart.y = centerPoint.y - radius;

        if(polygon.dataItem.dataContext.id === "US"){
            //US
            this.pieChart.x = 300
            this.pieChart.y = 350
        }
    
        let fill = polygon.fill;
    
        for (let i = 0; i < this.pieSeries.dataItems.length; i++) {
            let dataItem = this.pieSeries.dataItems.getIndex(i);
            dataItem.value = this.genres[i][0]
            dataItem.slice.fill = am4core.color(am4core.colors.interpolate(
                fill.rgb,
                am4core.color(this.genres[i][1]).rgb,
                1
            ));
        }

        // Fill country by genre color
        country = lodash.invertBy(countryTag)[country]
        console.log(this.countryColors[country[0]])
        polygon.setState("enable")
        // set Hover color = genre color
        polygon.states.getKey('default').properties.fill=this.countryColors[country[0]]
        this.prevPolygon = polygon

        this.pieSeries.show();
        this.pieChart.show();
        this.hideSmall(this.pieSeries.dataItems.values)
    }
    clearPrevPolygon=()=>{
        let polygon = this.prevPolygon
        if(polygon.states.hasKey("hover")){
            polygon.states.getKey('default').properties.fill=am4core.color("#514E61")
            let temp = polygon.states.getKey('hover').properties.fill
            polygon.states.getKey('hover').properties.fill=am4core.color("#514E61")
            polygon.states.getKey('hover').properties.fill=temp
        }
        polygon.fill=am4core.color("#514E61")
        
    }
    // Get polygon to morph in pie chart
    selectPolygon = (country,polygon) => {
        this.clearPrevPolygon()
        if (this.morphedPolygon !== polygon) {
            var animation = this.pieSeries.hide();
            if (animation) {
                animation.events.on("animationended", function () {
                    this.morphToCircle(country,polygon);
                }.bind(this))
            }
            else {
                this.morphToCircle(country,polygon);
            }
        }
    }
    // Morph polygon (country) to pie chart
    morphToCircle = (country,polygon) => {
        var animationDuration = polygon.polygon.morpher.morphDuration;
        this.countryclicked=true
        this.forceUpdate()
        polygon.toFront();
        polygon.strokeOpacity = 0; // hide stroke for lines not to cross countries

        this.fadeOut(polygon)
    
        polygon.defaultState.properties.fillOpacity = 1;
        polygon.animate({ property: "fillOpacity", to: 1 }, animationDuration);
    
        // save currently morphed polygon4
        this.morphedPolygon = polygon;

        this.zoomToCountry(country,polygon);
        
    }
    morphBack = () =>{
            this.countryclicked = false
            this.forceUpdate()
    }
    zoomToCountry = (country,polygon) => {
        var zoomAnimation = this.map.zoomToMapObject(polygon, 2.2, true);
        if (zoomAnimation) {
            zoomAnimation.events.on("animationended", function () {
                this.showPieChart(country,polygon);
            }.bind(this))
        }
        else {
            this.showPieChart(country,polygon);
        }
    }
    // Fade out all countries except selected
    fadeOut = (exceptPolygon, isreset) => {
        for (let i = 0; i < this.mapSeries.mapPolygons.length; i++) {
            
            let polygon = this.mapSeries.mapPolygons.getIndex(i);
            // console.log(polygon.dataItem.dataContext.id)
            if(isreset){
                polygon.defaultState.properties.fillOpacity = 1;
                polygon.animate([{ property: "fillOpacity", to: 1 }, { property: "strokeOpacity", to: 1 }], polygon.polygon.morpher.morphDuration);
            }
            else {
                if (polygon !== exceptPolygon) {
                    polygon.defaultState.properties.fillOpacity = 0.5;
                    polygon.animate([{ property: "fillOpacity", to: 0.5 }, { property: "strokeOpacity", to: 1 }], polygon.polygon.morpher.morphDuration);
                }
                else{
                    polygon.defaultState.properties.fillOpacity = 0;
                    polygon.animate([{ property: "fillOpacity", to: 0 }, { property: "strokeOpacity", to: 1 }], polygon.polygon.morpher.morphDuration);
                }
            }
        }
    }
    init =() =>{
        for(let i=0;i<Object.entries(this.countryColors).length ; i++){
            let polygon=this.mapSeries.getPolygonById(Object.entries(this.countryColors)[i][0])
            polygon.states.removeKey("hover")
        }
        this.countryColors={}
        let query = "http://localhost:4000/getbestgenre?decade="+this.curDecade
        fetch(query)
        .then(response => response.json())
        .then((data)=> { // ici tu destructures donc c'est normal que ca renvoie undefined
            for(let j=0 ; j< Object.keys(data).length ; j++){
                let country = lodash.invertBy(countryTag)[data[j][0]]
                let color = genderColors[data[j][1]]
                if (country){
                    this.countryColors[country[0]] = color
                    let polygon = this.mapSeries.getPolygonById(country)
                    setTimeout(()=>{
                    if(polygon){
                        
                    }
                    },200)
                }
            }
            console.log(this.countryColors)
        })
        .catch(err => console.log(err));
        setTimeout(()=>{this.setHoverState()},1000)
    }
    componentDidMount(){
        // Create Map
        let chart = am4core.create("chartdiv", am4maps.MapChart);
        chart.background.visible = false;
        chart.geodata = am4geodata_worldLow;
        chart.useGeodata=true
        chart.projection = new am4maps.projections.Miller();
        chart.logo.disabled=true
        chart.seriesContainer.draggable = true;
        chart.seriesContainer.resizable = true;
        chart.seriesContainer.events.disableType("doublehit");
        chart.chartContainer.background.events.disableType("doublehit");

        // Create series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        chart.series.push(polygonSeries);

        // Exclude countries
        polygonSeries.exclude = ["AQ","BV","GO","JU","BQ","WF","PS","TK","SZ","PM","SH","GS","EH","PN","SJ","NU","MF","XK","KI","IO","HM","CX","CC","BL","BI","TF","AX","UM-DQ","UM-FQ","UM-JQ","UM-MQ","TV","UM-HQ"];

        // Configure series
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.strokeWidth=0
        polygonTemplate.strokeOpacity=0
        polygonTemplate.fill = am4core.color("#514E61");
        this.polygonTemplate = polygonTemplate
        polygonSeries.data = [{
            "id": "NZ",
            "zoomLevel": 12,
            "zoomGeoPoint": {
              "latitude": -41,
              "longitude": 173
            }
          }, {
            "id": "RU",
            "zoomLevel": 2.5,
            "zoomGeoPoint": {
              "latitude": 62,
              "longitude": 96
            }
          }, {
            "id": "US",
            "zoomLevel": 2.5,
            "zoomGeoPoint": {
              "latitude": 38,
              "longitude": -101
            }
          }];
          
          polygonSeries.dataFields.zoomLevel = "zoomLevel";
          polygonSeries.dataFields.zoomGeoPoint = "zoomGeoPoint";

        // desaturate filter for countries
        var desaturateFilter = new am4core.DesaturateFilter();
        desaturateFilter.saturation = 1;
        polygonTemplate.filters.push(desaturateFilter);

        this.init()
        
        // When a country is clicked
        polygonTemplate.events.on("hit", function(event) {
            if(this.move ===true){
                this.move=false 
            }
            else{
                this.move=true
            }
            console.log(this.move)
            if(this.showAllEnabled){
                if(this.move=false){
                    this.move=true
                }
                else{
                    this.move=false
                }
                this.showAll()
            }
            // Requète pour obtenir les stats pour l'année / pays en cours
            this.getAlbum(countryTag[event.target.dataItem.dataContext.id],event.target)
        }.bind(this));
        // Binding to component property to acess in other functions
        this.map = chart;
        this.mapSeries = polygonSeries

        // Pie chart creationg
        var pieChart = this.map.seriesContainer.createChild(am4charts.PieChart);
        // Set width/heigh of a pie chart for easier positioning only
        pieChart.width = 500;
        pieChart.height = 500;
        pieChart.hidden = true; 
        // because defauls are 50, and it's not good with small countries
        pieChart.chartContainer.minHeight = 5;
        pieChart.chartContainer.minWidth = 5;
        let pieSeries = pieChart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "category";
        pieSeries.labels.template.disabled = true;
        pieChart.data = [
            { value: 100, category: "Blues" },
            { value: 100, category: "Classical" },
            { value: 100, category: "Electronic" },
            { value: 100, category: "Folk" },
            { value: 100, category: "Funk" },
            { value: 100, category: "Hip-hop" },
            { value: 100, category: "Jazz" },
            { value: 100, category: "Latin" },
            { value: 100, category: "Pop" },
            { value: 100, category: "Reggae" },
            { value: 100, category: "Rock" }
        ];
        // Chart styling
        var dropShadowFilter = new am4core.DropShadowFilter();
        dropShadowFilter.blur = 4;
        pieSeries.filters.push(dropShadowFilter); 

        var sliceTemplate = pieSeries.slices.template;
        sliceTemplate.fillOpacity = 1
        sliceTemplate.strokeWidth=0;
        sliceTemplate.tooltipText = "{category}: {value.value} / {value.percent} %";
        sliceTemplate.events.on("hit",function(e){
            console.log('ok')
            console.log(e.target.dataItem.dataContext.category)
        })
        
        // Remove default animation
        pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
        pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
        // Labels styling
        var labelTemplate = pieSeries.labels.template;
        labelTemplate.nonScaling = true;
        labelTemplate.fill = am4core.color("#000000");
        labelTemplate.fontSize = 20;
        labelTemplate.background = new am4core.RoundedRectangle();
        labelTemplate.background.fillOpacity = 0.9;
        labelTemplate.padding(10, 15, 10, 15);
        labelTemplate.background.fill = am4core.color("#FFFFFF");
        pieSeries.labels.template.text = "{value.value}";
        pieSeries.labels.template.hide()
        this.pieSeries = pieSeries
        this.pieChart = pieChart
    } // Comp did mount
    setHoverState = () =>{
        console.log("hoverstate")
        for (var i = 0; i < Object.entries(this.countryColors).length; i++) {
            let countryId = Object.entries(this.countryColors)[i][0]
            let color = Object.entries(this.countryColors)[i][1]
            let polygon=this.mapSeries.getPolygonById(Object.entries(this.countryColors)[i][0])
            if(polygon != null){
                let hs = polygon.states.create("hover");
                hs.properties.fill = am4core.color(color);
                let as = polygon.states.create("enable");
                as.properties.fill = am4core.color(color);
            }
        }

    }
    showAll = () => {
        this.closeModal()
        if(this.showAllEnabled===false){
            console.log("enable")
            this.showAllEnabled=true
            for (var i = 0; i < Object.entries(this.countryColors).length; i++) {
                let countryId = Object.entries(this.countryColors)[i][0]
                let color = Object.entries(this.countryColors)[i][1]
                let polygon=this.mapSeries.getPolygonById(Object.entries(this.countryColors)[i][0])
                polygon.fill=am4core.color(color)
            }
        }
        else if(this.showAllEnabled === true){
            this.showAllEnabled=false
            console.log("disable")
            for (var i = 0; i < this.mapSeries.mapPolygons.length; i++) {
                let polygon = this.mapSeries.mapPolygons.getIndex(i);
                polygon.fill=am4core.color("#514E61")
            }
        }
        
    }
    hideSmall = (slices) => {
        let allNull = false
        slices.forEach((element, index) => {
            if(element.values.value.value === 0){
                element.hide()
                if (index === slices.length-1 && allNull === false){
                    console.log('all null')
                    this.allNull=true
                    this.forceUpdate()
                    // TO DO :show modal
                }
            }
            else{
                allNull=true
                element.show()
                element.label.background.fill = am4core.color(this.genres[index][1])
            }
        });
    }
    componentWillUnmount(){
        if (this.map) {
            this.map.dispose();
        }
    }
    handleView = () => {
        console.log('ok')
        if(this.globeView){
            this.globeView=false
            this.map.projection= new am4maps.projections.Miller();
            this.map.panBehavior = "default"
            this.forceUpdate()
        }
        else{
            this.globeView=true
            this.map.projection= new am4maps.projections.Orthographic();
            this.map.panBehavior = "rotateLongLat";
            console.log('view')
            this.forceUpdate()
        }
    }
    handleNav = (target) =>{
        this.clearPrevPolygon()
        for(let i=0;i<Object.entries(this.countryColors).length ; i++){
            let polygon=this.mapSeries.getPolygonById(Object.entries(this.countryColors)[i][0])
            polygon.states.removeKey("hover")
        }
        this.curDecade = target
        this.closeModal()
        this.init()
        this.forceUpdate()
        if(this.showAllEnabled){
            this.showAll()
            setTimeout(() => {
                this.showAll()  
            }, 120);
        }
        else{

        }
    }
    closeModal(){
        this.clearPrevPolygon()
        this.countryclicked=false
        this.forceUpdate()
        this.zoomOut()
        this.map.goHome()
    }
    zoomOut = () => {
        if (this.morphedPolygon) {
            this.pieSeries.hide();
            this.morphBack();
            this.fadeOut(null, true);
            this.morphedPolygon = undefined;
            setTimeout(()=>{this.prevPolygon.fill=am4core.color("#514E61")},100)
        }
    }
    
    render(){
    return (
    <div className="App">
        <div className="map-breadcrumb">
            <h1 style={{ color: "white" }}>
            MUSIC GENRES ACROSS THE WORLD
            </h1>
        </div>
        <DecadeInput globeview={this.globeView} handleview={this.handleView} curdecade={this.curDecade} isshowall={this.showAllEnabled} showall={this.showAll} handleNav={this.handleNav} />
        <MapLegend legendClass="legend-home" data={this.albumData} />
        <CountryDetails move={this.move} curDecade={this.curDecade} isactive={this.countryclicked} data={this.albumData} genre={this.genres} closemodal={this.closeModal.bind(this)}></CountryDetails>
        <div id="chartdiv" className="map-chart" ></div>
    </div>)
    }
}