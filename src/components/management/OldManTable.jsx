
import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd';
// import OldManTables from './OldManTables';

const FormItem = Form.Item;
const EditableContext = React.createContext();

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

class OldManTableA extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data:props.data, editingKey: '' };
		this.columns = [
			{
				title: 'Id',
                dataIndex: 'id',
				width: '15%',
				editable: true,
			},{
				title: '姓名',
                dataIndex: 'name',
				width: '15%',
				editable: true,
			},
			{
				title: 'Age',
                dataIndex: 'age',
				width: '5%',
				editable: true,
			},
			{
				title: '电话',
				dataIndex: 'telephone',
				width: '10%',
				editable: true,
			},{
				title: 'Gender',
                dataIndex: 'gender',
				width: '5%',
				editable: false,
			},{
                title: 'Firstguardian',
                dataIndex: 'firstguardian',
                width: '5%',
                editable: true,
            },{
				title: '第一监护人电话',
				dataIndex: 'phoneOfFirstGuardian',
				width: '10%',
				editable: true,
			},
			{
                title: 'Operation',
                dataIndex: 'operation',
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
                title: '删除',
                dataIndex: 'deleteOperation',
                key: 'deleteOperation',
                render: (text, record) => {
					return (
					<div>
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
		console.log("data:"+JSON.stringify(this.state.data));
	}

    handleAdd = () => {
        const newRow = {
            id: '00000',
            name: 'unknown',
            age: 0,
            telephone: 'unknown',
            gender: 'male',
			firstguardian: 'unknown',
			phoneOfFirstGuardian: 'unknown',
        }
        this.setState({ data: [...this.state.data, newRow]});
    };

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
s                />
            </div>
		);
	}
}

const OldManTable = Form.create()(OldManTableA);
export default OldManTable;