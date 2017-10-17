webpackJsonp([1],{

/***/ 1062:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _css = __webpack_require__(773);

var _modal = __webpack_require__(771);

var _modal2 = _interopRequireDefault(_modal);

var _css2 = __webpack_require__(141);

var _input = __webpack_require__(357);

var _input2 = _interopRequireDefault(_input);

var _css3 = __webpack_require__(749);

var _card = __webpack_require__(748);

var _card2 = _interopRequireDefault(_card);

var _css4 = __webpack_require__(81);

var _button = __webpack_require__(64);

var _button2 = _interopRequireDefault(_button);

var _css5 = __webpack_require__(768);

var _message = __webpack_require__(767);

var _message2 = _interopRequireDefault(_message);

var _css6 = __webpack_require__(758);

var _form = __webpack_require__(757);

var _form2 = _interopRequireDefault(_form);

var _css7 = __webpack_require__(796);

var _tabs = __webpack_require__(795);

var _tabs2 = _interopRequireDefault(_tabs);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(435);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _tabs2.default.TabPane;
var FormItem = _form2.default.Item;


var INIT_SITES = [{
	name: '腾讯新闻',
	subjects: [['主题1', 'Aa', false], ['主题2', 'Ab', false], ['主题3', 'Ac', false], ['主题4', 'Ad', false]]
}, {
	name: '网易新闻',
	id: 'wangyi163',
	subjects: [['国际消息', 'Ba', false], ['国内要闻', 'Bb', false], ['财经在线', 'Bc', false], ['娱乐新天地', 'Bd', false], ['劲爆体育', 'Be', false]]
}, {
	name: '新浪新闻',
	id: 'sina',
	subjects: [['国内', 'Ca', false], ['国际', 'Cb', false], ['社会', 'Cc', false], ['体育', 'Cd', false], ['娱乐', 'Ce', false], ['军事', 'Cf', false], ['财经', 'Cg', false], ['股票', 'Ch', false]]
}, {
	name: '今日头条',
	id: 'toutiao',
	subjects: [['热点', 'Da', false], ['视频', 'Db', false], ['段子', 'Dc', false], ['社会', 'Dd', false], ['娱乐', 'De', false], ['科技', 'Df', false]]
}];

var TaskChoice = function (_Component) {
	_inherits(TaskChoice, _Component);

	function TaskChoice(props) {
		_classCallCheck(this, TaskChoice);

		var _this = _possibleConstructorReturn(this, (TaskChoice.__proto__ || Object.getPrototypeOf(TaskChoice)).call(this, props));

		_this.btnClick = function (e) {
			e.preventDefault();
			var datas = e.target.dataset;
			var identifier = datas.info;
			var desc = datas.site + '/' + datas.subject;
			var changeTask = _this.props.changeTask;

			fetch('http://localhost:3000/tasks/' + identifier + '/post/?desc=' + desc, { method: 'get', mode: 'cors' }).then(function (res) {
				return res.json();
			}).then(function (json) {
				console.log(json);
				if (json.status === 'ok!') {
					console.log('ok!');
					_message2.default.success('新建任务成功！');
					changeTask(); // 修改状态
				} else if (json.status === 'more') {
					_message2.default.warning('单次任务只能创建一次主题下的任务!');
				} else {
					_message2.default.error('创建任务失败！');
				}
			});
		};

		_this.handleOk = function (e) {
			e.preventDefault();

			var data = JSON.stringify({
				root: _this.state.root,
				title_rule: _this.state.title,
				content_rule: _this.state.content,
				pub_time_rule: _this.state.time,
				source_rule: _this.state.source,
				website_name: _this.state.site,
				country: _this.state.country,
				channel_name: _this.state.channel,
				link_rule: _this.state.link,
				second_link_rule: _this.state.secondLink
			});
			fetch('http://localhost:3000/rules/' + _this.state.id + '/edit', {
				method: 'POST',
				mode: 'cors',
				headers: { 'content-type': 'application/json' },
				body: data
			}).then(function (res) {
				return res.json();
			}).then(function (json) {
				if (json.message === 'ok!') {
					_message2.default.success('模板修改成功！');
				}
				_this.setState({
					visible: false
				});
			}).catch(function (err) {
				console.log(err);
				_message2.default.error('修改模板失败！');
			});
		};

		_this.handleCancel = function (e) {
			_this.setState({
				visible: false
			});
		};

		_this.showModal = function (e) {
			e.preventDefault();
			var id = e.target.dataset.id;
			fetch('http://localhost:3000/rule/' + id + '/get', { method: 'get', mode: 'cors' }).then(function (res) {
				return res.json();
			}).then(function (json) {
				_this.setState({
					rule: json,
					id: json.identifier,
					site: json.website_name,
					country: json.country,
					channel: json.channel_name,
					root: json.root,
					content: json.content_rule,
					source: json.source_rule,
					time: json.pub_time_rule,
					title: json.title_rule,
					link: json.link_rule,
					secondLink: json.second_link_rule,
					visible: true
				});
				_message2.default.success('获取数据成功！');
				console.log(_this.state.rule);
			});
		};

		_this.state = {
			sites: [],
			loading: false,
			visible: false,

			site: '',
			country: '',
			channel: '',
			root: '',
			content: '',
			source: '',
			time: '',
			title: '',
			link: '',
			secondLink: ''
		};
		return _this;
	}

	_createClass(TaskChoice, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			fetch('http://localhost:3000/rules/get/all', { method: 'get', mode: 'cors' }).then(function (res) {
				return res.json();
			}).then(function (json) {
				_this2.setState({ sites: json });
			}).catch(function (err) {
				console.log(err.message);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return _react2.default.createElement(
				'div',
				{ id: 'templete', style: { paddingTop: 50, width: 1250, backgroundColor: '#fff', borderRadius: 10, margin: 20, marginTop: 90 } },
				_react2.default.createElement(
					'p',
					{ style: { fontSize: 26, paddingLeft: 50, marginTop: -10, marginBottom: 10 } },
					'\u9009\u62E9\u6A21\u677F/\u4EFB\u52A1'
				),
				_react2.default.createElement(
					_tabs2.default,
					{ defaultActiveKey: '1', tabPosition: 'left', style: { height: 680 } },
					this.state.sites.map(function (site, index_) {
						var subjects = site.subjects.map(function (subject, index) {
							return _react2.default.createElement(
								_card2.default,
								{ title: subject[0], key: subject[1], style: { width: 300, float: 'left', marginLeft: 50, marginTop: 20, textAlign: 'center' }, extra: _react2.default.createElement(
										_button2.default,
										{ 'data-info': subject[1], 'data-site': site.name, 'data-subject': subject[0], loading: _this3.state.loading, onClick: _this3.btnClick },
										'\u9009\u62E9'
									) },
								_react2.default.createElement(
									'p',
									null,
									'\u4F60\u5C06\u8981\u9009\u62E9:',
									site.name,
									'/',
									subject[0]
								),
								_react2.default.createElement(
									'p',
									null,
									'\u70B9\u51FB\u9009\u62E9\u5C06\u6DFB\u52A0\u5230\u5F85\u6293\u53D6\u4EFB\u52A1'
								),
								_react2.default.createElement(
									'p',
									null,
									'XX\u65B0\u95FBXX\u4E3B\u9898\u662F...\u4E00\u6BB5\u5F85\u63CF\u8FF0\u6027\u7684\u8BED\u53E5'
								),
								_react2.default.createElement(
									_button2.default,
									{ 'data-id': subject[1], style: { marginTop: 10 }, size: 'large', type: 'primary', onClick: _this3.showModal },
									'\u4FEE\u6539\u914D\u7F6E'
								)
							);
						});
						return _react2.default.createElement(
							TabPane,
							{ tab: site.name, key: index_ + 1 },
							_react2.default.createElement(
								'div',
								{ className: 'tab-items', style: { width: 1200, overflow: 'auto' } },
								subjects
							)
						);
					})
				),
				_react2.default.createElement(
					_modal2.default,
					{
						title: '\u4FEE\u6539\u914D\u7F6E',
						visible: this.state.visible,
						onOk: this.handleOk,
						onCancel: this.handleCancel
					},
					_react2.default.createElement(
						'div',
						null,
						'WebsiteName',
						_react2.default.createElement(_input2.default, { disabled: true,
							style: { marginBottom: 16 },
							value: this.state.site || '',
							onChange: function onChange(e) {
								return _this3.setState({ site: e.target.value });
							} })
					),
					_react2.default.createElement(
						'div',
						null,
						'Country',
						_react2.default.createElement(_input2.default, {
							style: { marginBottom: 16 },
							value: this.state.country || '',
							onChange: function onChange(e) {
								return _this3.setState({ country: e.target.value });
							} })
					),
					_react2.default.createElement(
						'div',
						null,
						'ChannelName',
						_react2.default.createElement(_input2.default, {
							style: { marginBottom: 16 },
							value: this.state.channel || '',
							onChange: function onChange(e) {
								return _this3.setState({ channel: e.target.value });
							} })
					),
					_react2.default.createElement(
						'div',
						null,
						'RootURL',
						_react2.default.createElement(_input2.default, {
							style: { marginBottom: 16 },
							value: this.state.root || '',
							onChange: function onChange(e) {
								return _this3.setState({ root: e.target.value });
							} })
					),
					_react2.default.createElement(
						'div',
						null,
						'ContentPath',
						_react2.default.createElement(_input2.default, {
							style: { marginBottom: 16 },
							value: this.state.content || '',
							onChange: function onChange(e) {
								return _this3.setState({ content: e.target.value });
							} })
					),
					_react2.default.createElement(
						'div',
						null,
						'SourcePath',
						_react2.default.createElement(_input2.default, {
							style: { marginBottom: 16 },
							value: this.state.source || '',
							onChange: function onChange(e) {
								return _this3.setState({ source: e.target.value });
							} })
					),
					_react2.default.createElement(
						'div',
						null,
						'DateTimePath',
						_react2.default.createElement(_input2.default, {
							style: { marginBottom: 16 },
							value: this.state.time || '',
							onChange: function onChange(e) {
								return _this3.setState({ time: e.target.value });
							} })
					),
					_react2.default.createElement(
						'div',
						null,
						'TitlePath',
						_react2.default.createElement(_input2.default, {
							style: { marginBottom: 16 },
							value: this.state.title || '',
							onChange: function onChange(e) {
								return _this3.setState({ title: e.target.value });
							} })
					),
					_react2.default.createElement(
						'div',
						null,
						'LinkPath',
						_react2.default.createElement(_input2.default, {
							style: { marginBottom: 16 },
							value: this.state.link || '',
							onChange: function onChange(e) {
								return _this3.setState({ link: e.target.value });
							} })
					),
					_react2.default.createElement(
						'div',
						null,
						'SecondLinkPath',
						_react2.default.createElement(_input2.default, {
							style: { marginBottom: 16 },
							value: this.state.secondLink || '',
							onChange: function onChange(e) {
								return _this3.setState({ secondLink: e.target.value });
							} })
					)
				)
			);
		}
	}]);

	return TaskChoice;
}(_react.Component);

// 抓取规则的单条
/**
	{
    "identifier": "Aa",
    "root": "http://www.limoer.cc",
    "title_rule": "html/body/title",
    "content_rule": "html/body/content",
    "pub_time_rule": "html/body/pub_time",
    "source_rule": "/html/body/header/author",
    "website_name": "腾讯新闻",
    "region": null,
    "country": "中国",
    "language": "简体中文",
    "channel_name": "腾讯国内",
    "create_time": "2017-07-08T07:17:01.000Z"
}
*/


exports.default = TaskChoice;

/***/ }),

