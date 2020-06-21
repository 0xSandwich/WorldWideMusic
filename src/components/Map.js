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
am4core.useTheme(am4themes_animated);

export default class Map extends Component {
    curDecade = "1990"
    morphedPolygon = null
    albumData = null
    colorSet = new am4core.ColorSet()
    countryclicked=false
    hoverGenre=null
    prevPolygon={fill:null}
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
                this.selectPolygon(target); 
            }
        })
        .catch(err => console.log(err));
    }
    getBestGenre = (country,target) => {
        let query = `http://localhost:4000/getcountry?decade=${this.curDecade}&country=${country}`
        fetch(query)
        .then(response => response.json())
        .then(({data})=> {
            this.hoverGenre = data
            if(this.hoverGenre.length<1){
                // Error handling
                this.hoverGenre = "err"
            }
            else{
                let values=[
                    [this.hoverGenre[0].blues,genderColors.blues,"blues"],
                    [this.hoverGenre[0].classical,genderColors.classical,"classical"],
                    [this.hoverGenre[0].electronic,genderColors.electronic,"electronic"],
                    [this.hoverGenre[0].folk,genderColors.folk,"folk"],
                    [this.hoverGenre[0].funk,genderColors.funk,"funk"],
                    [this.hoverGenre[0].hiphop,genderColors.hiphop,"hiphop"],
                    [this.hoverGenre[0].jazz,genderColors.jazz,"jazz"],
                    [this.hoverGenre[0].latin,genderColors.latin,"latin"],
                    [this.hoverGenre[0].pop,genderColors.pop,"pop"],
                    [this.hoverGenre[0].reggae,genderColors.reggae,"reggae"],
                    [this.hoverGenre[0].rock,genderColors.rock,"rock"]
                ]
                let max = 0
                let maxcolor = 0
                values.forEach(element => {
                    if (element[0] > max){
                        max = element[0]
                        maxcolor = element[1]
                    }
                    else {
                        
                    }
                });

                target.fill=am4core.color(maxcolor)
                this.maxGenre = maxcolor
            }
        })
        .catch(err => console.log(err));
    }
    // Set pie chart info for the clicked country
    showPieChart = (polygon) => {
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
    
        this.pieChart.x = centerPoint.x - radius;
        this.pieChart.y = centerPoint.y - radius;

        if(polygon.dataItem.dataContext.id === "US"){
            console.log('US')
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
        polygon.fill= this.maxGenre
        this.prevPolygon = polygon

        this.pieSeries.show();
        this.pieChart.show();
        this.hideSmall(this.pieSeries.dataItems.values)
    }
    // Get polygon to morph in pie chart
    selectPolygon = (polygon) => {
        this.prevPolygon.fill=am4core.color("#514E61")
        if (this.morphedPolygon !== polygon) {
            var animation = this.pieSeries.hide();
            if (animation) {
                animation.events.on("animationended", function () {
                    this.morphToCircle(polygon);
                }.bind(this))
            }
            else {
                this.morphToCircle(polygon);
            }
        }
    }
    // Morph polygon (country) to pie chart
    morphToCircle = (polygon) => {
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

        this.zoomToCountry(polygon);
        
    }
    morphBack = () =>{
            this.countryclicked = false
            this.forceUpdate()
    }
    zoomToCountry = (polygon) => {
        var zoomAnimation = this.map.zoomToMapObject(polygon, 2.2, true);
        if (zoomAnimation) {
            zoomAnimation.events.on("animationended", function () {
                this.showPieChart(polygon);
            }.bind(this))
        }
        else {
            this.showPieChart(polygon);
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
        polygonSeries.exclude = ["AQ","BV","GO","JU","BQ","WF","PS","VA","TK","SZ","PM","SH","GS","EH","PN","SJ","NU","MF","XK","KI","IO","HM","CZ","CX","CC","BL","BI","TF","AX","GI","UM-DQ","UM-FQ","UM-JQ","UM-MQ","TV","UM-HQ"];

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
        
        polygonTemplate.events.on("over",function(event){
            this.getBestGenre(countryTag[event.target.dataItem.dataContext.id],event.target)
        },this)
        polygonTemplate.events.on("out",function(event){
            setTimeout(()=>{
                if(this.prevPolygon !== event.target){
                    event.target.fill=am4core.color('#514E61')
                }
            },500)
        },this)
        
        // When a country is clicked
        polygonTemplate.events.on("hit", function(event) {
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
        var hiddenState = pieSeries.hiddenState;
        hiddenState.properties.startAngle = pieSeries.startAngle;
        hiddenState.properties.endAngle = pieSeries.endAngle;
        hiddenState.properties.opacity = 0;
        hiddenState.properties.visible = false;
        pieSeries.hiddenState.transitionDuration = 100;
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
    showAll = () => {
        this.closeModal()
        for (var i = 0; i < this.mapSeries.mapPolygons.length; i++) {
            let polygon = this.mapSeries.mapPolygons.getIndex(i);
            let country = countryTag[polygon.dataItem.dataContext.id]
            let query = `http://localhost:4000/getcountry?decade=${this.curDecade}&country=${country}`
            fetch(query)
            .then(response => response.json())
            .then(({data})=> {
                this.hoverGenre = data
                if(this.hoverGenre.length<1){
                    // Error handling
                    this.hoverGenre = "err"
                }
                else{
                    let values=[
                        [this.hoverGenre[0].blues,genderColors.blues,"blues"],
                        [this.hoverGenre[0].classical,genderColors.classical,"classical"],
                        [this.hoverGenre[0].electronic,genderColors.electronic,"electronic"],
                        [this.hoverGenre[0].folk,genderColors.folk,"folk"],
                        [this.hoverGenre[0].funk,genderColors.funk,"funk"],
                        [this.hoverGenre[0].hiphop,genderColors.hiphop,"hiphop"],
                        [this.hoverGenre[0].jazz,genderColors.jazz,"jazz"],
                        [this.hoverGenre[0].latin,genderColors.latin,"latin"],
                        [this.hoverGenre[0].pop,genderColors.pop,"pop"],
                        [this.hoverGenre[0].reggae,genderColors.reggae,"reggae"],
                        [this.hoverGenre[0].rock,genderColors.rock,"rock"]
                    ]
                    let max = 0
                    let maxcolor = 0
                    values.forEach(element => {
                        if (element[0] > max){
                            max = element[0]
                            maxcolor = element[1]
                        }
                    });
                    polygon.fill=am4core.color(maxcolor)
                    console.log(maxcolor)
                }
            })
            .catch(err => console.log(err));
            console.log(polygon.dataItem.dataContext.id)
        }
        
    }
    nextDecade = () =>{
        this.curDecade = this.curDecade+10
        this.showAll()
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
    handleNav = (target) =>{
        this.curDecade = target
        this.forceUpdate()
    }
    closeModal(){
        this.countryclicked=false
        console.log(this.countryclicked)
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
        <DecadeInput nextdecade={this.nextDecade} showall={this.showAll} handleNav={this.handleNav} />
        <MapLegend legendClass="legend-home" data={this.albumData} />
        <CountryDetails curDecade={this.curDecade} isactive={this.countryclicked} data={this.albumData} genre={this.genres} closemodal={this.closeModal.bind(this)}></CountryDetails>
        <div id="chartdiv" className="map-chart" ></div>
    </div>)
    }
}