import React, { Component } from "react";
import PropTypes from "prop-types";
import jsdiff from "diff";

const fnMap = {
  chars: jsdiff.diffChars,
  words: jsdiff.diffWords,
  sentences: jsdiff.diffSentences,
  json: jsdiff.diffJson
};

/**
 * Display diff in a stylable form.
 *
 * Default is character diff. Change with props.type. Valid values
 * are 'chars', 'words', 'sentences', 'json'.
 *
 *  - Wrapping div has class 'Difference', override with props.className
 *  - added parts are in <ins>
 *  - removed parts are in <del>
 *  - unchanged parts are in <span>
 */

export default class Diff extends Component {
  render() {
    const diff = fnMap[this.props.type](this.props.inputA, this.props.inputB);
    const result = diff.map((part, index) => {
      if (part.added) {
        return React.createElement(
          "ins",
          { key: index },
          part.value
        );
      }
      if (part.removed) {
        return React.createElement(
          "del",
          { key: index },
          part.value
        );
      }
      return React.createElement(
        "span",
        { key: index },
        part.value
      );
    });
    return React.createElement(
      this.props.elementType,
      { className: this.props.className }, 
      result
    );
  }
}

Diff.defaultProps = {
  inputA: "",
  inputB: "",
  type: "chars",
  className: "Difference",
  elementType: "div"
};