/***/ 1063:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _css = __webpack_require__(766);

var _menu = __webpack_require__(358);

var _menu2 = _interopRequireDefault(_menu);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header(props) {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

		_this.click = function (e) {
			_this.setState({
				current: e.key
			});
		};

		_this.state = {
			current: 'templete'
		};
		return _this;
	}

	_createClass(Header, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ style: { padding: 0, position: 'fixed', top: 0, zIndex: 300, width: '100%' } },
				_react2.default.createElement(
					_menu2.default,
					{
						mode: 'horizontal',
						style: { fontSize: 16 },
						onClick: this.click,
						selectedKeys: [this.state.current]
					},
					_react2.default.createElement(
						'div',
						{ style: { float: 'left', marginLeft: 10, fontSize: 20 } },
						_react2.default.createElement(
							'a',
							{ href: '#' },
							'\u57FA\u4E8EStorm\u7684\u5206\u5E03\u5F0F\u6570\u636E\u91C7\u96C6'
						)
					),
					_react2.default.createElement(
						_menu2.default.Item,
						{ style: { marginLeft: 300 }, key: 'templete' },
						_react2.default.createElement(
							'a',
							{ href: '#templete' },
							'\u6A21\u677F'
						)
					),
					_react2.default.createElement(
						_menu2.default.Item,
						{ key: 'tasks' },
						_react2.default.createElement(
							'a',
							{ href: '#task' },
							'\u4EFB\u52A1'
						)
					),
					_react2.default.createElement(
						_menu2.default.Item,
						{ key: 'search' },
						_react2.default.createElement(
							'a',
							{ href: '#search' },
							'\u641C\u7D22'
						)
					),
					_react2.default.createElement(
						_menu2.default.Item,
						{ key: 'showller' },
						_react2.default.createElement(
							'a',
							{ href: '#show' },
							'\u6570\u636E'
						)
					)
				)
			);
		}
	}]);

	return Header;
}(_react2.default.Component);

