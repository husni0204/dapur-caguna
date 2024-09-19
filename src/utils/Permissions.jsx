import Cookies from 'js-cookie';

const hasAnyPermission = (permissions) => {
    //get permissions from cookies
    let allPermissions = JSON.parse(Cookies.get('permissions'));

    let hasPermission = false;

    permissions.forEach(function (item) {
        if (allPermissions[item]) hasPermission = true;
    });

    return hasPermission;
};

export default hasAnyPermission;
