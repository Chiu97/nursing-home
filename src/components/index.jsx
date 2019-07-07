/**
 * 路由组件出口文件
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import OldManTable from './management/OldManTables';
import Volunteer from './management/Volunteers';
import Dashboard from './dashboard/Dashboard';
import Modify from './personalInfo/Modify';

const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    OldManTable, Dashboard, Volunteer, Modify, WysiwygBundle
}