exports.default = Header;

/***/ }),

/***/ 1064:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _css = __webpack_require__(205);

var _popover = __webpack_require__(204);

var _popover2 = _interopRequireDefault(_popover);

var _css2 = __webpack_require__(81);

var _button = __webpack_require__(64);

var _button2 = _interopRequireDefault(_button);

var _css3 = __webpack_require__(203);

var _icon = __webpack_require__(30);

var _icon2 = _interopRequireDefault(_icon);

var _css4 = __webpack_require__(352);

var _collapse = __webpack_require__(351);

var _collapse2 = _interopRequireDefault(_collapse);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _recharts = __webpack_require__(477);

var _util = __webpack_require__(242);

var _maps = __webpack_require__(241);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = _collapse2.default.Panel;
// 这是一个待完成的映射表
// 这是模拟从后台拿到的数据
var INIT_DATA = [{
    "id": 1,
    "content": "这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容",
    "title": "测试,这是title",
    "source": "limoer的日志",
    "pub_time": "2017-07-02T09:10:56.000Z",
    "url": "http://www.limoer.cc",
    "identifier": "Aa",
    "COUNT(*)": 2
}, {
    "id": 3,
    "content": "内容三",
    "title": "测试测试",
    "source": "好吧",
    "pub_time": "0000-00-00 00:00:00",
    "url": "baidu.com",
    "identifier": "Ab",
    "COUNT(*)": 2
}, {
    "id": 4,
    "content": "内容三",
    "title": "测试测试",
    "source": "好吧",
    "pub_time": "0000-00-00 00:00:00",
    "url": "baidu.com",
    "identifier": "Ba",
    "COUNT(*)": 2
}, {
    "id": 6,
    "content": "内容三",
    "title": "测试测试",
    "source": "好吧",
    "pub_time": "0000-00-00 00:00:00",
    "url": "baidu.com",
    "identifier": "Bb",
    "COUNT(*)": 1
}, {
    "id": 5,
    "content": "内容三",
    "title": "测试测试",
    "source": "好吧",
    "pub_time": "0000-00-00 00:00:00",
    "url": "baidu.com",
    "identifier": "Cd",
    "COUNT(*)": 2
}];

