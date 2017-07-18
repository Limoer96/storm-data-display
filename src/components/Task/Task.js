import React, { Component } from 'react';
import { Table, Icon, Popover, Button } from 'antd';
import { getSplitTask, translateTasks } from '../../public/util.js';
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
const INIT_TASKS = [
	{	
		key: '0',
		message: '这是一个示例的任务',
		create_time: '06-26 2017',
		status: 'bell'
	}
]

// 三种状态分别是 bell loading check
// 把task设置成为一个列表

const columns = [
	{
		title: '任务名称',
		dataIndex: 'message',
		key: 'message',
		render: text => <Popover title='更多信息' content={<p>暂时的占位符</p>}><Button>{text}</Button></Popover>
	},
	{
		title: '提交时间',
		dataIndex: 'create_time',
		key: 'create_time',
	},
	{
		title: '状态',
		dataIndex: 'status',
		key: 'status',
		render: text => <span><Icon style={{fontSize: 16}} type={text}/></span>
	}
]


export default class TaskList extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			tasks: INIT_TASKS
		}
	}
	getTasks = () => {
		fetch('http://localhost:3000/tasks/all', {method: 'get', mode: 'cors'}).then((res) => {
			return res.json();
		}).then((json) => {
			this.setState({
				tasks: translateTasks(json)
			})
		})
	}
	componentDidMount() {
		this.getTasks(); // 获取所有任务
	}
	// 组件只会mount一次，但是可以被更新多次，所以逻辑都写在componentDidMount
	componentDidUpdate() {
		let { changeToInitial, status } = this.props;
		if(status) {
			this.getTasks(); // 重新加载数据
			changeToInitial(); // 重新置状态为false
		}
	}

	render() {
		let style={
			width: 1250,
			backgroundColor: '#FFF',
			margin: 20,
			marginTop: 50,
			borderRadius: 10,
			zIndex: 100,
			position: 'relative',
			height: 600
		}
		let splitValues = getSplitTask(this.state.tasks);
		return <div id='task' style={style}>
			<div style={{width: 10, height: 50}}></div>
			<p style={{fontSize: 26, paddingLeft: 50, paddingTop: 10}}>查看任务</p>
			<div style={{padding: 30, width: 1000}}>
				<Table columns={columns} pagination={{pageSize: 5}} dataSource={this.state.tasks}/>
			</div>
			<div style={{position: 'absolute', top: 120, right: 20, width: 200}}>
				<p style={{fontSize: 32}}>统计：</p>
				<p style={{fontSize: 24, paddingTop: 20}}>任务数量：<span style={{backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3}}>&nbsp;{this.state.tasks.length}&nbsp;</span></p>
				<p style={{fontSize: 28, paddingTop: 20}}>其中：</p>
				<ul style={{margin: 0, padding: 0, listStyle: 'none', fontSize: 0, borderRadius: 5, backgroundColor: 'rgba(211, 211, 211, 0.1)'}}>
					<li style={{fontSize: 24}}>待完成：<span style={{backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3}}>&nbsp;{splitValues.init}&nbsp;</span></li>
					<li style={{fontSize: 24}}>正执行：<span style={{backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3}}>&nbsp;{splitValues.running}&nbsp;</span></li>
					<li style={{fontSize: 24}}>完成：<span style={{backgroundColor: '#A9A9A9', color: '#FFF', borderRadius: 3}}>&nbsp;{splitValues.complete}&nbsp;</span></li>
				</ul>
			</div>
		</div>
	}
}
