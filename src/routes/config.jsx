export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'appstore', component: 'MyDashboard' },
        {key: '/app/personalInfo/modify', title: '个人信息', icon: 'form', component: 'Modify'},
        {
            key: '/app/management', title: '管理信息', icon: 'rocket',
            subs: [
                {key: '/app/management/oldManTable', title:'老人信息管理', component: 'OldManTable'},
                {key: '/app/management/volunteer', title:'义工信息管理', component: 'Volunteer'},
                {key: '/app/management/employee', title:'工作人员信息管理', component: 'Employees'},
            ]
        },
    ],
    others: [] // 非菜单相关路由
}