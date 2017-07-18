import React, { Component } from 'react';
import { BackTop } from 'antd';
import TaskChoice from '../Filter/Filter';
import SearchBox from '../Summer/Summer';
import TaskList from '../Task/Task';
import Header from '../Header/Header';
import Showller from '../Showller/Showller';
// 让App维持一个自己的状态，持有子组件的内容，并且及时刷新子组件
export default class App extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			refreshTask: false
		}
	}
	changeTaskStatus = () => {
		this.setState({refreshTask: true})
	}
	changeToInitial = () => {
		this.setState({
			refreshTask: false
		})
	}
	render() {
		return <div>
			<BackTop />
			<Header />
			<TaskChoice changeTask={this.changeTaskStatus}/>
			<TaskList status={this.state.refreshTask} changeToInitial={this.changeToInitial}/>
			<SearchBox />
			<Showller />	
		</div>
	}
}



