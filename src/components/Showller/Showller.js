import React, { Component } from 'react';
import { Popover, Collapse } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MeasureContent } from '../../public/util.js';
const Panel = Collapse.Panel;
// 这是一个待完成的映射表
const MapIdentifierToSite = {
	'Aa': '腾讯新闻-财经',
	'Ba': '新浪新闻-国际',
    'Bb': '新浪-国内',
    'Ab': '腾讯-体育',
    'Cd': '网易新闻-XX'
}

const MapSiteIdentifierToSiteName = {
    'A': '腾讯新闻',
    'B': '网易新闻',
    'C': '今日头条'
}


// 这是模拟从后台拿到的数据
const INIT_DATA = [
    {
        "id": 1,
        "content": "这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容",
        "title": "测试,这是title",
        "source": "limoer的日志",
        "pub_time": "2017-07-02T09:10:56.000Z",
        "url": "http://www.limoer.cc",
        "identifier": "Aa",
        "COUNT(*)": 2
    },
    {
        "id": 3,
        "content": "内容三",
        "title": "测试测试",
        "source": "好吧",
        "pub_time": "0000-00-00 00:00:00",
        "url": "baidu.com",
        "identifier": "Ab",
        "COUNT(*)": 2
    },
    {
        "id": 4,
        "content": "内容三",
        "title": "测试测试",
        "source": "好吧",
        "pub_time": "0000-00-00 00:00:00",
        "url": "baidu.com",
        "identifier": "Ba",
        "COUNT(*)": 2
    },
    {
        "id": 6,
        "content": "内容三",
        "title": "测试测试",
        "source": "好吧",
        "pub_time": "0000-00-00 00:00:00",
        "url": "baidu.com",
        "identifier": "Bb",
        "COUNT(*)": 1
    },
    {
        "id": 5,
        "content": "内容三",
        "title": "测试测试",
        "source": "好吧",
        "pub_time": "0000-00-00 00:00:00",
        "url": "baidu.com",
        "identifier": "Cd",
        "COUNT(*)": 2
    }
];

export default class Showller extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			contents: INIT_DATA
		}
	}

    componentDidMount() {
        fetch('http://localhost:3000/contents/countbyidentifier', {method: 'get', mode: 'cors'}).then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({
                contents: json
            })
        })
    }


	render() {
		let content = new MeasureContent(this.state.contents);
        content.init();
        let list = content.splitBySite();
        console.log(list);
        let speciaList = content.getSpeciaList(); // 最终每个主题展示一次
		let style={
			width: 1250,
			height:600,
			backgroundColor: '#FFF',
			margin: 20,
			borderRadius: 10,
			zIndex: 100,
			overflow: 'auto',
			padding: 50,
            position: 'relative'
		}
		return <div id='show' style={style}>
			<div>
				<p style={{fontSize: 26, marginLeft: -20, paddingTop: 10}}>统计数据</p>
			</div>
			<div style={{fontSize: 24}}>
				<p style={{fontSize: 32}}>数量</p>
				<p>当前新闻总量：<span style={{backgroundColor: '#A9A9A9'}}>&nbsp;{content.getAllCount()}&nbsp;</span></p>
			</div>
            <div style={{width: '100%', height: 300, marginTop: 40}}>
                <div style={{width: '49%', height: 300, float: 'left', backgroundColor: 'rgba(211, 211, 211, 0.1)', borderRadius: 7}}>
                    {
                        list.map((item, index) => {
                            return <Popover key={index + 40} 
                                title={MapSiteIdentifierToSiteName[item[0]]?MapSiteIdentifierToSiteName[item[0]]: '未知分类'} 
                                content={
                                    <BarChart width={400} height={270} data={item[3]}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                        <XAxis dataKey='name'/>
                                        <YAxis/>
                                        <CartesianGrid strokeDasharray='3 3'/>
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey='ux' fill='#8884d8'/>
                                    </BarChart>
                                }
                                >
                                <div className='site-box' key={index + 1000} style={{width: 80, height: 80, textAlign: 'center', borderRadius: 4, backgroundColor: '#D3D3D3', float:'left', marginLeft: 40, marginTop: 10}}>
                                    <p style={{fontWeight: 'bold', fontSize: 14, paddingTop: 5}}>{MapSiteIdentifierToSiteName[item[0]]?MapSiteIdentifierToSiteName[item[0]]: '未知分类'}</p>
                                    <p style={{fontSize: 32}}>{item[1]}</p>
                                </div>
                            </Popover>
                        })
                    }
                </div>
                <div style={{width: '49%', height: 300, float: 'left', marginLeft: '2%', borderRadius: 7, backgroundColor: 'rgba(211, 211, 211, 0.1)', overflow: 'auto'}}>
                    <h2 style={{marginBottom: 10, marginLeft: 10, marginTop: 10}}>部分新闻展示</h2>
                    <div style={{width: 500, marginLeft: 30}}><Collapse>
                        {
                            speciaList.map((item, index) => {
                                return <Panel header={MapIdentifierToSite[item.identifier]? MapIdentifierToSite[item.identifier] : '默认或者并未分组新闻'+ '--------' + item.title} key={index + 5678}>
                                    <p style={{fontSize: 14, fontWeight: 'bold'}}>{item.title}</p>
                                    <p style={{textIndent: 8}}>
                                        {item.content}
                                    </p>
                                    <p style={{margin: 10, float: 'right'}}>来源：<span><a href={item.url}>{item.source}</a></span>&nbsp;&nbsp;&nbsp; 时间：<span>{item.time}</span></p>
                                </Panel>
                            })
                        }
                    </Collapse>
                    </div>
                </div>
            </div>
		</div>
	}
}