// 工具函数


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

const mapIdentifierToName = {
	'Aa': '体育',
	'Ab': '国内',
	'Ac': '国际',
	'Ad': '热点',
	'Ae': '财经',
	'Af': '游戏',
	'Ag': '其他分类'
}



// 初次存储的格式为[['id', timestamp]]

export class MeasureTime {
	constructor(data) {
		this.data = data;
		this.time_s = [];
	}
	init() {
		for(let item of this.data) {
			this.time_s.push([item.identifier, new Date(item.pub_time).getTime(), item.title, item.url])
		}
		// 按时间戳排序
		this.time_s.sort((item1, item2) => {
			return item1[1] < item2[1];
		})
		return this;
	}
	// 获取新闻最长间隔
	getTimeSpan() {
		let newest = this.time_s[this.time_s.length-1];
		let latest = this.time_s[0];
		let span = (latest[1] - newest[1])/1000;
		// console.log(span);
		// 格式化时间
		let day = Math.floor(span / (24 * 3600));
		let hour = Math.floor((span - day * 24 * 3600) / 3600);
		let min = Math.floor((span - day * 24 * 3600 - hour * 3600) / 60);
		let sec = span - day * 24 * 3600 - hour * 3600 - min * 60;
		return {
			day,
			hour,
			min,
			sec
		}

	}
	getNewest() {
		return this.time_s[0];
	}
	getLatest() {
		return this.time_s[this.time_s.length-1];
	}

}
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

export class MeasureContent {
	constructor(data) {
		this.data = data;
		this.total = 0;
		this.countList = [];
		this.specialList = [];
		this.siteList = [];
	}
	init() {
		for(let item of this.data){
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
	}
	getAllCount() {
		for(let item of this.countList) { 
			this.total += item[1];
		}
		return this.total;
	}
	getIdentifierCount() {
		return this.countList;
	}
	getSpeciaList() {
		return this.specialList;
	}

	// 如何构建这样的一个数据结构呢？[site_id, number, [[id, number], [id, number], []]]

	splitBySite() {
		// 数据整形，切分为站点标识
		// console.log(this.countList.length);
		let colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
		for( let item of this.countList ) {
			this.siteList.push([item[0].slice(0, 1), item[1], item[0], [{name: mapIdentifierToName[item[0]], ux: item[1], fill: colors[(Math.random()*7).toFixed(0)]}]]);
		}
		let tempList = [];
		let temp = this.siteList[0];
		for(let i = 1; i < this.siteList.length; i++){
			if(temp[0] === this.siteList[i][0]){
				temp[1] += this.siteList[i][1];
				temp[3].push({name: mapIdentifierToName[this.siteList[i][2]],ux: this.siteList[i][1], fill: colors[(Math.random()*7).toFixed(0)]});
			}else{
				tempList.push(temp);
				temp = this.siteList[i];
			}
		}
		tempList.push(temp);
		return tempList;
	}
}
export function getSplitTask (data) {
	let temp = {
		init: 0,
		running: 0,
		complete: 0
	}
	for (let item of data) {
		if(item.status === 'bell'){
			temp.init += 1;
		}else if (item.status === 'loading'){
			temp.running += 1;
		}else{
			temp.complete += 1;
		}
	}
	return temp;
}

let mapServerStatusToFrontEnd = {
	initial: 'bell',
	running: 'loading',
	complete: 'check'
}


export function translateTasks (data) {
	let temp = [];
	for (let item of data) {
		let date = new Date(item.post_time);
		temp.push({
			key: item.id,
			message: item.desc,
			create_time: date.toLocaleDateString() + date.toLocaleTimeString(),// 一个时间对象
			status: mapServerStatusToFrontEnd[item.status]
		})
	}
	return temp;
}











