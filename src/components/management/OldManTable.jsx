
import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button, Icon } from 'antd';
import {oldpersonPostUrl, addARow, sendImgs} from '../../routes/Url';
import {getOldmanData} from "../helper/getOldman";
// import OldManTables from './OldManTables';

const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
	<EditableContext.Provider value={form}>
		<tr {...props} />
	</EditableContext.Provider>
);
let submitAndSend = false;

const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
	getInput = () => {
		if (this.props.inputType === 'number') {
			return <InputNumber />;
		}
		return <Input />;
	};
	render() {
		const {
			editing,
			dataIndex,
			title,
			inputType,
			record,
			index,
			...restProps
		} = this.props;
		return (
			<EditableContext.Consumer>
				{(form) => {
					const { getFieldDecorator } = form;
					return (
						<td {...restProps}>
							{editing ? (
								<FormItem style={{ margin: 0 }}>
									{getFieldDecorator(dataIndex, {
										rules: [{
											required: true,
											message: `Please Input ${title}!`,
										}],
										initialValue: record[dataIndex],
									})(this.getInput())}
								</FormItem>
							) : restProps.children}
						</td>
					);
				}}
			</EditableContext.Consumer>
		);
	}
}

class OldManTableA extends React.Component {
	constructor(props) {
		super(props);
		// this.state = { data:JSON.parse(localStorage.getItem('oldmanData')), editingKey: '' };
		if(localStorage.getItem("oldmanData")!==null) {
			this.state = {data: JSON.parse(localStorage.getItem("oldmanData"))}
		}else{
			this.state = {data: []}
		}
		this.columns = [
			{
				title: 'Id',
                dataIndex: 'id',
				width: '5%',
				editable: false,
			},{
				title: '姓名',
                dataIndex: 'name',
				width: '10%',
				editable: true,
			},
			{
				title: '电话',
				dataIndex: 'tel',
				width: '10%',
				editable: true,
			},{
				title: 'Gender',
                dataIndex: 'gender',
				width: '5%',
				editable: false,
			},{
                title: 'first guardian',
                dataIndex: 'first_guardian_name',
                width: '15%',
                editable: true,
            },{
				title: '第一监护人电话',
				dataIndex: 'first_guardian_tel',
				width: '10%',
				editable: true,
			},{
				title: '微笑次数',
				dataIndex: 'smile_count',
				width: '10%',
				editable: false,
			},
			{
                title: '编辑',
                width: '10%',
				render: (text, record) => {
					const editable = this.isEditing(record);
					return (
						<div>
							{editable ? (
								<span>
									<EditableContext.Consumer>
										{form => (
                                            <div>
                                                <Button
                                                    onClick={() => this.save(form, record.id)}
                                                    style={{ marginRight: 8, marginBottom: 8 }}
                                                >
                                                    Save
                                                </Button>
                                                {/* <Button /> */}
                                            </div>
										)}
									</EditableContext.Consumer>
									<Popconfirm
										title="Sure to cancel?"
										onConfirm={() => this.cancel(record.id)}
									>
										<Button>Cancel</Button>
									</Popconfirm>
								</span>
							) : (
									<Button onClick={() => this.edit(record.id)}>Edit</Button>
								)}
						</div>
					);
				},
			},{
                title: '操作',
                render: (text, record) => {
					return (
					<div>
						{/* <Button >Delete</Button> */}
						<Button type="primary" onClick={() => this.handleCollect(record.name)}><Icon type="video-camera" />采集人脸</Button>
						<Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
							<Button type="danger">Delete</Button>
						</Popconfirm>
					</div>
					);
                }
            },
		];
	}
	isEditing = (record) => {
		return record.id === this.state.editingKey;
	};
	edit = (id) => {
		this.setState({ editingKey: id });
    }

    handleDelete = id => {
        const newData = [...this.state.data];
        this.setState({ data: newData.filter(item => id !== item.id)});
	};
	
