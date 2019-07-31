
import React from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Button, Icon} from 'antd';
import {volunteerPostUrl, employeePostUrl, addARow, sendImgs} from '../../routes/Url';
import {getEmployeeData} from '../helper/getEmployee'
import {getVolunteerData} from "../helper/getVolunteer";

const FormItem = Form.Item;
const EditableContext = React.createContext();
var sendUrl = "";
let tableData = "";
let submitAndSend = false;

const EditableRow = ({ form, index, ...props }) => (
	<EditableContext.Provider value={form}>
		<tr {...props} />
	</EditableContext.Provider>
);

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

class InfoTable extends React.Component {
	constructor(props) {
		super(props);
		// if(this.props.data!==null){
		// 	this.state = { data:tableData, editingKey: '' };
		// }else{
		// 	this.state = { data:[], editingKey: '' }
		// }
		if(this.props.character==='1'){
			tableData = JSON.parse(localStorage.getItem("volunteerData"));
		}else{
			tableData = JSON.parse(localStorage.getItem( "employeeData"));
		}
		if(tableData === null)
			this.state = {data:[], editingKey:''}
		else{
			this.state = {data:tableData, editingKey:''}
		}
		this.columns = [
			{
				title: 'Id',
                dataIndex: 'id',
                key: 'id',
				width: '10%',
				editable: true,
			},{
				title: 'Name',
                dataIndex: 'name',
                key: 'name',
				width: '15%',
				editable: true,
			},
			{
				title: 'Age',
                dataIndex: 'age',
                key: 'age',
				width: '15%',
				editable: true,
			},
			{
				title: 'Telephone',
				dataIndex: 'tel',
				width: '20%',
				editable: true,
			},{
				title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
				width: '10%',
				editable: false,
			},
			{
				title: 'operation',
				dataIndex: 'operation',
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
                                                    style={{ marginRight: 8 }}
                                                >
                                                    Save
                                                </Button>
                                                {/* <Button
                                                    onClick={() => this.handleDelete(record.id)}
                                                    style={{ marginRight: 8 }}
                                                >
                                                    Delete
                                                </Button> */}
                                                <Button />
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
                title: '删除',
                dataIndex: 'deleteOperation',
                key: 'deleteOperation',
                render: (text, record) => {
					return (
					<div>
						<Button type="primary" onClick={() => this.handleCollect(record.name)}><Icon type="video-camera" />采集人脸</Button>
						{/* <Button >Delete</Button> */}
						<Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
							<Button type="danger">Delete</Button>
						</Popconfirm>
					</div>
					);
                }
            },
		];
	}

	componentDidMount() {
		getEmployeeData();
		getVolunteerData();
	}
	//
	// componentWillUpdate(){
	// 	getEmployeeData();
	// 	getVolunteerData();
	// 	if(this.props.character==='1'){
	// 		tableData = JSON.parse(localStorage.getItem('volunteerData'))
	// 		this.setState({data:tableData})
	// 	}else{
	// 		tableData = JSON.parse(localStorage.getItem('employeeData'))
	// 		this.setState({data:tableData})
	// 	}
	//
	// }


	isEditing = (record) => {
		return record.id === this.state.editingKey;
	};
	edit(id) {
		this.setState({ editingKey: id });
	}
	
    handleDelete = id => {
        const newData = [...this.state.data];
        this.setState({ data: newData.filter(item => id !== item.id)});
	};

	handleAdd = () => {
        const newRow = {
            id: '00000',
            name: 'unknown',
            age: 0,
            telephone: 'unknown',
            gender: 'male',
        }
        this.setState({ data: [...this.state.data, newRow]});
	};

	handleSubmit = () => {
		if(this.props.character==='1'){
			console.log("is volunteer");
			sendUrl = volunteerPostUrl;
		}else if(this.props.character==='2'){
			console.log("is employee")
			sendUrl = employeePostUrl;
		}else{
			console.log("Send Url error");
		}

		if(submitAndSend){
			const sendLink = sendImgs+'/'+ localStorage.getItem('sendImgs');
			console.log('sendLink:'+sendLink);
			fetch(sendLink)
				.then(console.log("成功发送图片"))
				.catch( err => { console.log("发送图片失败,err:" + err) })
			submitAndSend = false;
		}

		let sendToServer = JSON.stringify(this.state.data);
		console.log('info-table:sendToServer:'+sendToServer);
		fetch(sendUrl,{
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
					console.log("Infotable:OK,server accepted");
					getEmployeeData();
					getVolunteerData();
					setTimeout(this.updateTable,2000)
				}else{
					console.log("sorry,server error");
				}
			})
			.catch (err => console.log(err));
	}

	updateTable = () => {
		if(this.props.character==='1'){
			tableData = JSON.parse(localStorage.getItem('volunteerData'))
			this.setState({data:tableData})
		}else{
			tableData = JSON.parse(localStorage.getItem('employeeData'))
			this.setState({data:tableData})
		}
	}

	handleCollect = (name) => {
		const sendLink = addARow + '/' + name;
		localStorage.setItem('sendImgs',name);
		submitAndSend = true;
		fetch(sendLink)
			.then(console.log("成功发送调用摄像头请求"))
			.catch( err => console.log("发送调用摄像头请求失败,error:"+err))
	}

	// updateTable() {
	// 	getEmployeeData();
	// 	getVolunteerData();
	// 	if(this.props.character==='1'){
	// 		tableData = JSON.parse(localStorage.getItem('volunteerData'))
	// 		this.setState({data:tableData})
	// 	}else{
	// 		tableData = JSON.parse(localStorage.getItem('employeeData'))
	// 		this.setState({data:tableData})
	// 	}
	// }
	
	save(form, id) {

		form.validateFields((error, row) => {
			if (error) {
				return;
			}
            const newData = [...this.state.data];
			const index = newData.findIndex(item => id === item.id);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				this.setState({ data: newData, editingKey: '' });
			} else {
				newData.push(this.state.data);
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
				/>
			</div>
		);
	}
}

export default InfoTable;