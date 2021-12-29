export const adminMenu = [
    { //Quản lí người dùng
        name: 'menu.system.header', menus: [
            // Quản Lí Người Dùng
            { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage', },
            // Quản Lí gói
            { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage', },
            // Đăng Kí Tài Khoản Bằng redux
            { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/crud-redux', },
            // Quản Lí thông tin bác sĩ
            { name: 'menu.system.system-administrator.manager-doctor', link: '/system/managerDoctor', },
        ],
    },
    { //Phòng Bệnh
        name: 'menu.system.headerTitle2', menus: [
            { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        ],
    },
    { //Chuyên Khoa
        name: 'menu.system.headerTitle3', menus: [
            // Tạo chuyên ngành khám bệnh
            { name: 'menu.system.system-administrator.medical-specailty', link: '/system/manage-specialty' },
            // Tạo Tư vấn từ xa
            { name: 'menu.system.system-administrator.consultation', link: '/system/manage-consultation' },
            // Quản Lí Hồ Sơ Tư Vấn
            { name: 'menu.system.system-administrator.manage-profile-consultant', link: '/system/manage-profile-consultation' },
        ],
    },
    { //Cẩm Nang
        name: 'menu.system.headerTitle4', menus: [
            // Cẩm Nang
            { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        ],
    },
    { //Lịch Khám
        name: 'menu.system.headerTitle5', menus: [
            // Lịch Khám
            { name: 'menu.system.system-administrator.appointment', link: '/system/doctor-manage-appointment' },
        ],
    },
];
export const doctorMenu = [

    { //Phòng Bệnh
        name: 'menu.system.headerTitle2', menus: [
            { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        ],
    },

];