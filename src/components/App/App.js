import React, { Component } from 'react';
import { BackTop } from 'antd';
import TaskChoice from '../Filter/Filter';
import SearchBox from '../Summer/Summer';
import TaskList from '../Task/Task';
import Header from '../Header/Header';
import Showller from '../Showller/Showller';
export default class App extends Component {
	
	render() {
		return <div>
			<BackTop />
			<Header />
			<TaskChoice />
			<TaskList />
			<SearchBox />
			<Showller />	
		</div>
	}
}



