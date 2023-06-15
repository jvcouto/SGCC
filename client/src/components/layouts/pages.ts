import USER_ROLES from "../../ultis/constants/userRoles";

const SYSTEM_PAGES = Object.freeze({
  periods: {
    label: "Período",
    path: "/dashboard/periods",
    key: "periods",
  },
  courses: {
    label: "Cursos",
    path: "/dashboard/courses",
    key: "courses",
  },
  departament: {
    label: "Departamentos",
    path: "/dashboard/departaments",
    key: "departament",
  },
  settings: {
    label: "Minha conta",
    path: "/dashboard/settings/email",
    key: "config",
  },
});

const getSelectedKey = (path: string) => {
  if (!path) return "config";

  return SYSTEM_PAGES[path].key;
};

const getRolePages = (userRoles: number[]) => {
  if (!userRoles || !userRoles.length) return [];

  const pages = [];

  if (userRoles.includes(USER_ROLES.TEACHER)) {
    pages.push(SYSTEM_PAGES.courses, SYSTEM_PAGES.settings);
  }

  if (userRoles.includes(USER_ROLES.SYSTEM_ADMIN))
    pages.push(
      SYSTEM_PAGES.periods,
      SYSTEM_PAGES.courses,
      SYSTEM_PAGES.departament,
      SYSTEM_PAGES.settings
    );

  return pages;
};

const getDefaultUserPage = (userRoles: number[]) => {
  if (!userRoles.length) return SYSTEM_PAGES.settings.key;

  if (userRoles.includes(USER_ROLES.TEACHER)) return SYSTEM_PAGES.settings.key;

  if (userRoles.includes(USER_ROLES.SYSTEM_ADMIN))
    return SYSTEM_PAGES.settings.key;
};

export { getRolePages, getDefaultUserPage, getSelectedKey };
