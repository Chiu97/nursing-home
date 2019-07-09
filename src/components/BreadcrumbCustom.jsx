import { Link } from 'react-router-dom';
import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import keepExec from './helper/keepExec'

class BreadcrumbCustom extends React.Component {
    testKeep = (sec) => {
        // keepExec(sec);
    }

    render() {
        const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        return (
            <span>
                <Breadcrumb style={{ margin: '12px 0' }}>
                {this.testKeep(10)}
                    <Breadcrumb.Item><Link to={'/app/dashboard/index'}>Home<Icon type="home"/></Link></Breadcrumb.Item>
                        {first}
                        {second}
                </Breadcrumb>
            </span>
        )
    }
}

export default BreadcrumbCustom;