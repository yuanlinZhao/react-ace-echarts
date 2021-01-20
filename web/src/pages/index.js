import React, { Component } from "react";

import AceEditor from "react-ace";
import ReactEcharts from "echarts-for-react";
import "./index.css";

class AceEcharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {},
      aceValue: "",
    };
  }

  onChange = (value) => {
    this.setState({
      aceValue: value,
    });
  };

  // 更改图表
  changeChart = () => {
    const { aceValue } = this.state;
    let option;
    eval(aceValue);
    this.setState({
      option,
    });
  };

  render() {
    const { option } = this.state;
    // console.log("this.aceEditor", this.aceEditor);

    return (
      <div style={{ width: "100%" }}>
        <div className="code-container">
          <div className="control-panel">
            <button onClick={this.changeChart} className="run">
              执行
            </button>
          </div>
          <AceEditor
            className="code-panel"
            ref={(c) => {
              this.aceEditor = c;
            }}
            placeholder="请输入option"
            mode="javascript"
            fontSize={14}
            theme="kuroir"
            onChange={this.onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            style={{ width: "calc(100% - 40px)" }}
          />
        </div>
        <div className="right-container">
          <ReactEcharts
            id="echarts"
            option={option}
            notMerge
            lazyUpdate
          />
        </div>
      </div>
    );
  }
}

export default AceEcharts;
