"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _diff = require("diff");

var _diff2 = _interopRequireDefault(_diff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fnMap = {
  chars: _diff2.default.diffChars,
  words: _diff2.default.diffWords,
  sentences: _diff2.default.diffSentences,
  json: _diff2.default.diffJson
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

var Diff = function (_Component) {
  _inherits(Diff, _Component);

  function Diff() {
    _classCallCheck(this, Diff);

    return _possibleConstructorReturn(this, (Diff.__proto__ || Object.getPrototypeOf(Diff)).apply(this, arguments));
  }

  _createClass(Diff, [{
    key: "render",
    value: function render() {
      var diff = fnMap[this.props.type](this.props.inputA, this.props.inputB);
      var result = diff.map(function (part, index) {
        if (part.added) {
          return _react2.default.createElement(
            "ins",
            { key: index },
            part.value
          );
        }
        if (part.removed) {
          return _react2.default.createElement(
            "del",
            { key: index },
            part.value
          );
        }
        return _react2.default.createElement(
          "span",
          { key: index },
          part.value
        );
      });
      return _react2.default.createElement(this.props.elementType, { className: this.props.className }, result);
    }
  }]);

  return Diff;
}(_react.Component);

exports.default = Diff;


Diff.defaultProps = {
  inputA: "",
  inputB: "",
  type: "chars",
  className: "Difference",
  elementType: "div"
};

