(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AvatarImageCropper = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

var _reactDom = (window.ReactDOM);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SliderBtn = function (_Component) {
    _inherits(SliderBtn, _Component);

    function SliderBtn(props) {
        _classCallCheck(this, SliderBtn);

        var _this = _possibleConstructorReturn(this, (SliderBtn.__proto__ || Object.getPrototypeOf(SliderBtn)).call(this, props));

        _this.ifMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        _this.sliderW = 0;
        _this.offsetLeft = 0;
        _this.sliderStyle = {
            width: '90%',
            maxWidth: '250px',
            height: '7px',
            backgroundColor: '#e6ecf0',
            position: 'relative',
            border: 0,
            boxShadow: 'inset 0 0 3px rgba(0,0,0,0.15)'
        };
        _this.sliderBtnStyle = {
            position: 'absolute',
            zIndex: '2',
            width: '16px',
            height: '16px',
            top: '-5px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            left: '0%',
            cursor: 'pointer',
            boxShadow: '0 0 3px rgba(0,0,0,0.1)',
            border: '1px solid #c5c5c5'
        };

        _this._onStart = function (e) {
            if (_this.ifMobile) {
                document.addEventListener('touchmove', _this._onMove);
                document.addEventListener('touchend', _this._onUp);
            } else {
                document.addEventListener('mousemove', _this._onMove);
                document.addEventListener('mouseup', _this._onUp);
            }

            e.preventDefault();
        };

        _this._onMove = function (e) {
            var x = _this.ifMobile ? e.touches[0].clientX : e.clientX;
            var relX = (x - _this.offsetLeft) / _this.sliderW * 100;
            relX = relX > 100 ? 100 : relX;
            relX = relX < 0 ? 0 : relX;
            _this.setState({
                relX: relX
            });
            _this.props.resize(relX);
            e.preventDefault();
        };

        _this._onUp = function (e) {
            if (_this.ifMobile) {
                document.removeEventListener('touchmove', _this._onMove);
                document.removeEventListener('touchend', _this._onUp);
            } else {
                document.removeEventListener('mousemove', _this._onMove);
                document.removeEventListener('mouseup', _this._onUp);
            }
            e.preventDefault();
        };

        _this.state = {
            relX: 0
        };
        return _this;
    }

    _createClass(SliderBtn, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.sliderW = this.ele.offsetWidth;
            this.offsetLeft = this.ele.getBoundingClientRect().left;
            if (this.ifMobile) {
                this.ele.children[0].addEventListener('touchstart', this._onStart);
            } else {
                this.ele.children[0].addEventListener('mousedown', this._onStart);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { ref: function ref(ele) {
                        return _this2.ele = ele;
                    }, style: _extends({}, this.sliderStyle, this.props.sliderStyle) },
                _react2.default.createElement('span', { style: _extends({}, this.sliderBtnStyle, this.props.sliderBtnStyle, { left: this.state.relX + '%' })
                })
            );
        }
    }]);

    return SliderBtn;
}(_react.Component);

