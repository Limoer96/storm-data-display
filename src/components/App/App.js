import React, { Component } from 'react';
import TaskChoice from '../Filter/Filter';
import SearchBox from '../Summer/Summer';
import TaskList from '../Task/Task';
import Header from '../Header/Header';
import Showller from '../Showller/Showller';
export default class App extends Component {
	
	render() {
		return <div>
			<Header />
			<TaskChoice />
			<TaskList />
			<SearchBox />
			<Showller />	
		</div>
	}
}


