//刷新时调用load函数渲染页面
load();
let todo = document.getElementById('title')
todo.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		//获取本地存储数据
		let local = getData()
		// console.log(local);
		//把local数组进行更新数据，把最新的数据追加给local数组，用unshift（）将数据加到数组开头
		local.unshift({title: this.value, done: false})
		//清空输入框文本
		todo.value=''
		//把local数组存储给本地存储
		saveData(local)
		//todolist本地存储渲染加载到页面
		load();
		
	}
})

//读取本地存储
function getData() {
	let data = localStorage.getItem("todolist");
	if (data !== null) {
		return JSON.parse(data); //将数组转换为对象
	} else {
		// console.log('已经取了');
		return [];
		
	}
}

//保存本地存储数据
function saveData(data) {
	localStorage.setItem("todolist", JSON.stringify(data)); //将对象转换为数组
}


//渲染加载数据
function load() {
	//读取本地存储
	let data = getData();
	// console.log(data);
	//存储list数量
	let todocount = 0;
	let donecount = 0;
	//获取DOM元素
	let ol = document.getElementsByTagName('ol')[0];
	let ul = document.getElementsByTagName('ul')[0];
	let doneCount = document.getElementById('donecount');
	let todoCount = document.getElementById('todocount')
	//遍历之前先清空ol里面的元素内容
	while (ol.hasChildNodes()) {
		ol.removeChild(ol.firstChild)
	}
	while (ul.hasChildNodes()) {
		ul.removeChild(ul.firstChild)
	}
	//遍历数组
	data.forEach(function (item, index) {
		//创建并添加li
		let li = document.createElement('li');
		
		
		//创建并添加复选框、p以及a
		let input = document.createElement('input');
		input.type = 'checkbox';
		input.checked = item.done;
		input.addEventListener('click', checkboxListener)
		let p = document.createElement('p');
		p.innerText = item.title;
		let a = document.createElement('a');
		a.href='javascript:;';
		a.setAttribute('id',index.toString())
		a.addEventListener('click',deleteListener)
		li.appendChild(input)
		li.appendChild(p)
		li.appendChild(a)
		if(item.done){
			ul.appendChild(li);
			donecount++;
		}else{
			ol.appendChild(li);
			todocount++;
		}
		todoCount.innerText = todocount;
		doneCount.innerText = donecount;
	})
}

function deleteListener() {
	// console.log(this)
	// 先获取本地存储
	let data = getData();
	// 修改数据
	let index = this.id;
	data.splice(parseInt(index),1)
	// 保存到本地存储
	saveData(data);
	// 重新渲染页面
	load();
}

function checkboxListener() {
	//获取本地数据
	let data = getData();
	// // 修改数据
	let index = this.parentNode.lastChild.id;
	// console.log(this.checked);
	data[parseInt(index)].done = this.checked
	// console.log(data[parseInt(index)].done);
	// // 保存到本地存储
	saveData(data);
	// // 重新渲染页面
	load();
}