var AvatarImageCropper = function (_Component2) {
    _inherits(AvatarImageCropper, _Component2);

    function AvatarImageCropper(props) {
        _classCallCheck(this, AvatarImageCropper);

        var _this3 = _possibleConstructorReturn(this, (AvatarImageCropper.__proto__ || Object.getPrototypeOf(AvatarImageCropper)).call(this, props));

        _this3.color = _this3.props.isBack ? '#ffffff' : 'rgba(148,148,148,1)';
        _this3.ifMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        _this3.iconStyle = {
            display: 'inline-block',
            color: _this3.color,
            fill: 'currentcolor',
            height: 32,
            width: 32,
            userSelect: 'none'
        };
        _this3.textStyle = {
            color: _this3.color,
            fontSize: '18px'
        };
        _this3.rootStyle = {
            textAlign: 'center',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        };
        _this3.inputStyle = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            opacity: 0,
            height: '100%',
            zIndex: 8,
            width: '100%',
            cursor: 'pointer'
        };
        _this3.previewStyle = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 9,
            backgroundRepeat: 'no-repeat',
            cursor: 'move',
            backgroundPosition: '0% 0%'
        };
        _this3.cropStyle = {
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
        };
        _this3.avatarStyle = {
            height: '100%',
            display: 'block',
            position: 'relative',
            backgroundColor: _this3.props.isBack ? 'rgba(0,0,0,0.4)' : 'transparent'
        };
        _this3.sliderConStyle = {
            position: 'absolute',
            top: '100%',
            right: 0,
            left: 0,
            zIndex: 9,
            backgroundColor: '#222',
            display: 'flex',
            justifyContent: 'center'
        };
        _this3.sliderChildrenDiv = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '600px',
            width: '100%'
        };
        _this3.sliderDiv = { height: '20px', margin: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' };
        _this3.btnStyle = {
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: 400,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            cursor: 'pointer',
            border: '1px solid transparent',
            borderRadius: '4px',
            margin: '5px'
        };
        _this3.cancelBtnStyle = _extends({}, _this3.btnStyle, {
            color: '#333',
            backgroundColor: '#fff',
            borderColor: '#ccc'
        });
        _this3.applyBtnStyle = _extends({}, _this3.btnStyle, {
            color: '#fff',
            backgroundColor: '#5cb85c',
            borderColor: '#4cae4c'
        });
        _this3.ele = null;
        _this3.filename = '';
        _this3.avatar2D = {
            width: 0,
            height: 0,
            ratio: 0
        };
        _this3.img2D = {
            width: 0,
            height: 0,
            ratio: 0
        };
        _this3.origin = {
            width: 0,
            height: 0
        };
        _this3.img = null;

        _this3.resetOrientation = function (file) {
            return new Promise(function (resolve, reject) {
                var getOrientation = function getOrientation() {
                    return new Promise(function (resolve) {
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            var view = new DataView(event.target.result);

                            if (view.getUint16(0, false) != 0xFFD8) return resolve(-2);

                            var length = view.byteLength,
                                offset = 2;

                            while (offset < length) {
                                var marker = view.getUint16(offset, false);
                                offset += 2;

                                if (marker == 0xFFE1) {
                                    if (view.getUint32(offset += 2, false) != 0x45786966) {
                                        return resolve(-1);
                                    }
                                    var little = view.getUint16(offset += 6, false) == 0x4949;
                                    offset += view.getUint32(offset + 4, little);
                                    var tags = view.getUint16(offset, little);
                                    offset += 2;

                                    for (var i = 0; i < tags; i++) {
                                        if (view.getUint16(offset + i * 12, little) == 0x0112) return resolve(view.getUint16(offset + i * 12 + 8, little));
                                    }
                                } else if ((marker & 0xFF00) != 0xFF00) break;else offset += view.getUint16(offset, false);
                            }
                            return resolve(-1);
                        };
                        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
                    });
                };
                var reset = function reset(or) {
                    return new Promise(function (resolve) {
                        if (or === 1) {
                            return resolve(file);
                        }
                        var src = window.URL.createObjectURL(file);
                        var img = new Image();
                        img.src = src;
                        img.onload = function () {
                            var width = img.width,
                                height = img.height,
                                canvas = document.createElement('canvas'),
                                ctx = canvas.getContext("2d");
                            if (4 < or && or < 9) {
                                canvas.width = height;
                                canvas.height = width;
                            } else {
                                canvas.width = width;
                                canvas.height = height;
                            }

                            // transform context before drawing image
                            switch (or) {
                                case 2:
                                    ctx.transform(-1, 0, 0, 1, width, 0);break;
                                case 3:
                                    ctx.transform(-1, 0, 0, -1, width, height);break;
                                case 4:
                                    ctx.transform(1, 0, 0, -1, 0, height);break;
                                case 5:
                                    ctx.transform(0, 1, 1, 0, 0, 0);break;
                                case 6:
                                    ctx.transform(0, 1, -1, 0, height, 0);break;
                                case 7:
                                    ctx.transform(0, -1, -1, 0, height, width);break;
                                case 8:
                                    ctx.transform(0, -1, 1, 0, 0, width);break;
                                default:
                                    break;
                            }

                            // draw image
                            ctx.drawImage(img, 0, 0);
                            canvas.toBlob(function (blob) {
                                blob.name = file.name;
                                resolve(blob);
                            });
                        };
                    });
                };
                Promise.resolve().then(getOrientation).then(reset).then(resolve).catch(reject);
            });
        };

        _this3.preDrop = function (file) {
            return new Promise(function (resolve, reject) {
                if (_this3.props.preDrop) {
                    _this3.props.preDrop(file);
                }

                return resolve();
            });
        };

        _this3.onDrop = function (evt) {
            var fileList = evt.target.files;
            var acceptedFiles = [];
            var maxsize = _this3.props.maxsize ? _this3.props.maxsize : 1024 * 1024 * 2;
            var file = fileList[0];
            if (!file) {
                return;
            }
            var ifImage = file.type.indexOf('png') >= 0 || file.type.indexOf('jpg') >= 0 || file.type.indexOf('jpeg') >= 0;

            if (ifImage && file.size <= maxsize) {
                _this3.setState({
                    loading: true,
                    x: 0,
                    y: 0,
                    relX: 0,
                    relY: 0
                });

                _this3.preDrop(file).then(function () {
                    return _this3.resetOrientation(file);
                }).then(function (file) {
                    acceptedFiles.push(file);
                    var src = window.URL.createObjectURL(file);
                    var img = new Image();
                    img.src = src;
                    img.onload = function () {
                        // preDrop patch: recalculate effective size if the viewport was updated in preDrop
                        _this3.avatar2D.width = _this3.ele.offsetWidth;
                        _this3.avatar2D.height = _this3.ele.offsetHeight;

                        _this3.img = img;
                        _this3.img2D.width = img.width;
                        _this3.img2D.height = img.height;
                        _this3.img2D.ratio = img.width / img.height;
                        var sizeW = _this3.img2D.ratio >= 1 ? _this3.avatar2D.height * _this3.img2D.ratio : _this3.avatar2D.width;
                        sizeW = sizeW < _this3.avatar2D.width ? _this3.avatar2D.width : sizeW;
                        var sizeH = sizeW / _this3.img2D.ratio;
                        _this3.setState({
                            sizeW: Math.ceil(sizeW),
                            sizeH: sizeH,
                            errorMsg: '',
                            loading: false
                        });
                        _this3.origin = {
                            width: sizeW,
                            height: sizeH
                        };
                    };
                    file.preview = src;

                    if (acceptedFiles.length) {
                        _this3.filename = acceptedFiles[0].name;
                        _this3.setState({ preview: acceptedFiles[0].preview });
                        if (_this3.props.onDrop) {
                            _this3.props.onDrop(acceptedFiles[0]);
                        }
                    }
                }).catch(function () {
                    _this3.setState({
                        loading: false
                    });
                });
            } else if (!ifImage) {
                if (_this3.props.errorHandler) {
                    _this3.props.errorHandler('not_image');
                    return;
                } else {
                    _this3.setState({
                        errorMsg: 'Please upload png/jpg/jpeg image'
                    });
                }
            } else if (file.size > maxsize) {
                if (_this3.props.errorHandler) {
                    _this3.props.errorHandler('maxsize');
                    return;
                } else {
                    _this3.setState({
                        errorMsg: 'The size of image is too large'
                    });
                }
            }
        };

        _this3._onMouseDown = function (e) {
            if (_this3.ifMobile) {
                _this3.setState({
                    x: e.touches[0].clientX - _this3.state.relX,
                    y: e.touches[0].clientY - _this3.state.relY
                });
                document.addEventListener('touchmove', _this3._onMove);
                document.addEventListener('touchend', _this3._onMouseUp);
            } else {
                _this3.setState({
                    x: e.clientX - _this3.state.relX,
                    y: e.clientY - _this3.state.relY
                });
                document.addEventListener('mousemove', _this3._onMove);
                document.addEventListener('mouseup', _this3._onMouseUp);
            }

            e.preventDefault();
        };

        _this3._onMove = function (e) {
            var x = _this3.ifMobile ? e.touches[0].clientX : e.clientX;
            var y = _this3.ifMobile ? e.touches[0].clientY : e.clientY;
            var relX = _this3.state.x - x;
            var relY = _this3.state.y - y;
            if (relX < _this3.state.sizeW - _this3.avatar2D.width && relX > 0) {
                _this3.setState({
                    relX: -relX
                });
            }
            if (relY < _this3.state.sizeH - _this3.avatar2D.height && relY > 0) {
                _this3.setState({
                    relY: -relY
                });
            }

            e.preventDefault();
        };

        _this3._onMouseUp = function (e) {
            if (_this3.ifMobile) {
                document.removeEventListener('touchmove', _this3._onMove);
                document.removeEventListener('touchend', _this3._onMouseUp);
            } else {
                document.removeEventListener('mousemove', _this3._onMove);
                document.removeEventListener('mouseup', _this3._onMouseUp);
            }

            e.preventDefault();
        };

        _this3._resize = function (val) {
            var sizeW = _this3.origin.width * (1 + val / 50);
            var sizeH = _this3.origin.height * (1 + val / 50);
            var avW = sizeW - _this3.avatar2D.width;
            var avH = sizeH - _this3.avatar2D.height;
            var relX = -_this3.state.relX > avW ? -avW : _this3.state.relX;
            var relY = -_this3.state.relY > avH ? -avH : _this3.state.relY;
            _this3.setState({
                sizeH: sizeH,
                sizeW: sizeW,
                relX: relX,
                relY: relY
            });
        };

        _this3._apply = function () {
            var crop_canvas = document.createElement('canvas');
            crop_canvas.width = _this3.avatar2D.width;
            crop_canvas.height = _this3.avatar2D.height;
            var ratio = _this3.state.sizeW / _this3.img2D.width;
            crop_canvas.getContext('2d').drawImage(_this3.img, -_this3.state.relX / ratio, -_this3.state.relY / ratio, _this3.img2D.width, _this3.img2D.height, 0, 0, _this3.state.sizeW, _this3.state.sizeH);
            crop_canvas.toBlob(function (blob) {
                _this3.ele.children[0].children[1].value = "";
                _this3.setState({
                    preview: null
                });
                blob.name = _this3.filename;
                _this3.props.apply(blob);
            });
        };

        _this3._cancel = function () {
            _this3.ele.children[0].children[1].value = "";
            _this3.setState({
                preview: null
            });
            if (_this3.props.cancel) {
                _this3.props.cancel();
            }
        };

        _this3.state = {
            preview: null,
            loading: false,
            x: 0,
            y: 0,
            relX: 0,
            relY: 0,
            sizeW: 0,
            sizeH: 0,
            errorMsg: ''
        };
        return _this3;
    }

    _createClass(AvatarImageCropper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.avatar2D.width = this.ele.offsetWidth;
            this.avatar2D.height = this.ele.offsetHeight;
            if (this.avatar2D.width < 200) {
                this.sliderChildrenDiv = _extends({}, this.sliderChildrenDiv, { flexDirection: 'column' });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _state = this.state,
                relX = _state.relX,
                relY = _state.relY,
                sizeW = _state.sizeW,
                sizeH = _state.sizeH;

            var actions = this.props.actions ? this.props.actions.map(function (ele, key) {
                var res = null;
                switch (key) {
                    case 0:
                        res = _react2.default.cloneElement(ele, { onClick: _this4._cancel });
                        break;
                    case 1:
                        res = _react2.default.cloneElement(ele, { onClick: _this4._apply });
                    default:
                        break;
                }
                return res;
            }) : null;
            return _react2.default.createElement(
                'avatar-image',
                { ref: function ref(node) {
                        return _this4.ele = node;
                    }, 'class': this.props.className,
                    style: _extends({}, this.avatarStyle, this.props.avatarStyle) },
                _react2.default.createElement(
                    'div',
                    { style: _extends({}, this.rootStyle, this.props.rootStyle) },
                    this.state.loading ? this.props.loadingNode ? this.props.loadingNode : _react2.default.createElement(
                        'div',
                        null,
                        'Loading...'
                    ) : _react2.default.createElement(
                        'div',
                        null,
                        !this.props.noWaterMark && _react2.default.createElement(
                            'div',
                            null,
                            this.props.icon ? this.props.icon : _react2.default.createElement(
                                'svg',
                                { viewBox: '0 0 24 24', style: _extends({}, this.iconStyle, this.props.iconStyle) },
                                _react2.default.createElement('circle', { cx: '12', cy: '12', r: '3.2' }),
                                _react2.default.createElement('path', {
                                    d: 'M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z' })
                            ),
                            _react2.default.createElement(
                                'div',
                                { style: _extends({}, this.textStyle, this.props.textStyle) },
                                this.props.text ? this.props.text : 'Upload photo'
                            )
                        ),
                        _react2.default.createElement(
                            'p',
                            { style: { color: 'red' } },
                            this.state.errorMsg
                        )
                    ),
                    _react2.default.createElement('input', {
                        style: _extends({}, this.inputStyle),
                        type: 'file',
                        accept: 'image/*',
                        onChange: function onChange(e) {
                            _this4.onDrop(e);
                        } }),
                    this.state.preview && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('div', {
                            onMouseDown: this._onMouseDown,
                            onTouchStart: this._onMouseDown,
                            style: _extends({}, this.previewStyle, {
                                backgroundImage: 'url(' + this.state.preview + ')',
                                backgroundSize: sizeW + 'px ' + sizeH + 'px',
                                backgroundPosition: '' + relX + 'px ' + relY + 'px'
                            }) })
                    )
                ),
                this.state.preview && _react2.default.createElement(
                    'div',
                    { style: _extends({}, this.sliderConStyle, this.props.sliderConStyle) },
                    _react2.default.createElement(
                        'div',
                        { style: _extends({}, this.sliderChildrenDiv, this.props.sliderChildrenDiv) },
                        _react2.default.createElement(
                            'div',
                            { style: _extends({}, this.sliderDiv, this.props.sliderDivStyle) },
                            _react2.default.createElement(SliderBtn, { sliderBtnStyle: this.props.sliderBtnStyle, sliderStyle: this.props.sliderStyle, resize: this._resize })
                        ),
                        _react2.default.createElement(
                            'div',
                            { name: 'action-con', style: { display: 'flex', minWidth: '100px' } },
                            actions ? actions : [_react2.default.createElement(
                                'button',
                                { style: _extends({}, this.cancelBtnStyle, this.props.cancelBtnStyle), key: 0, onClick: this._cancel },
                                _react2.default.createElement(
                                    'svg',
                                    { fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
                                    _react2.default.createElement('path', { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' }),
                                    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
                                )
                            ), _react2.default.createElement(
                                'button',
                                { style: _extends({}, this.applyBtnStyle, this.props.applyBtnStyle), key: 1, onClick: this._apply },
                                _react2.default.createElement(
                                    'svg',
                                    { fill: '#ffffff', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
                                    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
                                    _react2.default.createElement('path', { d: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' })
                                )
                            )]
                        )
                    )
                )
            );
        }
    }]);

    return AvatarImageCropper;
}(_react.Component);

/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2016-05-26
 *
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

AvatarImageCropper.propTypes = {
    /**
     * Should be used to determine if has background.
     */
    isBack: _propTypes2.default.bool,
    /**
     * Should be used to determine if has water mark.
     */
    noWaterMark: _propTypes2.default.bool,
    /**
     * Should be used to pass `icon` components.
     */
    icon: _propTypes2.default.element,
    /**
    * Should be used to pass loading component.
    */
    loadingNode: _propTypes2.default.element,
    /**
    * Should be used to pass text or component.
    */
    text: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
    /**
     * Should be used to pass `actions` array of components.
     */
    actions: _propTypes2.default.array,
    /**
     * Should be used to for file maxsize.
     */
    maxsize: _propTypes2.default.number,
    /**
     * The css class name of the root element.
     */
    className: _propTypes2.default.string,
    /**
     * Override the inline-styles of the initial icon style.
     */
    iconStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the initial text style.
     */
    textStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the root element.
     */
    rootStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the slider conatiner.
     */
    sliderConStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the slider conatiner children div.
     */
    sliderChildrenDiv: _propTypes2.default.object,
    /**
     * Override the inline-styles of the slider div.
     */
    sliderDivStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the slider.
     */
    sliderStyle: _propTypes2.default.object,
    /**
     * Override the inline-styles of the slider drag button.
     */
    sliderBtnStyle: _propTypes2.default.object,
    /**
    * Override the inline-styles of the cancel button.
    */
    cancelBtnStyle: _propTypes2.default.object,
    /**
    * Override the inline-styles of the apply button.
    */
    applyBtnStyle: _propTypes2.default.object,
    /**
     * Called when apply clicked
     */
    apply: _propTypes2.default.func,
    /**
     * Called when canceled.
     */
    cancel: _propTypes2.default.func,
    /**
     * error with file.
     */
    errorHandler: _propTypes2.default.func
};
(function (view) {
    "use strict";

    if (view) {
        var Uint8Array = view.Uint8Array,
            HTMLCanvasElement = view.HTMLCanvasElement,
            canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype,
            is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i,
            to_data_url = "toDataURL",
            base64_ranks,
            decode_base64 = function decode_base64(base64) {
            var len = base64.length,
                buffer = new Uint8Array(len / 4 * 3 | 0),
                i = 0,
                outptr = 0,
                last = [0, 0],
                state = 0,
                save = 0,
                rank,
                code,
                undef;
            while (len--) {
                code = base64.charCodeAt(i++);
                rank = base64_ranks[code - 43];
                if (rank !== 255 && rank !== undef) {
                    last[1] = last[0];
                    last[0] = code;
                    save = save << 6 | rank;
                    state++;
                    if (state === 4) {
                        buffer[outptr++] = save >>> 16;
                        if (last[1] !== 61 /* padding character */) {
                                buffer[outptr++] = save >>> 8;
                            }
                        if (last[0] !== 61 /* padding character */) {
                                buffer[outptr++] = save;
                            }
                        state = 0;
                    }
                }
            }
            // 2/3 chance there's going to be some null bytes at the end, but that
            // doesn't really matter with most image formats.
            // If it somehow matters for you, truncate the buffer up outptr.
            return buffer;
        };
        if (Uint8Array) {
            base64_ranks = new Uint8Array([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);
        }
        if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
            if (!canvas_proto.toBlob) canvas_proto.toBlob = function (callback, type /*, ...args*/) {
                if (!type) {
                    type = "image/png";
                }if (this.mozGetAsFile) {
                    callback(this.mozGetAsFile("canvas", type));
                    return;
                }if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
                    callback(this.msToBlob());
                    return;
                }

                var args = Array.prototype.slice.call(arguments, 1),
                    dataURI = this[to_data_url].apply(this, args),
                    header_end = dataURI.indexOf(","),
                    data = dataURI.substring(header_end + 1),
                    is_base64 = is_base64_regex.test(dataURI.substring(0, header_end)),
                    blob;
                if (Blob.fake) {
                    // no reason to decode a data: URI that's just going to become a data URI again
                    blob = new Blob();
                    if (is_base64) {
                        blob.encoding = "base64";
                    } else {
                        blob.encoding = "URI";
                    }
                    blob.data = data;
                    blob.size = data.length;
                } else if (Uint8Array) {
                    if (is_base64) {
                        blob = new Blob([decode_base64(data)], { type: type });
                    } else {
                        blob = new Blob([decodeURIComponent(data)], { type: type });
                    }
                }
                callback(blob);
            };

            if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
                canvas_proto.toBlobHD = function () {
                    to_data_url = "toDataURLHD";
                    var blob = this.toBlob();
                    to_data_url = "toDataURL";
                    return blob;
                };
            } else {
                canvas_proto.toBlobHD = canvas_proto.toBlob;
            }
        }
    }
})(typeof self !== "undefined" && self || typeof window !== "undefined" && window || undefined && undefined.content || undefined);

