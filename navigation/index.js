export default [
  {
    "header": "",
    "description": "",
    "child": [
      {
        "title": "Dashboard",
        "path": "/dashboard",
        "icon": "ic:outline-dashboard",
        "child": [],
        "meta": {}
      }
    ]
  },
  {
    "header": "Store",
    "description": "Details of the store",
    "child": [
      {
        "title": "Store Detail",
        "path": "/store",
        "icon": "material-symbols:storefront-outline-rounded",
        "child": [],
        "meta": {}
      }
    ],
    "meta": {
      "auth": {
        "role": [
          "Customer"
        ]
      }
    }
  },
  {
    "header": "Administration",
    "description": "Manage your application",
    "child": [
      {
        "title": "Menu Editor",
        "icon": "ci:menu-alt-03",
        "path": "/admin/menu-editor",
        "child": []
      },
      {
        "title": "Manage Users",
        "path": "/admin/user-management",
        "icon": "ph:user-circle-gear",
        "child": [
          {
            "title": "User List",
            "path": "/admin/user-management/user-list",
            "icon": "",
            "child": []
          },
          {
            "title": "Role List",
            "path": "/admin/user-management/role-list",
            "icon": "",
            "child": []
          }
        ]
      },
      {
        "title": "Content Editor",
        "path": "/admin/content-editor",
        "icon": "mdi:pencil-ruler",
        "child": []
      },
      {
        "title": "API Editor",
        "path": "/admin/api-editor",
        "icon": "material-symbols:api-rounded",
        "child": []
      }
    ],
    "meta": {
      "auth": {
        "role": [
          "Developer"
        ]
      }
    }
  }
]