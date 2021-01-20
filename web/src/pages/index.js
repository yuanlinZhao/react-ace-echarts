import React, { Component } from "react";

import AceEditor from "react-ace";
import ReactEcharts from "echarts-for-react";
import "./index.css";

class AceEcharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {},
      formatValue: {},
      hasError: false,
    };
  }

  onChange = (value) => {
    try {
      let option;
      eval(value);
      this.setState({
        hasError: !!option ? false : true,
        formatValue: !!option ? option : {},
      });
    } catch (exception) {
      this.setState({
        hasError: true,
        formatValue: {},
      });
    }
  };

  // 更改图表
  changeChart = () => {
    const { formatValue } = this.state;
    this.setState({
      option: formatValue,
    });
  };

  render() {
    const { option, hasError } = this.state;
    // console.log("this.aceEditor", this.aceEditor);

    return (
      <div style={{ width: "100%" }}>
        <div className="code-container">
          <div className="control-panel">
            {hasError && (
              <span className="code-info-type-error">编辑器内容有误</span>
            )}
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
            // theme="kuroir"
            onChange={this.onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            style={{ width: "calc(100% - 40px)" }}
          />
        </div>
        <div className="right-container">
          <ReactEcharts id="echarts" option={option} notMerge lazyUpdate />
        </div>
      </div>
    );
  }
}

export default AceEcharts;