var Showller = function (_Component) {
    _inherits(Showller, _Component);

    function Showller(props) {
        _classCallCheck(this, Showller);

        var _this = _possibleConstructorReturn(this, (Showller.__proto__ || Object.getPrototypeOf(Showller)).call(this, props));

        _this.getData = function () {
            fetch('http://localhost:3000/contents/countbyidentifier', { method: 'get', mode: 'cors' }).then(function (res) {
                return res.json();
            }).then(function (json) {
                _this.setState({
                    contents: json
                });
            });
        };

        _this.refresh = function () {
            _this.getData();
        };

        _this.state = {
            contents: INIT_DATA
        };
        return _this;
    }

    _createClass(Showller, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getData();
        }
    }, {
        key: 'render',
        value: function render() {
            var content = new _util.MeasureContent(this.state.contents);
            content.init();
            var list = content.splitBySite();
            console.log(list);
            var speciaList = content.getSpeciaList(); // 最终每个主题展示一次
            var style = {
                width: 1250,
                height: 600,
                backgroundColor: '#FFF',
                margin: 20,
                borderRadius: 10,
                zIndex: 100,
                overflow: 'auto',
                padding: 50,
                position: 'relative'
            };
            return _react2.default.createElement(
                'div',
                { id: 'show', style: style },
                _react2.default.createElement(
                    'p',
                    { style: { position: 'absolute', top: 30, right: 50 } },
                    _react2.default.createElement(
                        _button2.default,
                        { onClick: this.refresh },
                        _react2.default.createElement(_icon2.default, { type: 'reload' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'p',
                        { style: { fontSize: 26, marginLeft: -20, paddingTop: 10 } },
                        '\u7EDF\u8BA1\u6570\u636E'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { fontSize: 24 } },
                    _react2.default.createElement(
                        'p',
                        { style: { fontSize: 32 } },
                        '\u6570\u91CF'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        '\u5F53\u524D\u65B0\u95FB\u603B\u91CF\uFF1A',
                        _react2.default.createElement(
                            'span',
                            { style: { backgroundColor: '#A9A9A9', border: 'none', borderRadius: 3, color: '#FFF' } },
                            '\xA0',
                            content.getAllCount(),
                            '\xA0'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { width: '100%', height: 300, marginTop: 40 } },
                    _react2.default.createElement(
                        'div',
                        { style: { width: '49%', height: 300, float: 'left', backgroundColor: 'rgba(211, 211, 211, 0.1)', borderRadius: 7 } },
                        list.map(function (item, index) {
                            return _react2.default.createElement(
                                _popover2.default,
                                { key: index + 40,
                                    title: _maps.MapSiteIdentifierToSiteName[item[0]] ? _maps.MapSiteIdentifierToSiteName[item[0]] : '未知分类',
                                    content: _react2.default.createElement(
                                        _recharts.BarChart,
                                        { width: 400, height: 270, data: item[3],
                                            margin: { top: 5, right: 30, left: 20, bottom: 5 } },
                                        _react2.default.createElement(_recharts.XAxis, { dataKey: 'name' }),
                                        _react2.default.createElement(_recharts.YAxis, null),
                                        _react2.default.createElement(_recharts.CartesianGrid, { strokeDasharray: '3 3' }),
                                        _react2.default.createElement(_recharts.Tooltip, null),
                                        _react2.default.createElement(_recharts.Legend, null),
                                        _react2.default.createElement(_recharts.Bar, { dataKey: 'ux', fill: '#8884d8' })
                                    )
                                },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'site-box', key: index + 1000, style: { width: 80, height: 80, textAlign: 'center', borderRadius: 4, backgroundColor: '#A9A9A9', float: 'left', marginLeft: 40, marginTop: 10 } },
                                    _react2.default.createElement(
                                        'p',
                                        { style: { fontWeight: 'bold', fontSize: 14, paddingTop: 5, color: '#FFF' } },
                                        _maps.MapSiteIdentifierToSiteName[item[0]] ? _maps.MapSiteIdentifierToSiteName[item[0]] : '未知分类'
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        { style: { fontSize: 32, color: '#FFF' } },
                                        item[1]
                                    )
                                )
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: { width: '49%', height: 300, float: 'left', marginLeft: '2%', borderRadius: 7, backgroundColor: 'rgba(211, 211, 211, 0.1)', overflow: 'auto' } },
                        _react2.default.createElement(
                            'h2',
                            { style: { marginBottom: 10, marginLeft: 10, marginTop: 10 } },
                            '\u90E8\u5206\u65B0\u95FB\u5C55\u793A'
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: { width: 500, marginLeft: 30 } },
                            _react2.default.createElement(
                                _collapse2.default,
                                null,
                                speciaList.map(function (item, index) {
                                    return _react2.default.createElement(
                                        Panel,
                                        { header: _maps.MapIdentifierToSite[item.identifier] ? _maps.MapIdentifierToSite[item.identifier] : '默认或者并未分组新闻' + '--------' + item.title, key: index + 5678 },
                                        _react2.default.createElement(
                                            'p',
                                            { style: { fontSize: 14, fontWeight: 'bold' } },
                                            item.title
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { style: { textIndent: 8 } },
                                            item.content
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { style: { margin: 10, float: 'right' } },
                                            '\u6765\u6E90\uFF1A',
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                _react2.default.createElement(
                                                    'a',
                                                    { href: item.url },
                                                    item.source
                                                )
                                            ),
                                            '\xA0\xA0\xA0 \u65F6\u95F4\uFF1A',
                                            _react2.default.createElement(
                                                'span',
                                                null,
                                                item.time
                                            )
                                        )
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Showller;
}(_react.Component);

exports.default = Showller;

/***/ }),

/***/ 1065:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _css = __webpack_require__(205);

var _popover = __webpack_require__(204);

var _popover2 = _interopRequireDefault(_popover);

var _css2 = __webpack_require__(203);

var _icon = __webpack_require__(30);

var _icon2 = _interopRequireDefault(_icon);

var _css3 = __webpack_require__(743);

var _alert = __webpack_require__(742);

var _alert2 = _interopRequireDefault(_alert);

var _css4 = __webpack_require__(141);

var _input = __webpack_require__(357);

var _input2 = _interopRequireDefault(_input);

var _css5 = __webpack_require__(81);

var _button = __webpack_require__(64);

var _button2 = _interopRequireDefault(_button);

var _css6 = __webpack_require__(352);

var _collapse = __webpack_require__(351);

var _collapse2 = _interopRequireDefault(_collapse);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _util = __webpack_require__(242);

var _maps = __webpack_require__(241);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = _collapse2.default.Panel;

// 这里需要构造一个Map用于对分类的查找

var INIT_NEWS = [{
	title: '这是title',
	content: 'content',
	source: '来源',
	pub_time: '2017-07-21 00:21:00',
	url: 'URL在这里',
	identifier: 'Aa'
}];

var SearchBox = function (_Component) {
	_inherits(SearchBox, _Component);

	function SearchBox(props) {
		_classCallCheck(this, SearchBox);

		var _this = _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call(this, props));

		_this.search = function (value) {
			// 这里请求后台并返回数据
			var keyword = value;
			fetch('http://localhost:3000/contents/' + keyword + '/search', { method: 'get', mode: 'cors' }).then(function (res) {
				return res.json();
			}).then(function (json) {
				_this.setState({
					news: json,
					renderedNews: json.slice(0, 10)
				});
			});
		};

		_this.changeNews = function () {
			// 每次渲染下一个十条
			var _this$state = _this.state,
			    index = _this$state.index,
			    news = _this$state.news;

			var len = news.length;
			if (len > 10 && index < len) {
				_this.setState({
					renderedNews: news.slice(index, index + 10),
					index: index + 10
				});
			}
		};

		_this.state = {
			news: INIT_NEWS,
			index: 10,
			renderedNews: INIT_NEWS.slice(0, 10)
		};
		return _this;
	}

	_createClass(SearchBox, [{
		key: 'render',
		value: function render() {
			var timespan = new _util.MeasureTime(this.state.news).init();
			var span = timespan.getTimeSpan();
			// console.log(timespan.getNewest());
			var latest = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					{ style: { marginBottom: 10 } },
					_react2.default.createElement(
						'span',
						null,
						'\u6807\u9898\uFF1A'
					),
					timespan.getNewest()[2]
				),
				_react2.default.createElement(
					'p',
					{ style: { marginBottom: 10 } },
					_react2.default.createElement(
						'span',
						null,
						'\u7C7B\u522B\uFF1A'
					),
					_maps.MapIdentifierToSite[timespan.getNewest()[0]] ? _maps.MapIdentifierToSite[timespan.getNewest()[0]] : '默认分类'
				),
				_react2.default.createElement(
					'p',
					{ style: { marginBottom: 10 } },
					_react2.default.createElement(
						'span',
						null,
						'\u53D1\u5E03\u65F6\u95F4\uFF1A'
					),
					new Date(timespan.getNewest()[1]).toLocaleDateString() + ' ' + new Date(timespan.getNewest()[1]).toLocaleTimeString()
				),
				_react2.default.createElement(
					'p',
					{ style: { textAlign: 'center', marginBottom: 10 } },
					_react2.default.createElement(
						_button2.default,
						{ type: 'primary' },
						_react2.default.createElement(
							'a',
							{ href: timespan.getNewest()[3] },
							'\u8BBF\u95EE'
						)
					)
				)
			);
			var oldest = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'p',
					{ style: { marginBottom: 10 } },
					_react2.default.createElement(
						'span',
						null,
						'\u6807\u9898\uFF1A'
					),
					timespan.getLatest()[2]
				),
				_react2.default.createElement(
					'p',
					{ style: { marginBottom: 10 } },
					_react2.default.createElement(
						'span',
						null,
						'\u7C7B\u522B\uFF1A'
					),
					_maps.MapIdentifierToSite[timespan.getLatest()[0]] ? _maps.MapIdentifierToSite[timespan.getLatest()[0]] : '默认分类'
				),
				_react2.default.createElement(
					'p',
					{ style: { marginBottom: 10 } },
					_react2.default.createElement(
						'span',
						null,
						'\u53D1\u5E03\u65F6\u95F4\uFF1A'
					),
					new Date(timespan.getLatest()[1]).toLocaleDateString() + ' ' + new Date(timespan.getLatest()[1]).toLocaleTimeString()
				),
				_react2.default.createElement(
					'p',
					{ style: { textAlign: 'center', marginBottom: 10 } },
					_react2.default.createElement(
						_button2.default,
						{ type: 'primary' },
						_react2.default.createElement(
							'a',
							{ href: timespan.getLatest()[3] },
							'\u8BBF\u95EE'
						)
					)
				)
			);
			var style = {
				width: 1250,
				height: 600,
				backgroundColor: '#FFF',
				margin: 20,
				marginTop: 50,
				borderRadius: 10,
				zIndex: 100,
				padding: 50,
				position: 'relative'
			};
			var item_style = {
				backgroundColor: '#f7f7f7',
				borderRadius: 4,
				marginBottom: 24,
				border: 0
			};
			return _react2.default.createElement(
				'div',
				{ id: 'search', style: style },
				_react2.default.createElement('div', { style: { width: 10, height: 50 } }),
				_react2.default.createElement(
					'div',
					{ style: { position: 'relative', backgroundColor: '#FFF', zIndex: 200, width: 800, marginTop: -50 } },
					_react2.default.createElement(
						'p',
						{ style: { fontSize: 26, marginLeft: -20, paddingTop: 10 } },
						'\u641C\u7D22\u65B0\u95FB'
					),
					_react2.default.createElement(_input2.default.Search, { placeholder: '\u641C\u7D22\u65B0\u95FB...', onSearch: this.search, style: { width: 400, marginTop: 50 } }),
					_react2.default.createElement(_alert2.default, { showIcon: true, style: { width: 400, marginTop: 10 }, type: 'info', message: '\u8F93\u5165\u66F4\u591A\u5173\u952E\u8BCD\u53EF\u4EE5\u83B7\u5F97\u66F4\u51C6\u786E\u7684\u7ED3\u679C\u54E6~' }),
					_react2.default.createElement(
						'p',
						{ style: { fontSize: 32, margin: 10 } },
						'\u641C\u7D22\u7ED3\u679C',
						_react2.default.createElement(
							'span',
							{ style: { fontSize: 16, marginRight: 50 } },
							'(\u6BCF\u6B21\u53EA\u6700\u591A\u663E\u793A\u5341\u6761\uFF0C\u70B9\u51FB\u6309\u94AE\u4EE5\u5207\u6362)'
						),
						'\xA0',
						_react2.default.createElement(
							_button2.default,
							{ type: 'primary', onClick: this.changeNews },
							_react2.default.createElement(_icon2.default, { type: 'reload' }),
							'reload'
						)
					),
					_react2.default.createElement('hr', null)
				),
				_react2.default.createElement(
					'div',
					{ style: { width: 800, height: 270, marginTop: 20, overflow: 'auto' } },
					_react2.default.createElement(
						_collapse2.default,
						{ bordered: false, defaultActiveKey: ['0'] },
						this.state.renderedNews.map(function (item, index) {

							return _react2.default.createElement(
								Panel,
								{ style: item_style, key: index, header: item.title },
								_react2.default.createElement(
									'p',
									null,
									item.content.length > 300 ? item.content.slice(0, 300) + '...' : item.content
								),
								_react2.default.createElement(
									'p',
									{ style: { float: 'right' } },
									'\u6765\u6E90\uFF1A',
									_react2.default.createElement(
										'a',
										{ href: item.url, target: '_blank' },
										item.source
									)
								),
								_react2.default.createElement(
									'p',
									{ style: { float: 'right' } },
									'\u53D1\u5E03\u65F6\u95F4\uFF1A',
									item.pub_time
								),
								_react2.default.createElement(
									'p',
									{ style: { float: 'right' } },
									'\u5206\u7C7B\uFF1A',
									_maps.MapIdentifierToSite[item.identifier] ? _maps.MapIdentifierToSite[item.identifier] : '默认分类'
								)
							);
						})
					)
				),
				_react2.default.createElement(
					'div',
					{ style: { position: 'absolute', width: 400, height: 500, top: 280, right: -40 } },
					_react2.default.createElement(
						'p',
						{ style: { fontSize: 24 } },
						'\u7EDF\u8BA1:'
					),
					_react2.default.createElement(
						'p',
						{ style: { fontSize: 32 } },
						'\u5171\u641C\u7D22\u5230\uFF1A',
						_react2.default.createElement(
							'span',
							{ style: { backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3 } },
							this.state.news.length
						),
						'\u6761'
					),
					_react2.default.createElement(
						'p',
						{ style: { fontSize: 28 } },
						'\u6A2A\u8DE8\uFF1A',
						_react2.default.createElement(
							'span',
							{ style: { backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3 } },
							span.day
						),
						'\u5929',
						_react2.default.createElement(
							'span',
							{ style: { backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3 } },
							span.hour
						),
						'\u5C0F\u65F6',
						_react2.default.createElement(
							'span',
							{ style: { backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3 } },
							span.min
						),
						'\u5206\u949F'
					),
					_react2.default.createElement(
						'p',
						{ style: { marginTop: 20 } },
						_react2.default.createElement(
							_popover2.default,
							{ content: latest, title: '\u6700\u8FD1\u4E00\u6761' },
							_react2.default.createElement(
								_button2.default,
								{ type: 'primary' },
								'\u6700\u8FD1\u4E00\u6761'
							)
						),
						'\xA0\xA0\xA0\xA0\xA0\xA0',
						_react2.default.createElement(
							_popover2.default,
							{ content: oldest, title: '\u6700\u8FDC\u4E00\u6761' },
							_react2.default.createElement(
								_button2.default,
								{ type: 'primary' },
								'\u6700\u8FDC\u4E00\u6761'
							)
						)
					)
				)
			);
		}
	}]);

	return SearchBox;
}(_react.Component);

exports.default = SearchBox;

/***/ }),

/***/ 1066:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _css = __webpack_require__(793);

var _table = __webpack_require__(792);

var _table2 = _interopRequireDefault(_table);

var _css2 = __webpack_require__(203);

var _icon = __webpack_require__(30);

var _icon2 = _interopRequireDefault(_icon);

var _css3 = __webpack_require__(205);

var _popover = __webpack_require__(204);

var _popover2 = _interopRequireDefault(_popover);

var _css4 = __webpack_require__(81);

var _button = __webpack_require__(64);

var _button2 = _interopRequireDefault(_button);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _util = __webpack_require__(242);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 用于任务的数据，实际因该从后台获取哦

/**
	{
        "id": 3,
        "identifier": "Aa",
        "desc": "第一个爬取任务",
        "post_time": "2017-07-10T06:55:32.000Z",
        "status": "complete"
    },
*/
var INIT_TASKS = [{
	key: '0',
	message: '这是一个示例的任务',
	create_time: '06-26 2017',
	status: 'bell'
}];

// 三种状态分别是 bell loading check
// 把task设置成为一个列表

var columns = [{
	title: '任务名称',
	dataIndex: 'message',
	key: 'message',
	render: function render(text) {
		return _react2.default.createElement(
			_popover2.default,
			{ title: '\u66F4\u591A\u4FE1\u606F', content: _react2.default.createElement(
					'p',
					null,
					'\u6682\u65F6\u7684\u5360\u4F4D\u7B26'
				) },
			_react2.default.createElement(
				_button2.default,
				null,
				text
			)
		);
	}
}, {
	title: '提交时间',
	dataIndex: 'create_time',
	key: 'create_time'
}, {
	title: '状态',
	dataIndex: 'status',
	key: 'status',
	render: function render(text) {
		return _react2.default.createElement(
			'span',
			null,
			_react2.default.createElement(_icon2.default, { style: { fontSize: 16 }, type: text })
		);
	}
}];

var TaskList = function (_Component) {
	_inherits(TaskList, _Component);

	function TaskList(props) {
		_classCallCheck(this, TaskList);

		var _this = _possibleConstructorReturn(this, (TaskList.__proto__ || Object.getPrototypeOf(TaskList)).call(this, props));

		_this.getTasks = function () {
			fetch('http://localhost:3000/tasks/all', { method: 'get', mode: 'cors' }).then(function (res) {
				return res.json();
			}).then(function (json) {
				_this.setState({
					tasks: (0, _util.translateTasks)(json)
				});
			});
		};

		_this.state = {
			tasks: INIT_TASKS
		};
		return _this;
	}

	_createClass(TaskList, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getTasks(); // 获取所有任务
		}
		// 组件只会mount一次，但是可以被更新多次，所以逻辑都写在componentDidMount

	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _props = this.props,
			    changeToInitial = _props.changeToInitial,
			    status = _props.status;

			if (status) {
				this.getTasks(); // 重新加载数据
				changeToInitial(); // 重新置状态为false
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var style = {
				width: 1250,
				backgroundColor: '#FFF',
				margin: 20,
				marginTop: 50,
				borderRadius: 10,
				zIndex: 100,
				position: 'relative',
				height: 600
			};
			var splitValues = (0, _util.getSplitTask)(this.state.tasks);
			return _react2.default.createElement(
				'div',
				{ id: 'task', style: style },
				_react2.default.createElement('div', { style: { width: 10, height: 50 } }),
				_react2.default.createElement(
					'p',
					{ style: { fontSize: 26, paddingLeft: 50, paddingTop: 10 } },
					'\u67E5\u770B\u4EFB\u52A1'
				),
				_react2.default.createElement(
					'div',
					{ style: { padding: 30, width: 1000 } },
					_react2.default.createElement(_table2.default, { columns: columns, pagination: { pageSize: 5 }, dataSource: this.state.tasks })
				),
				_react2.default.createElement(
					'div',
					{ style: { position: 'absolute', top: 120, right: 20, width: 200 } },
					_react2.default.createElement(
						'p',
						{ style: { fontSize: 32 } },
						'\u7EDF\u8BA1\uFF1A'
					),
					_react2.default.createElement(
						'p',
						{ style: { fontSize: 24, paddingTop: 20 } },
						'\u4EFB\u52A1\u6570\u91CF\uFF1A',
						_react2.default.createElement(
							'span',
							{ style: { backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3 } },
							'\xA0',
							this.state.tasks.length,
							'\xA0'
						)
					),
					_react2.default.createElement(
						'p',
						{ style: { fontSize: 28, paddingTop: 20 } },
						'\u5176\u4E2D\uFF1A'
					),
					_react2.default.createElement(
						'ul',
						{ style: { margin: 0, padding: 0, listStyle: 'none', fontSize: 0, borderRadius: 5, backgroundColor: 'rgba(211, 211, 211, 0.1)' } },
						_react2.default.createElement(
							'li',
							{ style: { fontSize: 24 } },
							'\u5F85\u5B8C\u6210\uFF1A',
							_react2.default.createElement(
								'span',
								{ style: { backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3 } },
								'\xA0',
								splitValues.init,
								'\xA0'
							)
						),
						_react2.default.createElement(
							'li',
							{ style: { fontSize: 24 } },
							'\u6B63\u6267\u884C\uFF1A',
							_react2.default.createElement(
								'span',
								{ style: { backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3 } },
								'\xA0',
								splitValues.running,
								'\xA0'
							)
						),
						_react2.default.createElement(
							'li',
							{ style: { fontSize: 24 } },
							'\u5B8C\u6210\uFF1A',
							_react2.default.createElement(
								'span',
								{ style: { backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3 } },
								'\xA0',
								splitValues.complete,
								'\xA0'
							)
						)
					)
				)
			);
		}
	}]);

	return TaskList;
}(_react.Component);

