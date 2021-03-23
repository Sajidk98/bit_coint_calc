import React, { Component } from "react";
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";

export default class LineGraph extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.myRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: this.props.labels,
        datasets: [
          {
            label: "Last 60 days trend",
            data: this.props.data,
            backgroundColor: "#ccffcc",
            borderColor: "#006600",
            borderWidth: 5,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scaleShowVerticalLines: false,
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 2,
              },
            },
          ],
        },
      },
    });
  }
  render() {
    return <canvas id="myChart" ref={this.myRef} />;
  }
}
