import React from 'react';
import { Menu, Icon } from 'antd';
export default class Header extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			current: 'templete'
		}
	}
	click = (e) => {
		this.setState({
			current: e.key
		});
	}
	render() {
		return <div style={{padding: 0, position: 'fixed', top: 0, zIndex: 300, width: '100%'}}>	
			<Menu 
				mode="horizontal" 
				style={{fontSize: 16}}
				onClick={this.click}
				selectedKeys={[this.state.current]}
				>
				<div style={{float: 'left', marginLeft: 10, fontSize: 20}}><a href='#'>基于Storm的分布式数据采集</a></div>
				<Menu.Item style={{marginLeft: 300}} key='templete'><a href='#templete'>模板</a></Menu.Item>	
				<Menu.Item key='tasks'><a href='#task'>任务</a></Menu.Item>
				<Menu.Item key='search'><a href='#search'>搜索</a></Menu.Item>
				<Menu.Item key='showller'><a href='#show'>数据</a></Menu.Item>
			</Menu>
		</div>	
	}
	
}