exports.default = TaskList;

/***/ }),

/***/ 1067:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(16);

var _App = __webpack_require__(414);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dom = document.getElementById('app');
(0, _reactDom.render)(_react2.default.createElement(_App2.default, null), dom);

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
// id和网站名的映射表


var MapIdentifierToSite = exports.MapIdentifierToSite = {
   'Aa': '新浪-军事',
   'Ab': '新浪-国内',
   'Ac': '新浪-国际',
   'Ad': '新浪-社会',
   'Ae': '新浪-财经',
   'Af': '新浪-娱乐',
   'Ag': '新浪-体育',
   'Ba': '凤凰网-军事',
   'Bb': '凤凰网-国内',
   'Bc': '凤凰网-国际',
   'Bd': '凤凰网-社会',
   'Be': '凤凰网-财经',
   'Bf': '凤凰网-中国',
   'Bg': '凤凰网-体育',
   'Bh': '凤凰网-科技',
   'Ca': '网易新闻-军事',
   'Cb': '网易新闻-体育',
   'Cc': '网易新闻-财经',
   'Cd': '网易新闻-房产',
   'Ce': '网易新闻-新闻',
   'Cf': '网易新闻-娱乐',
   'Cg': '网易新闻-教育',
   'Ch': '网易新闻-科技',
   'Da': '腾讯新闻-军事',
   'Db': '腾讯新闻-新闻',
   'Dc': '腾讯新闻-财经',
   'Dd': '腾讯新闻-娱乐',
   'De': '腾讯新闻-体育',
   'Df': '腾讯新闻-科技',
   'Dg': '腾讯新闻-文化',
   'Dh': '腾讯新闻-教育',
   'Ea': '搜狐-军事',
   'Eb': '搜狐-社会',
   'Ec': '搜狐-新闻',
   'Ed': '搜狐-财经',
   'Ee': '搜狐-体育',
   'Ef': '搜狐-娱乐',
   'Eg': '搜狐-教育',
   'Eh': '搜狐-科技',
   'Fa': '环球-国际新闻',
   'Fb': '环球-国内新闻',
   'Fc': '环球-社会新闻',
   'Fd': '环球-军事',
   'Fe': '环球-财经',
   'Ff': '环球-科技',
   'Fg': '环球-娱乐',
   'Fh': '环球-体育',
   'Ga': '人民网-国际新闻',
   'Gb': '人民网-军事',
   'Gc': '人民网-社会新闻',
   'Gd': '人民网-财经',
   'Ge': '人民网-教育',
   'Gf': '人民网-体育',
   'Gg': '人民网-科技',
   'Gh': '人民网-时政',
   'Gi': '人民网-文化',
   'Ha': '中国新闻网-军事',
   'Hb': '中国新闻网-国内新闻',
   'Hc': '中国新闻网-国际新闻',
   'Hd': '中国新闻网-社会新闻',
   'He': '中国新闻网-财经',
   'Hf': '中国新闻网-娱乐',
   'Hg': '中国新闻网-体育',
   'Hh': '中国新闻网-科技'
};

