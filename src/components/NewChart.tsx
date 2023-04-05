import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "../assets/scss/new-chart.scss";

const NewChart = () => {
  const [scopeStart, setScopeStart] = useState<string>();
  const [scopeEnd, setScopeEnd] = useState<string>();

  const setProvideNarrow = () => {
    setScopeStart("1.3");
    setScopeEnd("1.51");
  };

  const setProvideWide = () => {
    setScopeStart("1");
    setScopeEnd("1.8");
  };

  const setProvideAll = () => {
    setScopeStart("1");
    setScopeEnd("2.2");
  };

  useEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartContainer");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      }),
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      }),
    );
    cursor.lineY.set("visible", false);

    // Generate random data
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    var value = 1000;
    var volume = 100000;

    function generateData() {
      value = Math.round(Math.random() * 10 - 5 + value);
      volume = Math.round(Math.random() * 1000 - 500 + volume);

      am5.time.add(date, "day", 1);
      // add another if it's saturday
      if (date.getDay() == 6) {
        am5.time.add(date, "day", 1);
      }
      // add another if it's sunday
      if (date.getDay() == 0) {
        am5.time.add(date, "day", 1);
      }

      return {
        date: date.getTime(),
        value: value,
        volume: volume,
      };
    }

    function generateDatas(count: any) {
      var data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraMin: 0.2,
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      }),
    );

    series.fills.template.setAll({
      fillOpacity: 1,
      visible: true,
    });

    // y axis for volume
    var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {});
    volumeAxisRenderer.grid.template.set("forceHidden", true);
    volumeAxisRenderer.labels.template.set("forceHidden", true);

    var volumeAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        height: am5.percent(25),
        y: am5.percent(100),
        centerY: am5.percent(100),
        panY: false,
        renderer: volumeAxisRenderer,
      }),
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var volumeSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Volume Series",
        xAxis: xAxis,
        yAxis: volumeAxis,
        valueYField: "volume",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      }),
    );

    volumeSeries.columns.template.setAll({
      fillOpacity: 0.8,
      strokeOpacity: 0,
      width: am5.percent(40),
    });

    // Set data
    var data = generateDatas(30);
    series.data.setAll(data);
    volumeSeries.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <>
      <div className="chart-wrap">
        <div
          id="chartContainer"
          style={{ width: "100%", height: "360px" }}
        ></div>
      </div>
      <button onClick={setProvideNarrow}>좁은구간</button>
      <button onClick={setProvideWide}>넓은구간</button>
      <button onClick={setProvideAll}>전체구간</button>
    </>
  );
};

export default NewChart;
