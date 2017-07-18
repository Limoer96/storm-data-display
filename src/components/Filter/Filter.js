import React, { Component } from 'react';
import { Tabs, Card, Button, Spin, Modal, Form, Input, message } from 'antd';
let TabPane = Tabs.TabPane;
let FormItem = Form.Item;
import './Filter.css';


const INIT_SITES = [
	{
		name: '腾讯新闻',
		subjects: [['主题1', 'Aa', false], ['主题2', 'Ab', false], ['主题3', 'Ac', false], ['主题4', 'Ad', false]]
	},
	{
		name: '网易新闻',
		id: 'wangyi163',
		subjects: [['国际消息', 'Ba', false], ['国内要闻', 'Bb', false], ['财经在线', 'Bc', false],['娱乐新天地', 'Bd', false], ['劲爆体育', 'Be', false]]
	},
	{
		name: '新浪新闻',
		id: 'sina',
		subjects: [['国内', 'Ca', false], ['国际', 'Cb', false], ['社会','Cc', false], ['体育', 'Cd', false], ['娱乐', 'Ce', false], ['军事', 'Cf', false], ['财经', 'Cg', false], ['股票', 'Ch', false]]
	},
	{
		name: '今日头条',
		id: 'toutiao',
		subjects: [['热点', 'Da', false], ['视频', 'Db', false], ['段子', 'Dc', false], ['社会', 'Dd', false], ['娱乐', 'De', false], ['科技', 'Df', false]]
	}
]

export default class TaskChoice extends Component {
	constructor( props ) {
		super( props );
		this.state = {
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
		}
	}

	componentDidMount(){
		fetch('http://localhost:3000/rules/get/all', {method: 'get', mode: 'cors'}).then((res) => {
			return res.json();
		}).then((json) => {
			this.setState({sites: json});
		}).catch((err) => {
			console.log(err.message);
		});
	}

	btnClick = (e) => {
		e.preventDefault();
		let datas = e.target.dataset;
		let identifier = datas.info;
		let desc = `${datas.site}/${datas.subject}`;
		fetch(`http://localhost:3000/tasks/${identifier}/post/?desc=${desc}`, { method: 'get', mode: 'cors'}).then((res) => {
			return res.json();
		}).then((json) => {
			console.log(json);
			if(json.status === 'ok!'){
				console.log('ok!');
				message.success('新建任务成功！');
			}else if(json.status === 'more'){
				message.warning('单次任务只能创建一次主题下的任务!');
			}else{
				message.error('创建任务失败！');
			}
		});
	}
	handleOk = (e) => {
		e.preventDefault();

		let data = JSON.stringify({
			root: this.state.root,
			title_rule: this.state.title,
			content_rule: this.state.content,
			pub_time_rule: this.state.time,
			source_rule: this.state.source,
			website_name: this.state.site,
			country: this.state.country,
			channel_name: this.state.channel,
			link_rule: this.state.link,
			second_link_rule: this.state.secondLink
		})
		fetch(`http://localhost:3000/rules/${this.state.id}/edit`,
		 {
			method: 'POST', 
			mode: 'cors',
			headers: {'content-type': 'application/json'},
			body: data
		 }).then((res) => {
		 	return res.json();
		 }).then((json) => {
		 	if(json.message === 'ok!'){
		 		message.success('模板修改成功！');
		 	}
		 	this.setState({
				visible: false
			})
		 }).catch((err) => {
		 	console.log(err);
		 	message.error('修改模板失败！');
		 })
	}
	handleCancel = (e) => {
		this.setState({
			visible: false
		})
	}
	showModal = (e) => {
		e.preventDefault();
		let id = e.target.dataset.id;
		fetch(`http://localhost:3000/rule/${id}/get`, {method: 'get', mode: 'cors'}).then((res) => {
			return res.json();
		}).then((json) => {
			this.setState({
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
			message.success('获取数据成功！');
			console.log(this.state.rule);
		})
	}
	render() {
		return <div id='templete' style={{paddingTop: 50, width: 1250, backgroundColor: '#fff', borderRadius: 10, margin: 20, marginTop: 90}}>
			<p style={{fontSize: 26, paddingLeft: 50, marginTop: -10, marginBottom: 10}}>选择模板/任务</p>
			<Tabs defaultActiveKey='1' tabPosition='left' style={{height: 680}}>
				{
					this.state.sites.map((site, index_) => {
						var subjects = site.subjects.map((subject, index) => {
							return <Card title={subject[0]} key={subject[1]} style={{width: 300, float: 'left', marginLeft: 50, marginTop: 20, textAlign: 'center'}} extra={<Button data-info={subject[1]} data-site={site.name} data-subject={subject[0]} loading={this.state.loading} onClick={this.btnClick}>选择</Button>}>
								<p>你将要选择:{site.name}/{subject[0]}</p>
								<p>点击选择将添加到待抓取任务</p>
								<p>XX新闻XX主题是...一段待描述性的语句</p>
								<Button data-id={subject[1]} style={{marginTop: 10}} size='large' type='primary' onClick={this.showModal}>修改配置</Button>
							</Card>
							
						});
						return <TabPane tab={site.name} key={index_ + 1}>
							<div className='tab-items' style={{width: 1200, overflow: 'auto'}}>
								{subjects}
							</div>
						</TabPane>
					})
				}
				
			</Tabs>
			<Modal 
				title='修改配置' 
				visible={this.state.visible}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
			>
				<div>WebsiteName<Input disabled={true}
					style={{marginBottom: 16}} 
					value={this.state.site || ''} 
					onChange={(e) => this.setState({site: e.target.value})}/>
				</div>
				<div>Country<Input  
					style={{marginBottom: 16}} 
					value={this.state.country || ''}
					onChange={(e) => this.setState({country: e.target.value})}/>
				</div>
				<div>ChannelName<Input  
					style={{marginBottom: 16}} 
					value={this.state.channel || ''}
					onChange={(e) => this.setState({channel: e.target.value})}/>
				</div>
				<div>RootURL<Input 
					style={{marginBottom: 16}} 
					value={this.state.root || ''}
					onChange={(e) => this.setState({root: e.target.value})}/>
				</div>
				<div>ContentPath<Input 
					style={{marginBottom: 16}} 
					value={this.state.content || ''}
					onChange={(e) => this.setState({content: e.target.value})}/>
				</div>
				<div>SourcePath<Input 
					style={{marginBottom: 16}} 
					value={this.state.source || ''}
					onChange={(e) => this.setState({source: e.target.value})}/>
				</div>
				<div>DateTimePath<Input  
					style={{marginBottom: 16}} 
					value={this.state.time || ''}
					onChange={(e) => this.setState({time: e.target.value})}/>
				</div>
				<div>TitlePath<Input 
					style={{marginBottom: 16}} 
					value={this.state.title || ''}
					onChange={(e) => this.setState({title: e.target.value})}/>
				</div>
				<div>LinkPath<Input 
					style={{marginBottom: 16}} 
					value={this.state.link || ''}
					onChange={(e) => this.setState({link: e.target.value})}/>
				</div>
				<div>SecondLinkPath<Input 
					style={{marginBottom: 16}} 
					value={this.state.secondLink || ''}
					onChange={(e) => this.setState({secondLink: e.target.value})}/>
				</div>
			</Modal>
		</div>
	}
	
}

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



