	handleSubmit = () => {
		if(submitAndSend){
			const sendLink = sendImgs+'/'+ localStorage.getItem('sendImgs');
			console.log('sendLink:'+sendLink);
			fetch(sendLink)
				.then(console.log("成功发送图片"))
				.catch( err => { console.log("发送图片失败,err:" + err) })
			submitAndSend = false;
		}
		// console.log("data:"+JSON.stringify(this.state.data));

		// console.log('老人数据'+JSON.stringify(this.state.data));
		let sendToServer = JSON.stringify(this.state.data);
		console.log('sendtoserver:'+sendToServer);
		fetch(oldpersonPostUrl,{
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify(sendToServer)
		}
			)
			.then( resp => resp.json())
			.then( data => data["valid"])
			.then( validMsg => {
				if(validMsg==='done'){
					console.log("OldmanTable:OK,服务器已经接收了数据");
					getOldmanData();
				}else{
					console.log("sorry,服务器发生未知错误");
				}
			});

	}


    handleAdd = () => {
		let newId = "00"
		if(this.state.data===null||this.state.data.length===0)
			newId += "1"
		else
			newId += String(parseInt(this.state.data[this.state.data.length-1].id) + 1) ;
        let newRow = {
            id: newId,
            name: 'unknown',
            age: 0,
            telephone: 'unknown',
            gender: 'male',
			firstguardian: 'unknown',
			phoneOfFirstGuardian: 'unknown',
		}
		// fetch(addARow)
		// .then(console.log("成功发送调用摄像头请求"))
		// .catch( err => {console.log("发送调动摄像头请求失败,error:"+err)})

		submitAndSend = true;
        if(this.state.data!==null)
        	this.setState({ data: [...this.state.data, newRow]});
	};
	
	handleCollect = (name) => {
		const sendLink = addARow + '/' + name;
		localStorage.setItem('sendImgs',name);
		fetch(sendLink)
		.then(console.log("成功发送调用摄像头请求"))
		.catch( err => console.log("发送调用摄像头请求失败,error:"+err))
	}

	save(form, id) {
		console.log('save,key'+id);
		

		form.validateFields((error, row) => {
			if (error) {
				return;
			}
            const newData = [...this.state.data];
            newData.forEach(item => console.log('item.id:'+item.id));
			const index = newData.findIndex(item => id === item.id);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});

				// let sendToServer = JSON.stringify(newData);
				// console.log('老人数据'+JSON.stringify(sendToServer));
				// fetch(oldpersonUrl,{
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type' : 'application/json'
				// 	},
				// 	mode: 'cors',
				// 	body: JSON.stringify(sendToServer)
				// }
				// 	)
				// 	.then( resp => resp.json())
				// 	.then( data => data["valid"])
				// 	.then( validMsg => {
				// 		if(validMsg==='done'){
				// 			console.log("OK,服务器已经接收了数据");
				// 		}else{
				// 			console.log("sorry,服务器发生未知错误");
				// 		}
				// 	});

				this.setState({ data: newData, editingKey: '' });
			} else {
				newData.push(this.state.data);

				// console.log('老人数据'+JSON.stringify(newData));
				// let sendToServer = JSON.stringify(newData);
				// fetch(oldpersonUrl,{
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type' : 'application/json'
				// 	},
				// 	mode: 'cors',
				// 	body: JSON.stringify(sendToServer)
				// }
				// 	)
				// 	.then( resp => resp.json())
				// 	.then( data => data["valid"])
				// 	.then( validMsg => {
				// 		if(validMsg==='done'){
				// 			console.log("OK,服务器已经接收了数据");
				// 		}else{
				// 			console.log("sorry,服务器发生未知错误");
				// 		}
				// 	});

				this.setState({ data: newData, editingKey: '' });
			}
		});
	}
	cancel = () => {
		this.setState({ editingKey: '' });
	};
	render() {
		const components = {
			body: {
				row: EditableFormRow,
				cell: EditableCell,
			},
		};

		const columns = this.columns.map((col) => {
			if (!col.editable) {
				return col;
			}
			return {
				...col,
				onCell: record => ({
					record,
					key: col.key,
					inputType: col.dataIndex === 'age' ? 'number' : 'text',
					dataIndex: col.dataIndex,
					title: col.title,
					editing: this.isEditing(record),
				}),
			};
		});

		return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{marginBottom: 16 }}>
                    Add a row
                </Button>
				<Button onClick={this.handleSubmit} type="primary" style={{marginLeft: 16, marginBottom:16}}>
					Submit
				</Button>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
s                />
            </div>
		);
	}
}

const OldManTable = Form.create()(OldManTableA);
export default OldManTable;