var MapSiteIdentifierToSiteName = exports.MapSiteIdentifierToSiteName = {
   'A': '新浪新闻',
   'B': '凤凰新闻',
   'C': '网易新闻',
   'D': '腾讯新闻',
   'E': '搜狐新闻',
   'F': '环球新闻网',
   'G': '人民网',
   'H': '中国新闻网'
};

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MeasureContent = exports.MeasureTime = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // 工具函数

exports.getSplitTask = getSplitTask;
exports.translateTasks = translateTasks;

var _maps = __webpack_require__(241);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
	数据结构：
	{
		title: '这是title',
		content: 'content',
		source: '来源',
		pub_time: '2017-07-21 00:21:00',
		url: 'URL在这里',
		identifier: 'Aa'
	}
*/

// 初次存储的格式为[['id', timestamp]]

var MeasureTime = exports.MeasureTime = function () {
	function MeasureTime(data) {
		_classCallCheck(this, MeasureTime);

		this.data = data;
		this.time_s = [];
	}

	_createClass(MeasureTime, [{
		key: 'init',
		value: function init() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					this.time_s.push([item.identifier, new Date(item.pub_time).getTime(), item.title, item.url]);
				}
				// 按时间戳排序
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.time_s.sort(function (item1, item2) {
				return item1[1] < item2[1];
			});
			return this;
		}
		// 获取新闻最长间隔

	}, {
		key: 'getTimeSpan',
		value: function getTimeSpan() {
			var newest = this.time_s[this.time_s.length - 1];
			var latest = this.time_s[0];
			var span = (latest[1] - newest[1]) / 1000;
			// console.log(span);
			// 格式化时间
			var day = Math.floor(span / (24 * 3600));
			var hour = Math.floor((span - day * 24 * 3600) / 3600);
			var min = Math.floor((span - day * 24 * 3600 - hour * 3600) / 60);
			var sec = span - day * 24 * 3600 - hour * 3600 - min * 60;
			return {
				day: day,
				hour: hour,
				min: min,
				sec: sec
			};
		}
	}, {
		key: 'getNewest',
		value: function getNewest() {
			return this.time_s[0];
		}
	}, {
		key: 'getLatest',
		value: function getLatest() {
			return this.time_s[this.time_s.length - 1];
		}
	}]);

	return MeasureTime;
}();
// 待处理数据的格式
/**
	{
        "id": 1,
        "content": "这是内容",
        "title": "测试,这是title",
        "source": "limoer的日志",
        "pub_time": "2017-07-02T09:10:56.000Z",
        "url": "http://www.limoer.cc",
        "identifier": "Aa",
        "COUNT(*)": 2
    },
**/

