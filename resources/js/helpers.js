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

export function strToSlug(str) {
    if (str == "" || str == null) {
        return str;
    }

    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
