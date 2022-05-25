"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

var properties = [['aria-activedescendant', {
    'type': 'id'
}], ['aria-atomic', {
    'type': 'boolean'
}], ['aria-autocomplete', {
    'type': 'token',
    'values': ['inline', 'list', 'both', 'none']
}], ['aria-busy', {
    'type': 'boolean'
}], ['aria-checked', {
    'type': 'tristate'
}], ['aria-colcount', {
    type: 'integer'
}], ['aria-colindex', {
    type: 'integer'
}], ['aria-colspan', {
    type: 'integer'
}], ['aria-controls', {
    'type': 'idlist'
}], ['aria-current', {
    type: 'token',
    values: ['page', 'step', 'location', 'date', 'time', true, false]
}], ['aria-describedby', {
    'type': 'idlist'
}], ['aria-details', {
    'type': 'id'
}], ['aria-disabled', {
    'type': 'boolean'
}], ['aria-dropeffect', {
    'type': 'tokenlist',
    'values': ['copy', 'execute', 'link', 'move', 'none', 'popup']
}], ['aria-errormessage', {
    'type': 'id'
}], ['aria-expanded', {
    'type': 'boolean',
    'allowundefined': true
}], ['aria-flowto', {
    'type': 'idlist'
}], ['aria-grabbed', {
    'type': 'boolean',
    'allowundefined': true
}], ['aria-haspopup', {
    'type': 'token',
    'values': [false, true, 'menu', 'listbox', 'tree', 'grid', 'dialog']
}], ['aria-hidden', {
    'type': 'boolean',
    'allowundefined': true
}], ['aria-invalid', {
    'type': 'token',
    'values': ['grammar', false, 'spelling', true]
}], ['aria-keyshortcuts', {
    type: 'string'
}], ['aria-label', {
    'type': 'string'
}], ['aria-labelledby', {
    'type': 'idlist'
}], ['aria-level', {
    'type': 'integer'
}], ['aria-live', {
    'type': 'token',
    'values': ['assertive', 'off', 'polite']
}], ['aria-modal', {
    type: 'boolean'
}], ['aria-multiline', {
    'type': 'boolean'
}], ['aria-multiselectable', {
    'type': 'boolean'
}], ['aria-orientation', {
    'type': 'token',
    'values': ['vertical', 'undefined', 'horizontal']
}], ['aria-owns', {
    'type': 'idlist'
}], ['aria-placeholder', {
    type: 'string'
}], ['aria-posinset', {
    'type': 'integer'
}], ['aria-pressed', {
    'type': 'tristate'
}], ['aria-readonly', {
    'type': 'boolean'
}], ['aria-relevant', {
    'type': 'tokenlist',
    'values': ['additions', 'all', 'removals', 'text']
}], ['aria-required', {
    'type': 'boolean'
}], ['aria-roledescription', {
    type: 'string'
}], ['aria-rowcount', {
    type: 'integer'
}], ['aria-rowindex', {
    type: 'integer'
}], ['aria-rowspan', {
    type: 'integer'
}], ['aria-selected', {
    'type': 'boolean',
    'allowundefined': true
}], ['aria-setsize', {
    'type': 'integer'
}], ['aria-sort', {
    'type': 'token',
    'values': ['ascending', 'descending', 'none', 'other']
}], ['aria-valuemax', {
    'type': 'number'
}], ['aria-valuemin', {
    'type': 'number'
}], ['aria-valuenow', {
    'type': 'number'
}], ['aria-valuetext', {
    'type': 'string'
}]];
var ariaPropsMap = {
    entries: function entries() {
        return properties;
    },
    get: function get(key) {
        var item = properties.find(function (tuple) {
            return tuple[0] === key ? true : false;
        });
        return item && item[1];
    },
    has: function has(key) {
        return !!this.get(key);
    },
    keys: function keys() {
        return properties.map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1),
                key = _ref2[0];

            return key;
        });
    },
    values: function values() {
        return properties.map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                values = _ref4[1];

            return values;
        });
    }
};
var _default = ariaPropsMap;
exports.default = _default;