var MeasureContent = exports.MeasureContent = function () {
	function MeasureContent(data) {
		_classCallCheck(this, MeasureContent);

		this.data = data;
		this.total = 0;
		this.countList = [];
		this.specialList = [];
		this.siteList = [];
	}

	_createClass(MeasureContent, [{
		key: 'init',
		value: function init() {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var item = _step2.value;

					this.countList.push([item['identifier'], item['COUNT(*)']]);
					this.specialList.push({
						identifier: item['identifier'],
						content: item['content'],
						source: item['source'],
						time: item['pub_time'],
						url: item['url'],
						title: item['title']
					});
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: 'getAllCount',
		value: function getAllCount() {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.countList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var item = _step3.value;

					this.total += item[1];
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return this.total;
		}
	}, {
		key: 'getIdentifierCount',
		value: function getIdentifierCount() {
			return this.countList;
		}
	}, {
		key: 'getSpeciaList',
		value: function getSpeciaList() {
			return this.specialList;
		}

		// 如何构建这样的一个数据结构呢？[site_id, number, [[id, number], [id, number], []]]

	}, {
		key: 'splitBySite',
		value: function splitBySite() {
			// 数据整形，切分为站点标识
			// console.log(this.countList.length);
			var colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = this.countList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var item = _step4.value;

					this.siteList.push([item[0].slice(0, 1), item[1], item[0], [{ name: _maps.MapIdentifierToSite[item[0]], ux: item[1], fill: colors[(Math.random() * 7).toFixed(0)] }]]);
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			var tempList = [];
			var temp = this.siteList[0];
			for (var i = 1; i < this.siteList.length; i++) {
				if (temp[0] === this.siteList[i][0]) {
					temp[1] += this.siteList[i][1];
					temp[3].push({ name: _maps.MapIdentifierToSite[this.siteList[i][2]], ux: this.siteList[i][1], fill: colors[(Math.random() * 7).toFixed(0)] });
				} else {
					tempList.push(temp);
					temp = this.siteList[i];
				}
			}
			tempList.push(temp);
			return tempList;
		}
	}]);

	return MeasureContent;
}();

function getSplitTask(data) {
	var temp = {
		init: 0,
		running: 0,
		complete: 0
	};
	var _iteratorNormalCompletion5 = true;
	var _didIteratorError5 = false;
	var _iteratorError5 = undefined;

	try {
		for (var _iterator5 = data[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
			var item = _step5.value;

			if (item.status === 'bell') {
				temp.init += 1;
			} else if (item.status === 'loading') {
				temp.running += 1;
			} else {
				temp.complete += 1;
			}
		}
	} catch (err) {
		_didIteratorError5 = true;
		_iteratorError5 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion5 && _iterator5.return) {
				_iterator5.return();
			}
		} finally {
			if (_didIteratorError5) {
				throw _iteratorError5;
			}
		}
	}

	return temp;
}

