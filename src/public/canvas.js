// 使用的数据格式最好是['identifier', 'number'], 如果data是排序过的的话, 从大到小的排列, 坐标确定的问题
function draw(ctx, canvas, data){
	ctx.fillStyle = 'lightgray';
	ctx.beginPath();
	let length = data.length;
	let span = data[0][1] - data[length - 1][1]; // 数量跨度
	ctx.moveTo(0, 200);

}