import React, { Component } from "react";
import countryTag from "../assets/coutrytag";
import CountryDetails from "./CountryDetails.js";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldHigh";
am4core.useTheme(am4themes_animated);


export default class Map extends Component {
    curDecade = "2010"
    morphedPolygon = null
    albumData = null
    colorSet = new am4core.ColorSet()
    countryclicked=false
    // Get album info for the clicked country
    getAlbum=(country,target)=>{
        let query = `http://localhost:4000/getcountry?decade=${this.curDecade}&country=${country}`
        fetch(query)
        .then(response => response.json())
        .then(({data})=> {
            this.albumData = data
            if(this.albumData.length<1){
                this.albumData = "err"
            }
            else{
                // Get current polygon
                this.selectPolygon(target);
            }
            console.log(this.albumData)
        })
        .catch(err => console.log(err));
    }
    // Set pie chart info for the clicked country
    showPieChart = (polygon) => {
        if (this.albumData=="err"){
            console.log("closed")
        }
        this.genres=[
            [this.albumData[0].blues,"blue"],
            [this.albumData[0].classical,"red"],
            [this.albumData[0].electronic,"green"],
            [this.albumData[0].folk,"grey"],
            [this.albumData[0].funk,"purple"],
            [this.albumData[0].hiphop,"orange"],
            [this.albumData[0].jazz,"yellow"],
            [this.albumData[0].latin,"brown"],
            [this.albumData[0].pop,"#c300ff"],
            [this.albumData[0].reggae,"#00ffc8"],
            [this.albumData[0].rock,"#ffc573"]
        ]
        polygon.polygon.measure();
        let radius = polygon.polygon.measuredWidth / 2 * polygon.globalScale / this.map.seriesContainer.scale;
        this.pieChart.width = radius * 2;
        this.pieChart.height = radius * 2;
        this.pieChart.radius = radius;
    
        let centerPoint = am4core.utils.spritePointToSvg(polygon.polygon.centerPoint, polygon.polygon);
        centerPoint = am4core.utils.svgPointToSprite(centerPoint, this.map.seriesContainer);
    
        this.pieChart.x = centerPoint.x - radius;
        this.pieChart.y = centerPoint.y - radius;
    
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
    
        this.pieSeries.show();
        this.pieChart.show();
    }
    // Get polygon to morph in pie chart
    selectPolygon = (polygon) => {
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
        // if there is a country already morphed to circle, morph it back
        this.morphBack();
        this.countryclicked=true
        this.forceUpdate()
        // morph polygon to circle
        polygon.toFront();
        polygon.polygon.morpher.morphToSingle = true;
        var morphAnimation = polygon.polygon.morpher.morphToCircle();
    
        polygon.strokeOpacity = 0; // hide stroke for lines not to cross countries
    
        polygon.defaultState.properties.fillOpacity = 1;
        polygon.animate({ property: "fillOpacity", to: 1 }, animationDuration);
    
        // save currently morphed polygon4
        this.morphedPolygon = polygon;

        this.fadeOut(polygon);
    
        if (morphAnimation) {
            morphAnimation.events.on("animationended", function () {
                this.zoomToCountry(polygon);
            }.bind(this))
        }
        else {
            this.zoomToCountry(polygon);
        }
    }
    morphBack = () =>{
        if (this.morphedPolygon) {
            this.countryclicked = false
            this.forceUpdate()
            this.morphedPolygon.polygon.morpher.morphBack();
        }
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
    fadeOut = (exceptPolygon) => {
        for (var i = 0; i < this.mapSeries.mapPolygons.length; i++) {
            var polygon = this.mapSeries.mapPolygons.getIndex(i);
            if (polygon !== exceptPolygon) {
                polygon.defaultState.properties.fillOpacity = 0.5;
                polygon.animate([{ property: "fillOpacity", to: 0.5 }, { property: "strokeOpacity", to: 1 }], polygon.polygon.morpher.morphDuration);
            }
        }
    }
    componentDidMount(){
        // Create Map
        let chart = am4core.create("chartdiv", am4maps.MapChart);
        chart.geodata = am4geodata_worldLow;
        chart.useGeodata=true
        chart.projection = new am4maps.projections.Miller();
        chart.logo.disabled=true
        chart.seriesContainer.draggable = false;

        // Create series
        let polygonSeries = new am4maps.MapPolygonSeries();
        polygonSeries.useGeodata = true;
        chart.series.push(polygonSeries);

        // Exclude countries
        polygonSeries.exclude = ["AQ"];

        // Configure series
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.strokeWidth=0
        polygonTemplate.strokeOpacity=0
        polygonTemplate.fill = am4core.color("#5A3FCC");

        // desaturate filter for countries
        var desaturateFilter = new am4core.DesaturateFilter();
        desaturateFilter.saturation = 1;
        polygonTemplate.filters.push(desaturateFilter);

        // Create hover state and set alternative fill color
        var hoverState = polygonTemplate.states.create("hover");
        hoverState.properties.fill = am4core.color("#367B25");

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
        pieSeries.data = [
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
        sliceTemplate.fillOpacity = 1;
        sliceTemplate.strokeWidth=0;
        // Remove default animation
        var hiddenState = pieSeries.hiddenState;
        hiddenState.properties.startAngle = pieSeries.startAngle;
        hiddenState.properties.endAngle = pieSeries.endAngle;
        hiddenState.properties.opacity = 0;
        hiddenState.properties.visible = false;
        pieSeries.hiddenState.transitionDuration = 200;
        // Labels styling
        var labelTemplate = pieSeries.labels.template;
        labelTemplate.nonScaling = true;
        labelTemplate.fill = am4core.color("#000000");
        labelTemplate.fontSize = 10;
        labelTemplate.background = new am4core.RoundedRectangle();
        labelTemplate.background.fillOpacity = 0.9;
        labelTemplate.padding(4, 9, 4, 9);
        labelTemplate.background.fill = am4core.color("#FFFFFF");
        this.pieSeries = pieSeries
        this.pieChart = pieChart
    }
    componentWillUnmount(){
        if (this.map) {
            this.map.dispose();
        }
    }
    
    render(){
    return (
    <div className="App">
        <CountryDetails className={this.countryclicked ? "active" : null} data={this.albumData} ></CountryDetails>
        <div id="chartdiv" style={{ width: "100%", height: "800px" }}></div>
    </div>)
    }
}