var mapServerStatusToFrontEnd = {
	initial: 'bell',
	running: 'loading',
	complete: 'check'
};

function translateTasks(data) {
	var temp = [];
	var _iteratorNormalCompletion6 = true;
	var _didIteratorError6 = false;
	var _iteratorError6 = undefined;

	try {
		for (var _iterator6 = data[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
			var item = _step6.value;

			var date = new Date(item.post_time);
			temp.push({
				key: item.id,
				message: item.desc,
				create_time: date.toLocaleDateString() + date.toLocaleTimeString(), // 一个时间对象
				status: mapServerStatusToFrontEnd[item.status]
			});
		}
	} catch (err) {
		_didIteratorError6 = true;
		_iteratorError6 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion6 && _iterator6.return) {
				_iterator6.return();
			}
		} finally {
			if (_didIteratorError6) {
				throw _iteratorError6;
			}
		}
	}

	return temp;
}

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _css = __webpack_require__(745);

var _backTop = __webpack_require__(744);

var _backTop2 = _interopRequireDefault(_backTop);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Filter = __webpack_require__(1062);

var _Filter2 = _interopRequireDefault(_Filter);

var _Summer = __webpack_require__(1065);

var _Summer2 = _interopRequireDefault(_Summer);

var _Task = __webpack_require__(1066);

var _Task2 = _interopRequireDefault(_Task);

var _Header = __webpack_require__(1063);

var _Header2 = _interopRequireDefault(_Header);

var _Showller = __webpack_require__(1064);

var _Showller2 = _interopRequireDefault(_Showller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 让App维持一个自己的状态，持有子组件的内容，并且及时刷新子组件
var App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.changeTaskStatus = function () {
			_this.setState({ refreshTask: true });
		};

		_this.changeToInitial = function () {
			_this.setState({
				refreshTask: false
			});
		};

		_this.state = {
			refreshTask: false
		};
		return _this;
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_backTop2.default, null),
				_react2.default.createElement(_Header2.default, null),
				_react2.default.createElement(_Filter2.default, { changeTask: this.changeTaskStatus }),
				_react2.default.createElement(_Task2.default, { status: this.state.refreshTask, changeToInitial: this.changeToInitial }),
				_react2.default.createElement(_Summer2.default, null),
				_react2.default.createElement(_Showller2.default, null)
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;

/***/ }),

/***/ 435:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[1067]);