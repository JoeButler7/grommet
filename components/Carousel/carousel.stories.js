"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var customTheme = {
  carousel: {
    animation: {
      duration: 400
    },
    icons: {
      color: 'blue'
    },
    disabled: {
      icons: {
        color: 'grey'
      }
    }
  }
};

var SimpleCarousel = function SimpleCarousel(_ref) {
  var initialChild = _ref.initialChild,
      props = _objectWithoutPropertiesLoose(_ref, ["initialChild"]);

  return _react["default"].createElement(_grommet.Grommet, null, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.Carousel, _extends({
    initialChild: initialChild
  }, props), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  })), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  })), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  })))));
};

var CustomCarousel = function CustomCarousel(_ref2) {
  var controls = _ref2.controls,
      rest = _objectWithoutPropertiesLoose(_ref2, ["controls"]);

  return _react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.Carousel, _extends({
    controls: controls
  }, rest), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-1"
  }, _react["default"].createElement(_grommetIcons.Attraction, {
    size: "xlarge"
  })), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-2"
  }, _react["default"].createElement(_grommetIcons.TreeOption, {
    size: "xlarge"
  })), _react["default"].createElement(_grommet.Box, {
    pad: "xlarge",
    background: "accent-3"
  }, _react["default"].createElement(_grommetIcons.Car, {
    size: "xlarge"
  })))));
};

(0, _react2.storiesOf)('Carousel', module).add('Simple', function () {
  return _react["default"].createElement(SimpleCarousel, null);
}).add('Without Controls', function () {
  return _react["default"].createElement(SimpleCarousel, {
    controls: false,
    play: 1500
  });
}).add('Custom Controls', function () {
  return _react["default"].createElement(CustomCarousel, {
    controls: "arrows"
  });
}).add('Initial Child`', function () {
  return _react["default"].createElement(SimpleCarousel, {
    initialChild: 1
  });
});