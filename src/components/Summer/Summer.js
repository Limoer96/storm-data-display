import { Collapse, Input, Button, Popover, Alert, Icon } from 'antd';
import React, { Component } from 'react';
import { MeasureTime } from '../../public/util.js';
const Panel = Collapse.Panel;

// 这里需要构造一个Map用于对分类的查找

const MapIdentifierToSite = {
	'Aa': '腾讯新闻-财经',
	'Ba': '新浪新闻-国际'
}

const INIT_NEWS = [
	
	{
		title: '这是title',
		content: 'content',
		source: '来源',
		pub_time: '2017-07-21 00:21:00',
		url: 'URL在这里',
		identifier: 'Aa'
	}
]


export default class SearchBox extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			news: INIT_NEWS,
			index: 10,
			renderedNews: INIT_NEWS.slice(0,10)
		}
	}
	search = (value) => {
		// 这里请求后台并返回数据
		let keyword = value;
		fetch(`http://localhost:3000/contents/${keyword}/search`, {method: 'get', mode: 'cors'}).then((res) => {
			return res.json();
		}).then((json) => {
			this.setState({
				news: json,
				renderedNews: json.slice(0, 10)
			})
		});
	}
	changeNews = () => {
		// 每次渲染下一个十条
		let {index, news} = this.state;
		let len = news.length;
		if(len > 10 && index < len){
			this.setState({
				renderedNews: news.slice(index, index+10),
				index: index + 10
			})
		}
	}
	render() {
		let timespan = new MeasureTime(this.state.news).init();
		let span = timespan.getTimeSpan();
		// console.log(timespan.getNewest());
		let latest = <div>
			<p style={{marginBottom: 10}}><span>标题：</span>{timespan.getNewest()[2]}</p>
			<p style={{marginBottom: 10}}><span>类别：</span>{MapIdentifierToSite[timespan.getNewest()[0]] ? MapIdentifierToSite[timespan.getNewest()[0]]: '默认分类'}</p>
			<p style={{marginBottom: 10}}><span>发布时间：</span>{new Date(timespan.getNewest()[1]).toLocaleDateString() + ' ' + new Date(timespan.getNewest()[1]).toLocaleTimeString()}</p>
			<p style={{textAlign: 'center', marginBottom: 10}}><Button type='primary'><a href={timespan.getNewest()[3]}>访问</a></Button></p>
		</div>;
		let oldest = <div>
			<p style={{marginBottom: 10}}><span>标题：</span>{timespan.getLatest()[2]}</p>
			<p style={{marginBottom: 10}}><span>类别：</span>{MapIdentifierToSite[timespan.getLatest()[0]] ? MapIdentifierToSite[timespan.getLatest()[0]]: '默认分类'}</p>
			<p style={{marginBottom: 10}}><span>发布时间：</span>{new Date(timespan.getLatest()[1]).toLocaleDateString() + ' ' + new Date(timespan.getLatest()[1]).toLocaleTimeString()}</p>
			<p style={{textAlign: 'center', marginBottom: 10}}><Button type='primary'><a href={timespan.getLatest()[3]}>访问</a></Button></p>
		</div>;
		let style={
			width: 1250,
			height:600,
			backgroundColor: '#FFF',
			margin: 20,
			marginTop: 50,
			borderRadius: 10,
			zIndex: 100,
			padding: 50,
			position: 'relative'
		}
		let item_style ={
				backgroundColor: '#f7f7f7',
				borderRadius: 4,
				marginBottom: 24,
				border: 0
			}
		return <div id='search' style={style}>
			<div style={{width: 10, height: 50}}></div>
			<div style={{position: 'relative', backgroundColor: '#FFF', zIndex: 200, width: 800, marginTop: -50}}>
				<p style={{fontSize: 26, marginLeft: -20, paddingTop: 10}}>搜索新闻</p>
				<Input.Search placeholder='搜索新闻...' onSearch={this.search} style={{width: 400, marginTop: 50}}></Input.Search>
				<Alert showIcon style={{width: 400, marginTop: 10}} type='info' message='输入更多关键词可以获得更准确的结果哦~'></Alert>
				<p style={{fontSize: 32, margin: 10}}>搜索结果<span style={{fontSize: 16, marginRight: 50}}>(每次只最多显示十条，点击按钮以切换)</span>&nbsp;<Button type='primary' onClick={this.changeNews}><Icon type='reload'/>reload</Button></p>
				<hr />
			</div>
			<div style={{width: 800, height: 270, marginTop: 20, overflow: 'auto'}}>
			<Collapse bordered={false} defaultActiveKey={['0']}>
				{
					this.state.renderedNews.map((item, index) => {
						return <Panel style={item_style} key={index} header={item.title}>
							<p>{item.content}</p>
							<p style={{float: 'right'}}>来源：<a href={item.url} target='_blank'>{item.source}</a></p>
							<p style={{float: 'right'}}>发布时间：{item.pub_time}</p>
							<p style={{float: 'right'}}>分类：{MapIdentifierToSite[item.identifier] ? MapIdentifierToSite[item.identifier]: '默认分类'}</p>
						</Panel>
					})
				}
			</Collapse>
			</div>
			<div style={{position: 'absolute', width: 400, height: 500, top: 280, right:-40}}>
				<p style={{fontSize: 24}}>统计:</p>
				<p style={{fontSize: 32}}>共搜索到：<span style={{backgroundColor: '#A9A9A9', color: '#FFF'}}>{this.state.news.length}</span>条</p>
				<p style={{fontSize: 28}}>横跨：<span style={{backgroundColor: '#A9A9A9', color: '#FFF'}}>{span.day}</span>天<span style={{backgroundColor: '#A9A9A9', color: '#FFF'}}>{span.hour}</span>小时<span style={{backgroundColor: '#A9A9A9', color: '#FFF'}}>{span.min}</span>分钟</p>
				<p style={{marginTop: 20}}>
					<Popover content={latest} title='最近一条'>
						<Button type='primary'>最近一条</Button>
					</Popover>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<Popover content={oldest} title='最远一条'>
						<Button type='primary'>最远一条</Button>
					</Popover>
				</p>			
			</div>
		</div>
	}
}