exports.default = AvatarImageCropper;
module.exports = exports.default;

},{"prop-types":7}],2:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
(function (process){(function (){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;

}).call(this)}).call(this,require('_process'))
},{"./lib/ReactPropTypesSecret":8,"_process":3}],5:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

},{"./lib/ReactPropTypesSecret":8}],6:[function(require,module,exports){
(function (process){(function (){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactIs = require('react-is');
var assign = require('object-assign');

var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
var checkPropTypes = require('./checkPropTypes');

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

}).call(this)}).call(this,require('_process'))
},{"./checkPropTypes":4,"./lib/ReactPropTypesSecret":8,"_process":3,"object-assign":2,"react-is":11}],7:[function(require,module,exports){
(function (process){(function (){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = require('react-is');

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}

}).call(this)}).call(this,require('_process'))
},{"./factoryWithThrowingShims":5,"./factoryWithTypeCheckers":6,"_process":3,"react-is":11}],8:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],9:[function(require,module,exports){
(function (process){(function (){
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}

}).call(this)}).call(this,require('_process'))
},{"_process":3}],10:[function(require,module,exports){
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;

},{}],11:[function(require,module,exports){
(function (process){(function (){
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-is.production.min.js');
} else {
  module.exports = require('./cjs/react-is.development.js');
}

}).call(this)}).call(this,require('_process'))
},{"./cjs/react-is.development.js":9,"./cjs/react-is.production.min.js":10,"_process":3}]},{},[1])(1)
});
