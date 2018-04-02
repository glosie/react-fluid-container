"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMotion = require("react-motion");

var _reactMeasure = require("react-measure");

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FluidContainer = function (_Component) {
  _inherits(FluidContainer, _Component);

  function FluidContainer(props) {
    _classCallCheck(this, FluidContainer);

    var _this = _possibleConstructorReturn(this, (FluidContainer.__proto__ || Object.getPrototypeOf(FluidContainer)).call(this, props));

    _this._handleMeasure = function (_ref) {
      var height = _ref.height;

      // store the height so we can apply it to the element immediately
      // and avoid any element jumping
      if (height > 0) {
        _this._currHeight = height;
      }
      if (height !== _this.state.height) {
        // don't fire callback on first measure
        if (!_this._firstMeasure) {
          _this.props.beforeAnimation(_this.state.height, height);
        } else {
          _this._firstMeasure = false;
        }

        _this.setState({ height: height });
      }
    };

    _this._handleRest = function () {
      _this.props.afterAnimation();
    };

    _this._handleInput = function (e) {
      var child = _react.Children.only(_this.props.children);

      _this._measureComponent.measure();

      if (typeof child.props.onInput === "function") {
        child.props.onInput(e);
      }
    };

    _this.state = {
      height: 0
    };
    _this._heightReady = props.height !== "auto";
    _this._currHeight = null;
    _this._firstMeasure = true;
    return _this;
  }

  _createClass(FluidContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(lastProps, lastState) {
      // if height has changed fire a callback before animation begins
      if (lastProps.height !== this.props.height) {
        this.props.beforeAnimation(lastProps.height, this.props.height);
      }

      // don't apply height until we have our first real measurement
      if (lastState.height > 0 || this.props.height > 0) {
        this._heightReady = true;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          tag = _props.tag,
          height = _props.height,
          rmConfig = _props.rmConfig,
          children = _props.children,
          beforeAnimation = _props.beforeAnimation,
          afterAnimation = _props.afterAnimation,
          restProps = _objectWithoutProperties(_props, ["tag", "height", "rmConfig", "children", "beforeAnimation", "afterAnimation"]);

      var rmHeight = height === "auto" ? this.state.height : height;
      var child = _react2.default.createElement(
        _reactMeasure2.default,
        {
          ref: function ref(c) {
            return _this2._measureComponent = c;
          },
          whitelist: ["height"],
          onMeasure: this._handleMeasure
        },
        (0, _react.cloneElement)(_react.Children.only(children), { onInput: this._handleInput })
      );
      return _react2.default.createElement(
        _reactMotion.Motion,
        {
          defaultStyle: { _height: rmHeight },
          style: {
            _height: (0, _reactMotion.spring)(rmHeight, _extends({ precision: 0.5 }, rmConfig))
          },
          onRest: this._handleRest
        },
        function (_ref2) {
          var _height = _ref2._height;
          return (0, _react.createElement)(tag, _extends({}, restProps, {
            style: _extends({
              height: _this2._heightReady ? _height : _this2._currHeight || "auto"
            }, restProps.style)
          }), child);
        }
      );
    }
  }]);

  return FluidContainer;
}(_react.Component);

FluidContainer.propTypes = {
  tag: _propTypes2.default.string,
  height: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.oneOf(["auto"])]),
  rmConfig: _propTypes2.default.objectOf(_propTypes2.default.number),
  children: _propTypes2.default.node.isRequired,
  beforeAnimation: _propTypes2.default.func,
  afterAnimation: _propTypes2.default.func
};
FluidContainer.defaultProps = {
  tag: "div",
  height: "auto",
  rmConfig: _reactMotion.presets.noWobble,
  beforeAnimation: function beforeAnimation() {
    return null;
  },
  afterAnimation: function afterAnimation() {
    return null;
  }
};
exports.default = FluidContainer;
module.exports = exports["default"];