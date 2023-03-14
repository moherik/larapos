import { isArray } from "lodash";

export function can(permission, permissionList) {
    if (permission == "all") {
        return true;
    }

    const list = Object.values(permissionList);

    if (isArray(permission)) {
        return permission.some((a) => list.findIndex((b) => b.name == a) != -1);
    }

    return list.findIndex((val) => val.name == permission) != -1;
}
