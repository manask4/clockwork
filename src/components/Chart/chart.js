import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Chart/myDate.css";
import randomColor from "randomcolor";

class Chart extends React.Component {
  constructor(props) {
    super(props);

    const currDate = new Date();
    let data = this.getDataForDate(currDate);
    let colors = this.generateColors(data.length);

    this.state = {
      startDate: currDate,
      data,
      colors,
    };
  }

  generateColors(num) {
    // const HUE = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const HUE = [
      "#173F5F",
      "#0088FE",
      "#20639B",
      "#00C49F",
      "#3CAEA3",
      "#FFBB28",
      "#F6D55C",
      "#FF8042",
      "#ED553B",
    ];
    const dataLength = num !== null ? num : this.state.data.length;
    const colors = randomColor({
      count: dataLength,
      luminosity: "bright",
      hue: HUE[Math.floor(Math.random() * HUE.length)],
    });
    return colors;
  }

  handleChange = (date) => {
    let data = this.getDataForDate(date);
    this.setState({
      startDate: date,
      data,
      colors: this.generateColors(data.length),
    });
  };

  getDate(dateSelected = "") {
    let selectedDate = dateSelected ? dateSelected : this.state.startDate;
    let month = selectedDate.getMonth() + 1;
    const d =
      selectedDate.getFullYear().toString() +
      month.toString() +
      selectedDate.getDate().toString();
    return d;
  }

  getDataForDate(dateSelected) {
    let data = [];
    const date = this.getDate(dateSelected);
    let work = localStorage.getItem("work");
    if (work !== null) {
      work = JSON.parse(work);
      let summary = work[date];
      for (var task in summary) {
        data.push({
          name: task,
          value: summary[task].reduce((a, b) => a + b, 0),
        });
      }
      return data;
    } else {
      return data;
    }
  }

  render() {
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      name,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      return (
        <text
          fontSize="0.6em"
          fontWeight="800"
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {name} {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    return (
      <div style={{ width: "100%", height: "400px" }}>
        <DatePicker
          selected={this.state.startDate}
          maxDate={new Date()}
          onChange={this.handleChange}
          className="date--input"
          placeholderText="Select a date"
          calendarClassName="date--calendar"
        />
        <ResponsiveContainer>
          <PieChart width={500} height={500}>
            <Pie
              data={this.state.data}
              // cx={200}
              // cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={190}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {this.state.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={this.state.colors[index % this.state.colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Chart;
