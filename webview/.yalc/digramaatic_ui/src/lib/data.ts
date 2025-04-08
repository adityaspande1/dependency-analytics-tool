// src/lib/data.ts
import { GraphData } from "../types/graph";

// Original sample data - kept for backward compatibility
export const sampleData: GraphData =  {
  "nodes": [
    {
      "id": "comp_Home",
      "title": "Home",
      "type": "component",
      "sections": [],
      "metadata": {
        "filePath": "app/page.tsx",
        "name": "Home"
      }
    },
    {
      "id": "comp_RootLayout",
      "title": "RootLayout",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RootLayout_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_RootLayout_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/layout.tsx",
        "name": "RootLayout"
      }
    },
    {
      "id": "comp_ThemeToggle",
      "title": "ThemeToggle",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ThemeToggle_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ThemeToggle_useTheme",
              "value": "useTheme (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/theme-toggle.tsx",
        "name": "ThemeToggle"
      }
    },
    {
      "id": "comp_AuthProvider",
      "title": "AuthProvider",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_AuthProvider_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_AuthProvider_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_AuthProvider_state",
          "name": "State",
          "items": [
            {
              "id": "state_AuthProvider_authState",
              "value": "authState: object = {}",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_AuthProvider_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_AuthProvider_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_AuthProvider_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_AuthProvider_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_AuthProvider_useEffect",
              "value": "useEffect",
              "icon": "hook"
            },
            {
              "id": "hook_AuthProvider_useContext",
              "value": "useContext",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "context/AuthContext.tsx",
        "name": "AuthProvider"
      }
    },
    {
      "id": "comp_MainLayout",
      "title": "MainLayout",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_MainLayout_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_MainLayout_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_MainLayout_children",
          "name": "Children",
          "items": [
            {
              "id": "child_MainLayout_AuthProvider",
              "value": "AuthProvider",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/layout.tsx",
        "name": "MainLayout"
      }
    },
    {
      "id": "comp_Toaster",
      "title": "Toaster",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Toaster_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Toaster_props",
              "value": "props: ToasterProps (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_Toaster_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_Toaster_useTheme",
              "value": "useTheme (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/sonner.tsx",
        "name": "Toaster"
      }
    },
    {
      "id": "comp_Skeleton",
      "title": "Skeleton",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Skeleton_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Skeleton_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Skeleton_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/skeleton.tsx",
        "name": "Skeleton"
      }
    },
    {
      "id": "comp_SheetHeader",
      "title": "SheetHeader",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_SheetHeader_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_SheetHeader_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_SheetHeader_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/sheet.tsx",
        "name": "SheetHeader"
      }
    },
    {
      "id": "comp_SheetFooter",
      "title": "SheetFooter",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_SheetFooter_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_SheetFooter_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_SheetFooter_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/sheet.tsx",
        "name": "SheetFooter"
      }
    },
    {
      "id": "comp_ResizablePanelGroup",
      "title": "ResizablePanelGroup",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ResizablePanelGroup_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ResizablePanelGroup_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ResizablePanelGroup_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/resizable.tsx",
        "name": "ResizablePanelGroup"
      }
    },
    {
      "id": "comp_ResizableHandle",
      "title": "ResizableHandle",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ResizableHandle_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ResizableHandle_withHandle",
              "value": "withHandle: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ResizableHandle_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/resizable.tsx",
        "name": "ResizableHandle"
      }
    },
    {
      "id": "comp_Pagination",
      "title": "Pagination",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Pagination_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Pagination_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Pagination_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/pagination.tsx",
        "name": "Pagination"
      }
    },
    {
      "id": "comp_PaginationLink",
      "title": "PaginationLink",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PaginationLink_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PaginationLink_props",
              "value": "props: PaginationLinkProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationLink_className",
              "value": "className: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationLink_isActive",
              "value": "isActive: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationLink_size",
              "value": "size: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/pagination.tsx",
        "name": "PaginationLink"
      }
    },
    {
      "id": "comp_PaginationPrevious",
      "title": "PaginationPrevious",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PaginationPrevious_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PaginationPrevious_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationPrevious_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_PaginationPrevious_children",
          "name": "Children",
          "items": [
            {
              "id": "child_PaginationPrevious_PaginationLink",
              "value": "PaginationLink",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/pagination.tsx",
        "name": "PaginationPrevious"
      }
    },
    {
      "id": "comp_PaginationNext",
      "title": "PaginationNext",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PaginationNext_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PaginationNext_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationNext_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_PaginationNext_children",
          "name": "Children",
          "items": [
            {
              "id": "child_PaginationNext_PaginationLink",
              "value": "PaginationLink",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/ui/pagination.tsx",
        "name": "PaginationNext"
      }
    },
    {
      "id": "comp_PaginationEllipsis",
      "title": "PaginationEllipsis",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PaginationEllipsis_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PaginationEllipsis_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationEllipsis_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/pagination.tsx",
        "name": "PaginationEllipsis"
      }
    },
    {
      "id": "comp_MenubarShortcut",
      "title": "MenubarShortcut",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_MenubarShortcut_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_MenubarShortcut_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_MenubarShortcut_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/menubar.tsx",
        "name": "MenubarShortcut"
      }
    },
    {
      "id": "comp_FormField",
      "title": "FormField",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_FormField_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_FormField_props",
              "value": "props: ControllerProps (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_FormField_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_FormField_useFormContext",
              "value": "useFormContext (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_FormField_useFormField",
              "value": "useFormField (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/form.tsx",
        "name": "FormField"
      }
    },
    {
      "id": "comp_DropdownMenuShortcut",
      "title": "DropdownMenuShortcut",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DropdownMenuShortcut_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DropdownMenuShortcut_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DropdownMenuShortcut_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/ui/dropdown-menu.tsx",
        "name": "DropdownMenuShortcut"
      }
    },
    {
      "id": "comp_Drawer",
      "title": "Drawer",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Drawer_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Drawer_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Drawer_shouldScaleBackground",
              "value": "shouldScaleBackground: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/drawer.tsx",
        "name": "Drawer"
      }
    },
    {
      "id": "comp_DrawerHeader",
      "title": "DrawerHeader",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DrawerHeader_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DrawerHeader_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DrawerHeader_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/ui/drawer.tsx",
        "name": "DrawerHeader"
      }
    },
    {
      "id": "comp_DrawerFooter",
      "title": "DrawerFooter",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DrawerFooter_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DrawerFooter_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DrawerFooter_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/drawer.tsx",
        "name": "DrawerFooter"
      }
    },
    {
      "id": "comp_DialogHeader",
      "title": "DialogHeader",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DialogHeader_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DialogHeader_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DialogHeader_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/dialog.tsx",
        "name": "DialogHeader"
      }
    },
    {
      "id": "comp_DialogFooter",
      "title": "DialogFooter",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DialogFooter_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DialogFooter_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DialogFooter_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/dialog.tsx",
        "name": "DialogFooter"
      }
    },
    {
      "id": "comp_ContextMenuShortcut",
      "title": "ContextMenuShortcut",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ContextMenuShortcut_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ContextMenuShortcut_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ContextMenuShortcut_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/context-menu.tsx",
        "name": "ContextMenuShortcut"
      }
    },
    {
      "id": "comp_CommandDialog",
      "title": "CommandDialog",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_CommandDialog_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_CommandDialog_props",
              "value": "props: CommandDialogProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_CommandDialog_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/command.tsx",
        "name": "CommandDialog"
      }
    },
    {
      "id": "comp_CommandShortcut",
      "title": "CommandShortcut",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_CommandShortcut_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_CommandShortcut_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_CommandShortcut_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/command.tsx",
        "name": "CommandShortcut"
      }
    },
    {
      "id": "comp_ChartStyle",
      "title": "ChartStyle",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ChartStyle_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ChartStyle_id",
              "value": "id: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ChartStyle_config",
              "value": "config: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_ChartStyle_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ChartStyle_useChart",
              "value": "useChart (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ChartStyle_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ChartStyle_ChartStyle",
              "value": "ChartStyle",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/ui/chart.tsx",
        "name": "ChartStyle"
      }
    },
    {
      "id": "comp_Calendar",
      "title": "Calendar",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Calendar_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Calendar_props",
              "value": "props: CalendarProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Calendar_className",
              "value": "className: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Calendar_classNames",
              "value": "classNames: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Calendar_showOutsideDays",
              "value": "showOutsideDays: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/calendar.tsx",
        "name": "Calendar"
      }
    },
    {
      "id": "comp_BreadcrumbSeparator",
      "title": "BreadcrumbSeparator",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_BreadcrumbSeparator_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_BreadcrumbSeparator_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_BreadcrumbSeparator_children",
              "value": "children: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_BreadcrumbSeparator_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/breadcrumb.tsx",
        "name": "BreadcrumbSeparator"
      }
    },
    {
      "id": "comp_BreadcrumbEllipsis",
      "title": "BreadcrumbEllipsis",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_BreadcrumbEllipsis_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_BreadcrumbEllipsis_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_BreadcrumbEllipsis_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/breadcrumb.tsx",
        "name": "BreadcrumbEllipsis"
      }
    },
    {
      "id": "comp_Badge",
      "title": "Badge",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Badge_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Badge_props",
              "value": "props: BadgeProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Badge_className",
              "value": "className: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Badge_variant",
              "value": "variant: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/badge.tsx",
        "name": "Badge"
      }
    },
    {
      "id": "comp_AlertDialogHeader",
      "title": "AlertDialogHeader",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_AlertDialogHeader_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_AlertDialogHeader_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_AlertDialogHeader_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/alert-dialog.tsx",
        "name": "AlertDialogHeader"
      }
    },
    {
      "id": "comp_AlertDialogFooter",
      "title": "AlertDialogFooter",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_AlertDialogFooter_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_AlertDialogFooter_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_AlertDialogFooter_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/alert-dialog.tsx",
        "name": "AlertDialogFooter"
      }
    },
    {
      "id": "comp_ResultDetailsModal",
      "title": "ResultDetailsModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ResultDetailsModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ResultDetailsModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ResultDetailsModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ResultDetailsModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/result-details-modal.tsx",
        "name": "ResultDetailsModal"
      }
    },
    {
      "id": "comp_RemoveMemberModal",
      "title": "RemoveMemberModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RemoveMemberModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_RemoveMemberModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RemoveMemberModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_RemoveMemberModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_RemoveMemberModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_RemoveMemberModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/modals/remove-member-modal.tsx",
        "name": "RemoveMemberModal"
      }
    },
    {
      "id": "comp_InviteMemberModal",
      "title": "InviteMemberModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_InviteMemberModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_InviteMemberModal_inviteRole",
              "value": "inviteRole: undefined",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_inviteLink",
              "value": "inviteLink: undefined",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_inviteValidity",
              "value": "inviteValidity: undefined",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_inviteMaxUses",
              "value": "inviteMaxUses: undefined",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_copied",
              "value": "copied: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_forceLoading",
              "value": "forceLoading: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_dots",
              "value": "dots: string = \"\"",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_InviteMemberModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_InviteMemberModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_InviteMemberModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_InviteMemberModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_InviteMemberModal_useEffect",
              "value": "useEffect",
              "icon": "hook"
            },
            {
              "id": "hook_InviteMemberModal_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_InviteMemberModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_InviteMemberModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_InviteMemberModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/invite-member-modal.tsx",
        "name": "InviteMemberModal"
      }
    },
    {
      "id": "comp_ImagePreviewModal",
      "title": "ImagePreviewModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ImagePreviewModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ImagePreviewModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ImagePreviewModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ImagePreviewModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/image-preview-modal.tsx",
        "name": "ImagePreviewModal"
      }
    },
    {
      "id": "comp_EditUserModal",
      "title": "EditUserModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_EditUserModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_EditUserModal_role",
              "value": "role: undefined",
              "icon": "state"
            },
            {
              "id": "state_EditUserModal_department",
              "value": "department: undefined",
              "icon": "state"
            },
            {
              "id": "state_EditUserModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_EditUserModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_EditUserModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditUserModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_EditUserModal_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditUserModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditUserModal_useUsers",
              "value": "useUsers (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditUserModal_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_EditUserModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_EditUserModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_EditUserModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/modals/edit-user-modal.tsx",
        "name": "EditUserModal"
      }
    },
    {
      "id": "comp_EditProfileModal",
      "title": "EditProfileModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_EditProfileModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_EditProfileModal_firstNameEdit",
              "value": "firstNameEdit: undefined",
              "icon": "state"
            },
            {
              "id": "state_EditProfileModal_lastNameEdit",
              "value": "lastNameEdit: undefined",
              "icon": "state"
            },
            {
              "id": "state_EditProfileModal_editValue",
              "value": "editValue: undefined",
              "icon": "state"
            },
            {
              "id": "state_EditProfileModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_EditProfileModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_EditProfileModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditProfileModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_EditProfileModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditProfileModal_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditProfileModal_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_EditProfileModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_EditProfileModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_EditProfileModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/edit-profile-modal.tsx",
        "name": "EditProfileModal"
      }
    },
    {
      "id": "comp_EditDepartmentModal",
      "title": "EditDepartmentModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_EditDepartmentModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_EditDepartmentModal_name",
              "value": "name: any",
              "icon": "state"
            },
            {
              "id": "state_EditDepartmentModal_description",
              "value": "description: any",
              "icon": "state"
            },
            {
              "id": "state_EditDepartmentModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_EditDepartmentModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_EditDepartmentModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditDepartmentModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_EditDepartmentModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditDepartmentModal_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditDepartmentModal_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditDepartmentModal_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_EditDepartmentModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_EditDepartmentModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_EditDepartmentModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/edit-department-modal.tsx",
        "name": "EditDepartmentModal"
      }
    },
    {
      "id": "comp_DeleteUserModal",
      "title": "DeleteUserModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DeleteUserModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_DeleteUserModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_DeleteUserModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DeleteUserModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteUserModal_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteUserModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteUserModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteUserModal_useUsers",
              "value": "useUsers (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DeleteUserModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DeleteUserModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_DeleteUserModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/modals/delete-user-modal.tsx",
        "name": "DeleteUserModal"
      }
    },
    {
      "id": "comp_DeleteDepartmentModal",
      "title": "DeleteDepartmentModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DeleteDepartmentModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_DeleteDepartmentModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_DeleteDepartmentModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DeleteDepartmentModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteDepartmentModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteDepartmentModal_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteDepartmentModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteDepartmentModal_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DeleteDepartmentModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DeleteDepartmentModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_DeleteDepartmentModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/delete-department-modal.tsx",
        "name": "DeleteDepartmentModal"
      }
    },
    {
      "id": "comp_CreateDepartmentModal",
      "title": "CreateDepartmentModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_CreateDepartmentModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_CreateDepartmentModal_name",
              "value": "name: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_CreateDepartmentModal_description",
              "value": "description: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_CreateDepartmentModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_CreateDepartmentModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_CreateDepartmentModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_CreateDepartmentModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_CreateDepartmentModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_CreateDepartmentModal_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_CreateDepartmentModal_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_CreateDepartmentModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_CreateDepartmentModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_CreateDepartmentModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/create-department-modal.tsx",
        "name": "CreateDepartmentModal"
      }
    },
    {
      "id": "comp_ApplicationRejectionModal",
      "title": "ApplicationRejectionModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ApplicationRejectionModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_ApplicationRejectionModal_rejectionReason",
              "value": "rejectionReason: any",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_ApplicationRejectionModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ApplicationRejectionModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_ApplicationRejectionModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_ApplicationRejectionModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_ApplicationRejectionModal_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ApplicationRejectionModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ApplicationRejectionModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_ApplicationRejectionModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/approval-rejection-modal.tsx",
        "name": "ApplicationRejectionModal"
      }
    },
    {
      "id": "comp_ThemeProvider",
      "title": "ThemeProvider",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ThemeProvider_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ThemeProvider_props",
              "value": "props: ThemeProviderProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ThemeProvider_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/providers/theme-provider.tsx",
        "name": "ThemeProvider"
      }
    },
    {
      "id": "comp_ModalProvider",
      "title": "ModalProvider",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ModalProvider_state",
          "name": "State",
          "items": [
            {
              "id": "state_ModalProvider_mounted",
              "value": "mounted: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_ModalProvider_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ModalProvider_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_ModalProvider_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ModalProvider_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ModalProvider_ImagePreviewModal",
              "value": "ImagePreviewModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_ResultDetailsModal",
              "value": "ResultDetailsModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_ApplicationRejectionModal",
              "value": "ApplicationRejectionModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_CreateDepartmentModal",
              "value": "CreateDepartmentModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_EditDepartmentModal",
              "value": "EditDepartmentModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_DeleteDepartmentModal",
              "value": "DeleteDepartmentModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_EditUserModal",
              "value": "EditUserModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_DeleteUserModal",
              "value": "DeleteUserModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_EditProfileModal",
              "value": "EditProfileModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_InviteMemberModal",
              "value": "InviteMemberModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_RemoveMemberModal",
              "value": "RemoveMemberModal",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/providers/modal-provider.tsx",
        "name": "ModalProvider"
      }
    },
    {
      "id": "comp_InvitePageLoading",
      "title": "InvitePageLoading",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/loading.tsx",
        "name": "InvitePageLoading"
      }
    },
    {
      "id": "comp_Signup",
      "title": "Signup",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Signup_state",
          "name": "State",
          "items": [
            {
              "id": "state_Signup_isLoading",
              "value": "isLoading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_Signup_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_Signup_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_Signup_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Signup_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Signup_useForm",
              "value": "useForm (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/signup/page.tsx",
        "name": "Signup"
      }
    },
    {
      "id": "comp_AuthLayout",
      "title": "AuthLayout",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_AuthLayout_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_AuthLayout_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_AuthLayout_state",
          "name": "State",
          "items": [
            {
              "id": "state_AuthLayout_isSidebarCollapsed",
              "value": "isSidebarCollapsed: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_AuthLayout_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_AuthLayout_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_AuthLayout_useState",
              "value": "useState",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_AuthLayout_children",
          "name": "Children",
          "items": [
            {
              "id": "child_AuthLayout_SidebarSkeleton",
              "value": "SidebarSkeleton",
              "icon": "component"
            },
            {
              "id": "child_AuthLayout_Sidebar",
              "value": "Sidebar",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/layout.tsx",
        "name": "AuthLayout"
      }
    },
    {
      "id": "comp_SidebarSkeleton",
      "title": "SidebarSkeleton",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_SidebarSkeleton_children",
          "name": "Children",
          "items": [
            {
              "id": "child_SidebarSkeleton_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/layout.tsx",
        "name": "SidebarSkeleton"
      }
    },
    {
      "id": "comp_Sidebar",
      "title": "Sidebar",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Sidebar_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Sidebar_isSidebarCollapsed",
              "value": "isSidebarCollapsed: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Sidebar_toggleSidebar",
              "value": "toggleSidebar: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_Sidebar_state",
          "name": "State",
          "items": [
            {
              "id": "state_Sidebar_isMobileMenuOpen",
              "value": "isMobileMenuOpen: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_Sidebar_expandedAdminMenu",
              "value": "expandedAdminMenu: boolean = true",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_Sidebar_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_Sidebar_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Sidebar_usePathname",
              "value": "usePathname (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Sidebar_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Sidebar_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_Sidebar_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Sidebar_useAuthStore",
              "value": "useAuthStore (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_Sidebar_children",
          "name": "Children",
          "items": [
            {
              "id": "child_Sidebar_ThemeToggle",
              "value": "ThemeToggle",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/layout.tsx",
        "name": "Sidebar"
      }
    },
    {
      "id": "comp_renderNavItem",
      "title": "renderNavItem",
      "type": "component",
      "sections": [],
      "metadata": {
        "filePath": "app/(main)/(auth)/layout.tsx",
        "name": "renderNavItem"
      }
    },
    {
      "id": "comp_Login",
      "title": "Login",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Login_state",
          "name": "State",
          "items": [
            {
              "id": "state_Login_isLoading",
              "value": "isLoading: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_Login_error",
              "value": "error: string = \"\"",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_Login_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_Login_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_Login_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Login_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Login_useForm",
              "value": "useForm (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/login/page.tsx",
        "name": "Login"
      }
    },
    {
      "id": "comp_InviteSuccessCard",
      "title": "InviteSuccessCard",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-success-card.tsx",
        "name": "InviteSuccessCard"
      }
    },
    {
      "id": "comp_InviteRegistrationForm",
      "title": "InviteRegistrationForm",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_InviteRegistrationForm_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_InviteRegistrationForm_props",
              "value": "props: InviteRegistrationFormProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteRegistrationForm_animationStage",
              "value": "animationStage: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteRegistrationForm_inviteToken",
              "value": "inviteToken: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_InviteRegistrationForm_state",
          "name": "State",
          "items": [
            {
              "id": "state_InviteRegistrationForm_isSubmitting",
              "value": "isSubmitting: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_InviteRegistrationForm_registrationComplete",
              "value": "registrationComplete: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_InviteRegistrationForm_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_InviteRegistrationForm_useForm",
              "value": "useForm (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_InviteRegistrationForm_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_InviteRegistrationForm_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_InviteRegistrationForm_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_InviteRegistrationForm_children",
          "name": "Children",
          "items": [
            {
              "id": "child_InviteRegistrationForm_InviteSuccessCard",
              "value": "InviteSuccessCard",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-registration-form.tsx",
        "name": "InviteRegistrationForm"
      }
    },
    {
      "id": "comp_InvitePageClient",
      "title": "InvitePageClient",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_InvitePageClient_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_InvitePageClient_props",
              "value": "props: InvitePageClientProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InvitePageClient_inviteDetails",
              "value": "inviteDetails: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InvitePageClient_inviteToken",
              "value": "inviteToken: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_InvitePageClient_state",
          "name": "State",
          "items": [
            {
              "id": "state_InvitePageClient_animationStage",
              "value": "animationStage: number = 0",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_InvitePageClient_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_InvitePageClient_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_InvitePageClient_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_InvitePageClient_children",
          "name": "Children",
          "items": [
            {
              "id": "child_InvitePageClient_InviteRegistrationForm",
              "value": "InviteRegistrationForm",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-page-client.tsx",
        "name": "InvitePageClient"
      }
    },
    {
      "id": "comp_InviteHeader",
      "title": "InviteHeader",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_InviteHeader_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_InviteHeader_props",
              "value": "props: InviteHeaderProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteHeader_animationStage",
              "value": "animationStage: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteHeader_creatorName",
              "value": "creatorName: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteHeader_department",
              "value": "department: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteHeader_role",
              "value": "role: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_InviteHeader_children",
          "name": "Children",
          "items": [
            {
              "id": "child_InviteHeader_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-header.tsx",
        "name": "InviteHeader"
      }
    },
    {
      "id": "comp_getRoleIcon",
      "title": "getRoleIcon",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-header.tsx",
        "name": "getRoleIcon"
      }
    },
    {
      "id": "comp_InviteErrorState",
      "title": "InviteErrorState",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_InviteErrorState_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_InviteErrorState_error",
              "value": "error: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-error-state.tsx",
        "name": "InviteErrorState"
      }
    },
    {
      "id": "comp_RegistrationPage",
      "title": "RegistrationPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RegistrationPage_state",
          "name": "State",
          "items": [
            {
              "id": "state_RegistrationPage_departments",
              "value": "departments: array = []",
              "icon": "state"
            },
            {
              "id": "state_RegistrationPage_application",
              "value": "application: undefined",
              "icon": "state"
            },
            {
              "id": "state_RegistrationPage_isReapplying",
              "value": "isReapplying: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_RegistrationPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_RegistrationPage_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RegistrationPage_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RegistrationPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RegistrationPage_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_RegistrationPage_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_RegistrationPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_RegistrationPage_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/registration/page.tsx",
        "name": "RegistrationPage"
      }
    },
    {
      "id": "comp_UploadPage",
      "title": "UploadPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_UploadPage_state",
          "name": "State",
          "items": [
            {
              "id": "state_UploadPage_bilFile",
              "value": "bilFile: null = null",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_hdrFile",
              "value": "hdrFile: null = null",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_category",
              "value": "category: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_location",
              "value": "location: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_showSuccess",
              "value": "showSuccess: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_name",
              "value": "name: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_isDragging",
              "value": "isDragging: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_uploadStatus",
              "value": "uploadStatus: string = \"\"",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_UploadPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_UploadPage_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_UploadPage_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_UploadPage_useRef",
              "value": "useRef",
              "icon": "hook"
            },
            {
              "id": "hook_UploadPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_UploadPage_useFileUpload",
              "value": "useFileUpload (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_UploadPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_UploadPage_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/upload/page.tsx",
        "name": "UploadPage"
      }
    },
    {
      "id": "comp_ProfilePage",
      "title": "ProfilePage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ProfilePage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ProfilePage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_ProfilePage_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ProfilePage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ProfilePage_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/profile/page.tsx",
        "name": "ProfilePage"
      }
    },
    {
      "id": "comp_AdminPage",
      "title": "AdminPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_AdminPage_state",
          "name": "State",
          "items": [
            {
              "id": "state_AdminPage_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_AdminPage_approvalStats",
              "value": "approvalStats: null = null",
              "icon": "state"
            },
            {
              "id": "state_AdminPage_approvals",
              "value": "approvals: object = {}",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_AdminPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_AdminPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_AdminPage_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_AdminPage_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_AdminPage_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_AdminPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_AdminPage_Badge",
              "value": "Badge",
              "icon": "component"
            },
            {
              "id": "child_AdminPage_ApprovalCard",
              "value": "ApprovalCard",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/page.tsx",
        "name": "AdminPage"
      }
    },
    {
      "id": "comp_ApprovalCard",
      "title": "ApprovalCard",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ApprovalCard_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ApprovalCard_approval",
              "value": "approval: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ApprovalCard_showActions",
              "value": "showActions: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/page.tsx",
        "name": "ApprovalCard"
      }
    },
    {
      "id": "comp_DepartmentsPage",
      "title": "DepartmentsPage",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/page.tsx",
        "name": "DepartmentsPage"
      }
    },
    {
      "id": "comp_DashboardPage",
      "title": "DashboardPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DashboardPage_state",
          "name": "State",
          "items": [
            {
              "id": "state_DashboardPage_compareResults",
              "value": "compareResults: array = []",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_DashboardPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DashboardPage_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_DashboardPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DashboardPage_useMediaQuery",
              "value": "useMediaQuery (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DashboardPage_useAnalysis",
              "value": "useAnalysis (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DashboardPage_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DashboardPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DashboardPage_DashboardPageSkeleton",
              "value": "DashboardPageSkeleton",
              "icon": "component"
            },
            {
              "id": "child_DashboardPage_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/page.tsx",
        "name": "DashboardPage"
      }
    },
    {
      "id": "comp_DashboardPageSkeleton",
      "title": "DashboardPageSkeleton",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DashboardPageSkeleton_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DashboardPageSkeleton_itemCount",
              "value": "itemCount: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_DashboardPageSkeleton_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DashboardPageSkeleton_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/page.tsx",
        "name": "DashboardPageSkeleton"
      }
    },
    {
      "id": "comp_StatusCard",
      "title": "StatusCard",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_StatusCard_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_StatusCard_status",
              "value": "status: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_role",
              "value": "role: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_appliedAt",
              "value": "appliedAt: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_departmentName",
              "value": "departmentName: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_rejectionReason",
              "value": "rejectionReason: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_processedAt",
              "value": "processedAt: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_onReapply",
              "value": "onReapply: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_StatusCard_children",
          "name": "Children",
          "items": [
            {
              "id": "child_StatusCard_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/registration/_components/status-card.tsx",
        "name": "StatusCard"
      }
    },
    {
      "id": "comp_RegistrationForm",
      "title": "RegistrationForm",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RegistrationForm_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_RegistrationForm_onSubmit",
              "value": "onSubmit: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RegistrationForm_initialRole",
              "value": "initialRole: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RegistrationForm_departments",
              "value": "departments: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RegistrationForm_initialDepartment",
              "value": "initialDepartment: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_RegistrationForm_state",
          "name": "State",
          "items": [
            {
              "id": "state_RegistrationForm_role",
              "value": "role: initialRole",
              "icon": "state"
            },
            {
              "id": "state_RegistrationForm_departmentId",
              "value": "departmentId: undefined",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_RegistrationForm_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_RegistrationForm_useState",
              "value": "useState",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/registration/_components/registration-form.tsx",
        "name": "RegistrationForm"
      }
    },
    {
      "id": "comp_UsersPage",
      "title": "UsersPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_UsersPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_UsersPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_UsersPage_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_UsersPage_usePaginatedUsers",
              "value": "usePaginatedUsers (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_UsersPage_dependencies",
          "name": "Dependencies",
          "items": [
            {
              "id": "dep_UsersPage_Card",
              "value": "Card from '../../../../../components/ui/card'",
              "icon": "dependency"
            },
            {
              "id": "dep_UsersPage_CardContent",
              "value": "CardContent from '../../../../../components/ui/card'",
              "icon": "dependency"
            },
            {
              "id": "dep_UsersPage_CardDescription",
              "value": "CardDescription from '../../../../../components/ui/card'",
              "icon": "dependency"
            },
            {
              "id": "dep_UsersPage_CardHeader",
              "value": "CardHeader from '../../../../../components/ui/card'",
              "icon": "dependency"
            },
            {
              "id": "dep_UsersPage_CardTitle",
              "value": "CardTitle from '../../../../../components/ui/card'",
              "icon": "dependency"
            },
            {
              "id": "dep_UsersPage_DataTable",
              "value": "DataTable from './_components/data-table'",
              "icon": "dependency"
            }
          ]
        },
        {
          "id": "sec_comp_UsersPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_UsersPage_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/users/page.tsx",
        "name": "UsersPage"
      }
    },
    {
      "id": "comp_RequestsPage",
      "title": "RequestsPage",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/requests/page.tsx",
        "name": "RequestsPage"
      }
    },
    {
      "id": "comp_DepartmentList",
      "title": "DepartmentList",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DepartmentList_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DepartmentList_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentList_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentList_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DepartmentList_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/departments/_components/department-list.tsx",
        "name": "DepartmentList"
      }
    },
    {
      "id": "comp_DepartmentCard",
      "title": "DepartmentCard",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DepartmentCard_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DepartmentCard_department",
              "value": "department: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentCard_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DepartmentCard_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentCard_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentCard_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentCard_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DepartmentCard_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/_components/department-card.tsx",
        "name": "DepartmentCard"
      }
    },
    {
      "id": "comp_CreateDepartmentButton",
      "title": "CreateDepartmentButton",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_CreateDepartmentButton_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_CreateDepartmentButton_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_CreateDepartmentButton_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_CreateDepartmentButton_children",
          "name": "Children",
          "items": [
            {
              "id": "child_CreateDepartmentButton_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/_components/create-department-button.tsx",
        "name": "CreateDepartmentButton"
      }
    },
    {
      "id": "comp_EmptyState",
      "title": "EmptyState",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/empty-state.tsx",
        "name": "EmptyState"
      }
    },
    {
      "id": "comp_DepartmentDetailPage",
      "title": "DepartmentDetailPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DepartmentDetailPage_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DepartmentDetailPage_params",
              "value": "params: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentDetailPage_state",
          "name": "State",
          "items": [
            {
              "id": "state_DepartmentDetailPage_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentDetailPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DepartmentDetailPage_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentDetailPage_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentDetailPage_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentDetailPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentDetailPage_useMemo",
              "value": "useMemo",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentDetailPage_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentDetailPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DepartmentDetailPage_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/page.tsx",
        "name": "DepartmentDetailPage"
      }
    },
    {
      "id": "comp_DataTable",
      "title": "DataTable",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DataTable_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DataTable_props",
              "value": "props: DataTableProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DataTable_columns",
              "value": "columns: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DataTable_data",
              "value": "data: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DataTable_pagination",
              "value": "pagination: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DataTable_onPaginationChange",
              "value": "onPaginationChange: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DataTable_totalPages",
              "value": "totalPages: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_DataTable_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DataTable_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DataTable_useReactTable",
              "value": "useReactTable (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/users/_components/data-table.tsx",
        "name": "DataTable"
      }
    },
    {
      "id": "comp_RequestList",
      "title": "RequestList",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RequestList_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_RequestList_props",
              "value": "props: RequestListProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestList_requests",
              "value": "requests: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_RequestList_state",
          "name": "State",
          "items": [
            {
              "id": "state_RequestList_requests",
              "value": "requests: requestList",
              "icon": "state"
            },
            {
              "id": "state_RequestList_loading",
              "value": "loading: boolean = true",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_RequestList_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_RequestList_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_RequestList_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RequestList_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RequestList_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RequestList_useEffect",
              "value": "useEffect",
              "icon": "hook"
            },
            {
              "id": "hook_RequestList_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_RequestList_children",
          "name": "Children",
          "items": [
            {
              "id": "child_RequestList_RequestsLoading",
              "value": "RequestsLoading",
              "icon": "component"
            },
            {
              "id": "child_RequestList_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/admin/requests/_components/request-list.tsx",
        "name": "RequestList"
      }
    },
    {
      "id": "comp_RequestsLoading",
      "title": "RequestsLoading",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RequestsLoading_children",
          "name": "Children",
          "items": [
            {
              "id": "child_RequestsLoading_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/requests/_components/request-list.tsx",
        "name": "RequestsLoading"
      }
    },
    {
      "id": "comp_RequestCard",
      "title": "RequestCard",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RequestCard_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_RequestCard_props",
              "value": "props: RequestCardProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestCard_request",
              "value": "request: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestCard_appliedAt",
              "value": "appliedAt: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestCard_processedAt",
              "value": "processedAt: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestCard_onApprove",
              "value": "onApprove: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestCard_onReject",
              "value": "onReject: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_RequestCard_children",
          "name": "Children",
          "items": [
            {
              "id": "child_RequestCard_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/requests/_components/request-card.tsx",
        "name": "RequestCard"
      }
    },
    {
      "id": "comp_PieChartComparison",
      "title": "PieChartComparison",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PieChartComparison_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PieChartComparison_props",
              "value": "props: ComparisonElementProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PieChartComparison_result1",
              "value": "result1: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PieChartComparison_result2",
              "value": "result2: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/comparison/pie-chart-comparison.tsx",
        "name": "PieChartComparison"
      }
    },
    {
      "id": "comp_renderCustomizedLabel",
      "title": "renderCustomizedLabel",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_renderCustomizedLabel_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_renderCustomizedLabel_cx",
              "value": "cx: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_cy",
              "value": "cy: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_midAngle",
              "value": "midAngle: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_innerRadius",
              "value": "innerRadius: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_outerRadius",
              "value": "outerRadius: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_percent",
              "value": "percent: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_name",
              "value": "name: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_index",
              "value": "index: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/comparison/pie-chart-comparison.tsx",
        "name": "renderCustomizedLabel"
      }
    },
    {
      "id": "comp_ComparisonTable",
      "title": "ComparisonTable",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ComparisonTable_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ComparisonTable_props",
              "value": "props: ComparisonTableProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonTable_result1",
              "value": "result1: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonTable_result2",
              "value": "result2: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/comparison/comparison-table.tsx",
        "name": "ComparisonTable"
      }
    },
    {
      "id": "comp_ComparisonItem",
      "title": "ComparisonItem",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ComparisonItem_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ComparisonItem_props",
              "value": "props: ComparisonItemProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonItem_type",
              "value": "type: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonItem_title",
              "value": "title: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonItem_description",
              "value": "description: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonItem_resultData",
              "value": "resultData: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_ComparisonItem_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ComparisonItem_ComparisonTable",
              "value": "ComparisonTable",
              "icon": "component"
            },
            {
              "id": "child_ComparisonItem_PieChartComparison",
              "value": "PieChartComparison",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/comparison/comparison-item.tsx",
        "name": "ComparisonItem"
      }
    },
    {
      "id": "comp_BarChartComparison",
      "title": "BarChartComparison",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_BarChartComparison_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_BarChartComparison_props",
              "value": "props: ComparisonElementProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_BarChartComparison_result1",
              "value": "result1: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_BarChartComparison_result2",
              "value": "result2: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/comparison/bar-chart-comparison.tsx",
        "name": "BarChartComparison"
      }
    },
    {
      "id": "comp_PaginationControls",
      "title": "PaginationControls",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PaginationControls_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PaginationControls_props",
              "value": "props: PaginationControlProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationControls_pagination",
              "value": "pagination: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationControls_totalElements",
              "value": "totalElements: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationControls_onPaginationChange",
              "value": "onPaginationChange: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_PaginationControls_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_PaginationControls_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/_components/pagination-controls.tsx",
        "name": "PaginationControls"
      }
    },
    {
      "id": "comp_MemberList",
      "title": "MemberList",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_MemberList_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_MemberList_props",
              "value": "props: MemberListProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_MemberList_members",
              "value": "members: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_MemberList_onRemove",
              "value": "onRemove: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_MemberList_isAdmin",
              "value": "isAdmin: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_MemberList_isLoading",
              "value": "isLoading: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_MemberList_children",
          "name": "Children",
          "items": [
            {
              "id": "child_MemberList_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/_components/member-list.tsx",
        "name": "MemberList"
      }
    },
    {
      "id": "comp_FilterControls",
      "title": "FilterControls",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_FilterControls_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_FilterControls_props",
              "value": "props: FilterControlProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_FilterControls_searchQuery",
              "value": "searchQuery: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_FilterControls_onQueryChange",
              "value": "onQueryChange: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_FilterControls_onFilterChange",
              "value": "onFilterChange: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_FilterControls_roleFilter",
              "value": "roleFilter: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/_components/filter-controls.tsx",
        "name": "FilterControls"
      }
    },
    {
      "id": "comp_DepartmentMembers",
      "title": "DepartmentMembers",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DepartmentMembers_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DepartmentMembers_props",
              "value": "props: DepartmentMembersProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DepartmentMembers_department",
              "value": "department: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentMembers_state",
          "name": "State",
          "items": [
            {
              "id": "state_DepartmentMembers_members",
              "value": "members: array = []",
              "icon": "state"
            },
            {
              "id": "state_DepartmentMembers_searchQuery",
              "value": "searchQuery: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_DepartmentMembers_roleFilter",
              "value": "roleFilter: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_DepartmentMembers_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_DepartmentMembers_pagination",
              "value": "pagination: object = {}",
              "icon": "state"
            },
            {
              "id": "state_DepartmentMembers_totalElements",
              "value": "totalElements: number = 0",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentMembers_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DepartmentMembers_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useMemo",
              "value": "useMemo",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useCallback",
              "value": "useCallback",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentMembers_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DepartmentMembers_FilterControls",
              "value": "FilterControls",
              "icon": "component"
            },
            {
              "id": "child_DepartmentMembers_MemberList",
              "value": "MemberList",
              "icon": "component"
            },
            {
              "id": "child_DepartmentMembers_PaginationControls",
              "value": "PaginationControls",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/_components/department-members.tsx",
        "name": "DepartmentMembers"
      }
    },
    {
      "id": "comp_DepartmentInfo",
      "title": "DepartmentInfo",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DepartmentInfo_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DepartmentInfo_props",
              "value": "props: DepartmentInfoProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DepartmentInfo_description",
              "value": "description: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DepartmentInfo_createdAt",
              "value": "createdAt: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/_components/department-info.tsx",
        "name": "DepartmentInfo"
      }
    }
  ],
  "edges": [
    {
      "source": "comp_MainLayout",
      "target": "comp_AuthProvider",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_PaginationPrevious",
      "target": "comp_PaginationLink",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_PaginationNext",
      "target": "comp_PaginationLink",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ChartStyle",
      "target": "comp_ChartStyle",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ResultDetailsModal",
      "target": "comp_DialogHeader",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RemoveMemberModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RemoveMemberModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_InviteMemberModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_InviteMemberModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ImagePreviewModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditUserModal",
      "target": "comp_DialogHeader",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditUserModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditProfileModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditProfileModal",
      "target": "comp_DialogFooter",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditDepartmentModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditDepartmentModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DeleteUserModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DeleteUserModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DeleteDepartmentModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DeleteDepartmentModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_CreateDepartmentModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_CreateDepartmentModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ApplicationRejectionModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ApplicationRejectionModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_ImagePreviewModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_ResultDetailsModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_ApplicationRejectionModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_CreateDepartmentModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_EditDepartmentModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_DeleteDepartmentModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_EditUserModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_DeleteUserModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_EditProfileModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_InviteMemberModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_RemoveMemberModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_AuthLayout",
      "target": "comp_SidebarSkeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_AuthLayout",
      "target": "comp_Sidebar",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_SidebarSkeleton",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_Sidebar",
      "target": "comp_ThemeToggle",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_InviteRegistrationForm",
      "target": "comp_InviteSuccessCard",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_InvitePageClient",
      "target": "comp_InviteRegistrationForm",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_InviteHeader",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RegistrationPage",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_UploadPage",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ProfilePage",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_AdminPage",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_AdminPage",
      "target": "comp_ApprovalCard",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DashboardPage",
      "target": "comp_DashboardPageSkeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DashboardPage",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DashboardPageSkeleton",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_StatusCard",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_UsersPage",
      "target": "comp_DataTable",
      "type": "dependency",
      "metadata": {
        "path": "./_components/data-table",
        "isExternal": false
      }
    },
    {
      "source": "comp_UsersPage",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentList",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentCard",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_CreateDepartmentButton",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentDetailPage",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RequestList",
      "target": "comp_RequestsLoading",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RequestList",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RequestsLoading",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RequestCard",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ComparisonItem",
      "target": "comp_ComparisonTable",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ComparisonItem",
      "target": "comp_PieChartComparison",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_MemberList",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentMembers",
      "target": "comp_FilterControls",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentMembers",
      "target": "comp_MemberList",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentMembers",
      "target": "comp_PaginationControls",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    }
  ],
  "metadata": {
    "projectType": "typescript",
    "projectName": "React TypeScript Project",
    "convertedAt": "2025-04-08T01:01:45.358Z",
    "originalFormat": {}
  }
};

// Export the sample data with GraphData typing
export const typescriptProjectSample: GraphData = {
  "nodes": [
    {
      "id": "comp_Home",
      "title": "Home",
      "type": "component",
      "sections": [],
      "metadata": {
        "filePath": "app/page.tsx",
        "name": "Home"
      }
    },
    {
      "id": "comp_RootLayout",
      "title": "RootLayout",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RootLayout_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_RootLayout_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/layout.tsx",
        "name": "RootLayout"
      }
    },
    {
      "id": "comp_ThemeToggle",
      "title": "ThemeToggle",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ThemeToggle_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ThemeToggle_useTheme",
              "value": "useTheme (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/theme-toggle.tsx",
        "name": "ThemeToggle"
      }
    },
    {
      "id": "comp_AuthProvider",
      "title": "AuthProvider",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_AuthProvider_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_AuthProvider_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_AuthProvider_state",
          "name": "State",
          "items": [
            {
              "id": "state_AuthProvider_authState",
              "value": "authState: object = {}",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_AuthProvider_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_AuthProvider_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_AuthProvider_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_AuthProvider_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_AuthProvider_useEffect",
              "value": "useEffect",
              "icon": "hook"
            },
            {
              "id": "hook_AuthProvider_useContext",
              "value": "useContext",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "context/AuthContext.tsx",
        "name": "AuthProvider"
      }
    },
    {
      "id": "comp_MainLayout",
      "title": "MainLayout",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_MainLayout_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_MainLayout_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_MainLayout_children",
          "name": "Children",
          "items": [
            {
              "id": "child_MainLayout_AuthProvider",
              "value": "AuthProvider",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/layout.tsx",
        "name": "MainLayout"
      }
    },
    {
      "id": "comp_Toaster",
      "title": "Toaster",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Toaster_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Toaster_props",
              "value": "props: ToasterProps (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_Toaster_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_Toaster_useTheme",
              "value": "useTheme (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/sonner.tsx",
        "name": "Toaster"
      }
    },
    {
      "id": "comp_Skeleton",
      "title": "Skeleton",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Skeleton_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Skeleton_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Skeleton_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/skeleton.tsx",
        "name": "Skeleton"
      }
    },
    {
      "id": "comp_SheetHeader",
      "title": "SheetHeader",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_SheetHeader_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_SheetHeader_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_SheetHeader_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/sheet.tsx",
        "name": "SheetHeader"
      }
    },
    {
      "id": "comp_SheetFooter",
      "title": "SheetFooter",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_SheetFooter_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_SheetFooter_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_SheetFooter_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/sheet.tsx",
        "name": "SheetFooter"
      }
    },
    {
      "id": "comp_ResizablePanelGroup",
      "title": "ResizablePanelGroup",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ResizablePanelGroup_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ResizablePanelGroup_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ResizablePanelGroup_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/resizable.tsx",
        "name": "ResizablePanelGroup"
      }
    },
    {
      "id": "comp_ResizableHandle",
      "title": "ResizableHandle",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ResizableHandle_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ResizableHandle_withHandle",
              "value": "withHandle: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ResizableHandle_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/resizable.tsx",
        "name": "ResizableHandle"
      }
    },
    {
      "id": "comp_Pagination",
      "title": "Pagination",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Pagination_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Pagination_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Pagination_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/pagination.tsx",
        "name": "Pagination"
      }
    },
    {
      "id": "comp_PaginationLink",
      "title": "PaginationLink",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PaginationLink_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PaginationLink_props",
              "value": "props: PaginationLinkProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationLink_className",
              "value": "className: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationLink_isActive",
              "value": "isActive: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationLink_size",
              "value": "size: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/pagination.tsx",
        "name": "PaginationLink"
      }
    },
    {
      "id": "comp_PaginationPrevious",
      "title": "PaginationPrevious",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PaginationPrevious_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PaginationPrevious_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationPrevious_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_PaginationPrevious_children",
          "name": "Children",
          "items": [
            {
              "id": "child_PaginationPrevious_PaginationLink",
              "value": "PaginationLink",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/pagination.tsx",
        "name": "PaginationPrevious"
      }
    },
    {
      "id": "comp_PaginationNext",
      "title": "PaginationNext",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PaginationNext_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PaginationNext_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationNext_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_PaginationNext_children",
          "name": "Children",
          "items": [
            {
              "id": "child_PaginationNext_PaginationLink",
              "value": "PaginationLink",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/ui/pagination.tsx",
        "name": "PaginationNext"
      }
    },
    {
      "id": "comp_PaginationEllipsis",
      "title": "PaginationEllipsis",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PaginationEllipsis_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PaginationEllipsis_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationEllipsis_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/pagination.tsx",
        "name": "PaginationEllipsis"
      }
    },
    {
      "id": "comp_MenubarShortcut",
      "title": "MenubarShortcut",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_MenubarShortcut_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_MenubarShortcut_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_MenubarShortcut_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/menubar.tsx",
        "name": "MenubarShortcut"
      }
    },
    {
      "id": "comp_FormField",
      "title": "FormField",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_FormField_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_FormField_props",
              "value": "props: ControllerProps (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_FormField_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_FormField_useFormContext",
              "value": "useFormContext (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_FormField_useFormField",
              "value": "useFormField (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/form.tsx",
        "name": "FormField"
      }
    },
    {
      "id": "comp_DropdownMenuShortcut",
      "title": "DropdownMenuShortcut",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DropdownMenuShortcut_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DropdownMenuShortcut_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DropdownMenuShortcut_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/ui/dropdown-menu.tsx",
        "name": "DropdownMenuShortcut"
      }
    },
    {
      "id": "comp_Drawer",
      "title": "Drawer",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Drawer_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Drawer_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Drawer_shouldScaleBackground",
              "value": "shouldScaleBackground: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/drawer.tsx",
        "name": "Drawer"
      }
    },
    {
      "id": "comp_DrawerHeader",
      "title": "DrawerHeader",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DrawerHeader_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DrawerHeader_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DrawerHeader_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/ui/drawer.tsx",
        "name": "DrawerHeader"
      }
    },
    {
      "id": "comp_DrawerFooter",
      "title": "DrawerFooter",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DrawerFooter_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DrawerFooter_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DrawerFooter_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/drawer.tsx",
        "name": "DrawerFooter"
      }
    },
    {
      "id": "comp_DialogHeader",
      "title": "DialogHeader",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DialogHeader_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DialogHeader_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DialogHeader_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/dialog.tsx",
        "name": "DialogHeader"
      }
    },
    {
      "id": "comp_DialogFooter",
      "title": "DialogFooter",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DialogFooter_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DialogFooter_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DialogFooter_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/dialog.tsx",
        "name": "DialogFooter"
      }
    },
    {
      "id": "comp_ContextMenuShortcut",
      "title": "ContextMenuShortcut",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ContextMenuShortcut_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ContextMenuShortcut_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ContextMenuShortcut_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/context-menu.tsx",
        "name": "ContextMenuShortcut"
      }
    },
    {
      "id": "comp_CommandDialog",
      "title": "CommandDialog",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_CommandDialog_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_CommandDialog_props",
              "value": "props: CommandDialogProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_CommandDialog_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/command.tsx",
        "name": "CommandDialog"
      }
    },
    {
      "id": "comp_CommandShortcut",
      "title": "CommandShortcut",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_CommandShortcut_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_CommandShortcut_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_CommandShortcut_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/command.tsx",
        "name": "CommandShortcut"
      }
    },
    {
      "id": "comp_ChartStyle",
      "title": "ChartStyle",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ChartStyle_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ChartStyle_id",
              "value": "id: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ChartStyle_config",
              "value": "config: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_ChartStyle_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ChartStyle_useChart",
              "value": "useChart (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ChartStyle_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ChartStyle_ChartStyle",
              "value": "ChartStyle",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/ui/chart.tsx",
        "name": "ChartStyle"
      }
    },
    {
      "id": "comp_Calendar",
      "title": "Calendar",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Calendar_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Calendar_props",
              "value": "props: CalendarProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Calendar_className",
              "value": "className: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Calendar_classNames",
              "value": "classNames: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Calendar_showOutsideDays",
              "value": "showOutsideDays: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/calendar.tsx",
        "name": "Calendar"
      }
    },
    {
      "id": "comp_BreadcrumbSeparator",
      "title": "BreadcrumbSeparator",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_BreadcrumbSeparator_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_BreadcrumbSeparator_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_BreadcrumbSeparator_children",
              "value": "children: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_BreadcrumbSeparator_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/breadcrumb.tsx",
        "name": "BreadcrumbSeparator"
      }
    },
    {
      "id": "comp_BreadcrumbEllipsis",
      "title": "BreadcrumbEllipsis",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_BreadcrumbEllipsis_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_BreadcrumbEllipsis_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_BreadcrumbEllipsis_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/breadcrumb.tsx",
        "name": "BreadcrumbEllipsis"
      }
    },
    {
      "id": "comp_Badge",
      "title": "Badge",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Badge_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Badge_props",
              "value": "props: BadgeProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Badge_className",
              "value": "className: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Badge_variant",
              "value": "variant: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/badge.tsx",
        "name": "Badge"
      }
    },
    {
      "id": "comp_AlertDialogHeader",
      "title": "AlertDialogHeader",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_AlertDialogHeader_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_AlertDialogHeader_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_AlertDialogHeader_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/alert-dialog.tsx",
        "name": "AlertDialogHeader"
      }
    },
    {
      "id": "comp_AlertDialogFooter",
      "title": "AlertDialogFooter",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_AlertDialogFooter_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_AlertDialogFooter_props",
              "value": "props (required)",
              "icon": "prop"
            },
            {
              "id": "prop_AlertDialogFooter_className",
              "value": "className: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/ui/alert-dialog.tsx",
        "name": "AlertDialogFooter"
      }
    },
    {
      "id": "comp_ResultDetailsModal",
      "title": "ResultDetailsModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ResultDetailsModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ResultDetailsModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ResultDetailsModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ResultDetailsModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/result-details-modal.tsx",
        "name": "ResultDetailsModal"
      }
    },
    {
      "id": "comp_RemoveMemberModal",
      "title": "RemoveMemberModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RemoveMemberModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_RemoveMemberModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RemoveMemberModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_RemoveMemberModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_RemoveMemberModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_RemoveMemberModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/modals/remove-member-modal.tsx",
        "name": "RemoveMemberModal"
      }
    },
    {
      "id": "comp_InviteMemberModal",
      "title": "InviteMemberModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_InviteMemberModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_InviteMemberModal_inviteRole",
              "value": "inviteRole: undefined",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_inviteLink",
              "value": "inviteLink: undefined",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_inviteValidity",
              "value": "inviteValidity: undefined",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_inviteMaxUses",
              "value": "inviteMaxUses: undefined",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_copied",
              "value": "copied: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_forceLoading",
              "value": "forceLoading: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_InviteMemberModal_dots",
              "value": "dots: string = \"\"",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_InviteMemberModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_InviteMemberModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_InviteMemberModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_InviteMemberModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_InviteMemberModal_useEffect",
              "value": "useEffect",
              "icon": "hook"
            },
            {
              "id": "hook_InviteMemberModal_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_InviteMemberModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_InviteMemberModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_InviteMemberModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/invite-member-modal.tsx",
        "name": "InviteMemberModal"
      }
    },
    {
      "id": "comp_ImagePreviewModal",
      "title": "ImagePreviewModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ImagePreviewModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ImagePreviewModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ImagePreviewModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ImagePreviewModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/image-preview-modal.tsx",
        "name": "ImagePreviewModal"
      }
    },
    {
      "id": "comp_EditUserModal",
      "title": "EditUserModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_EditUserModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_EditUserModal_role",
              "value": "role: undefined",
              "icon": "state"
            },
            {
              "id": "state_EditUserModal_department",
              "value": "department: undefined",
              "icon": "state"
            },
            {
              "id": "state_EditUserModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_EditUserModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_EditUserModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditUserModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_EditUserModal_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditUserModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditUserModal_useUsers",
              "value": "useUsers (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditUserModal_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_EditUserModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_EditUserModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_EditUserModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/modals/edit-user-modal.tsx",
        "name": "EditUserModal"
      }
    },
    {
      "id": "comp_EditProfileModal",
      "title": "EditProfileModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_EditProfileModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_EditProfileModal_firstNameEdit",
              "value": "firstNameEdit: undefined",
              "icon": "state"
            },
            {
              "id": "state_EditProfileModal_lastNameEdit",
              "value": "lastNameEdit: undefined",
              "icon": "state"
            },
            {
              "id": "state_EditProfileModal_editValue",
              "value": "editValue: undefined",
              "icon": "state"
            },
            {
              "id": "state_EditProfileModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_EditProfileModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_EditProfileModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditProfileModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_EditProfileModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditProfileModal_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditProfileModal_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_EditProfileModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_EditProfileModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_EditProfileModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/edit-profile-modal.tsx",
        "name": "EditProfileModal"
      }
    },
    {
      "id": "comp_EditDepartmentModal",
      "title": "EditDepartmentModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_EditDepartmentModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_EditDepartmentModal_name",
              "value": "name: any",
              "icon": "state"
            },
            {
              "id": "state_EditDepartmentModal_description",
              "value": "description: any",
              "icon": "state"
            },
            {
              "id": "state_EditDepartmentModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_EditDepartmentModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_EditDepartmentModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditDepartmentModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_EditDepartmentModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditDepartmentModal_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditDepartmentModal_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_EditDepartmentModal_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_EditDepartmentModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_EditDepartmentModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_EditDepartmentModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/edit-department-modal.tsx",
        "name": "EditDepartmentModal"
      }
    },
    {
      "id": "comp_DeleteUserModal",
      "title": "DeleteUserModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DeleteUserModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_DeleteUserModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_DeleteUserModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DeleteUserModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteUserModal_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteUserModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteUserModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteUserModal_useUsers",
              "value": "useUsers (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DeleteUserModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DeleteUserModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_DeleteUserModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/modals/delete-user-modal.tsx",
        "name": "DeleteUserModal"
      }
    },
    {
      "id": "comp_DeleteDepartmentModal",
      "title": "DeleteDepartmentModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DeleteDepartmentModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_DeleteDepartmentModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_DeleteDepartmentModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DeleteDepartmentModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteDepartmentModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteDepartmentModal_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteDepartmentModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_DeleteDepartmentModal_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DeleteDepartmentModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DeleteDepartmentModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_DeleteDepartmentModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/delete-department-modal.tsx",
        "name": "DeleteDepartmentModal"
      }
    },
    {
      "id": "comp_CreateDepartmentModal",
      "title": "CreateDepartmentModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_CreateDepartmentModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_CreateDepartmentModal_name",
              "value": "name: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_CreateDepartmentModal_description",
              "value": "description: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_CreateDepartmentModal_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_CreateDepartmentModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_CreateDepartmentModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_CreateDepartmentModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_CreateDepartmentModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_CreateDepartmentModal_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_CreateDepartmentModal_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_CreateDepartmentModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_CreateDepartmentModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_CreateDepartmentModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/create-department-modal.tsx",
        "name": "CreateDepartmentModal"
      }
    },
    {
      "id": "comp_ApplicationRejectionModal",
      "title": "ApplicationRejectionModal",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ApplicationRejectionModal_state",
          "name": "State",
          "items": [
            {
              "id": "state_ApplicationRejectionModal_rejectionReason",
              "value": "rejectionReason: any",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_ApplicationRejectionModal_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ApplicationRejectionModal_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_ApplicationRejectionModal_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_ApplicationRejectionModal_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_ApplicationRejectionModal_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ApplicationRejectionModal_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ApplicationRejectionModal_DialogHeader",
              "value": "DialogHeader",
              "icon": "component"
            },
            {
              "id": "child_ApplicationRejectionModal_DialogFooter",
              "value": "DialogFooter",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/modals/approval-rejection-modal.tsx",
        "name": "ApplicationRejectionModal"
      }
    },
    {
      "id": "comp_ThemeProvider",
      "title": "ThemeProvider",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ThemeProvider_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ThemeProvider_props",
              "value": "props: ThemeProviderProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ThemeProvider_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "components/providers/theme-provider.tsx",
        "name": "ThemeProvider"
      }
    },
    {
      "id": "comp_ModalProvider",
      "title": "ModalProvider",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ModalProvider_state",
          "name": "State",
          "items": [
            {
              "id": "state_ModalProvider_mounted",
              "value": "mounted: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_ModalProvider_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ModalProvider_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_ModalProvider_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ModalProvider_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ModalProvider_ImagePreviewModal",
              "value": "ImagePreviewModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_ResultDetailsModal",
              "value": "ResultDetailsModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_ApplicationRejectionModal",
              "value": "ApplicationRejectionModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_CreateDepartmentModal",
              "value": "CreateDepartmentModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_EditDepartmentModal",
              "value": "EditDepartmentModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_DeleteDepartmentModal",
              "value": "DeleteDepartmentModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_EditUserModal",
              "value": "EditUserModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_DeleteUserModal",
              "value": "DeleteUserModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_EditProfileModal",
              "value": "EditProfileModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_InviteMemberModal",
              "value": "InviteMemberModal",
              "icon": "component"
            },
            {
              "id": "child_ModalProvider_RemoveMemberModal",
              "value": "RemoveMemberModal",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "components/providers/modal-provider.tsx",
        "name": "ModalProvider"
      }
    },
    {
      "id": "comp_InvitePageLoading",
      "title": "InvitePageLoading",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/loading.tsx",
        "name": "InvitePageLoading"
      }
    },
    {
      "id": "comp_Signup",
      "title": "Signup",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Signup_state",
          "name": "State",
          "items": [
            {
              "id": "state_Signup_isLoading",
              "value": "isLoading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_Signup_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_Signup_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_Signup_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Signup_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Signup_useForm",
              "value": "useForm (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/signup/page.tsx",
        "name": "Signup"
      }
    },
    {
      "id": "comp_AuthLayout",
      "title": "AuthLayout",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_AuthLayout_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_AuthLayout_children",
              "value": "children: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_AuthLayout_state",
          "name": "State",
          "items": [
            {
              "id": "state_AuthLayout_isSidebarCollapsed",
              "value": "isSidebarCollapsed: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_AuthLayout_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_AuthLayout_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_AuthLayout_useState",
              "value": "useState",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_AuthLayout_children",
          "name": "Children",
          "items": [
            {
              "id": "child_AuthLayout_SidebarSkeleton",
              "value": "SidebarSkeleton",
              "icon": "component"
            },
            {
              "id": "child_AuthLayout_Sidebar",
              "value": "Sidebar",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/layout.tsx",
        "name": "AuthLayout"
      }
    },
    {
      "id": "comp_SidebarSkeleton",
      "title": "SidebarSkeleton",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_SidebarSkeleton_children",
          "name": "Children",
          "items": [
            {
              "id": "child_SidebarSkeleton_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/layout.tsx",
        "name": "SidebarSkeleton"
      }
    },
    {
      "id": "comp_Sidebar",
      "title": "Sidebar",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Sidebar_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_Sidebar_isSidebarCollapsed",
              "value": "isSidebarCollapsed: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_Sidebar_toggleSidebar",
              "value": "toggleSidebar: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_Sidebar_state",
          "name": "State",
          "items": [
            {
              "id": "state_Sidebar_isMobileMenuOpen",
              "value": "isMobileMenuOpen: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_Sidebar_expandedAdminMenu",
              "value": "expandedAdminMenu: boolean = true",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_Sidebar_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_Sidebar_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Sidebar_usePathname",
              "value": "usePathname (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Sidebar_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Sidebar_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_Sidebar_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Sidebar_useAuthStore",
              "value": "useAuthStore (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_Sidebar_children",
          "name": "Children",
          "items": [
            {
              "id": "child_Sidebar_ThemeToggle",
              "value": "ThemeToggle",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/layout.tsx",
        "name": "Sidebar"
      }
    },
    {
      "id": "comp_renderNavItem",
      "title": "renderNavItem",
      "type": "component",
      "sections": [],
      "metadata": {
        "filePath": "app/(main)/(auth)/layout.tsx",
        "name": "renderNavItem"
      }
    },
    {
      "id": "comp_Login",
      "title": "Login",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_Login_state",
          "name": "State",
          "items": [
            {
              "id": "state_Login_isLoading",
              "value": "isLoading: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_Login_error",
              "value": "error: string = \"\"",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_Login_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_Login_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_Login_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Login_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_Login_useForm",
              "value": "useForm (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/login/page.tsx",
        "name": "Login"
      }
    },
    {
      "id": "comp_InviteSuccessCard",
      "title": "InviteSuccessCard",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-success-card.tsx",
        "name": "InviteSuccessCard"
      }
    },
    {
      "id": "comp_InviteRegistrationForm",
      "title": "InviteRegistrationForm",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_InviteRegistrationForm_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_InviteRegistrationForm_props",
              "value": "props: InviteRegistrationFormProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteRegistrationForm_animationStage",
              "value": "animationStage: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteRegistrationForm_inviteToken",
              "value": "inviteToken: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_InviteRegistrationForm_state",
          "name": "State",
          "items": [
            {
              "id": "state_InviteRegistrationForm_isSubmitting",
              "value": "isSubmitting: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_InviteRegistrationForm_registrationComplete",
              "value": "registrationComplete: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_InviteRegistrationForm_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_InviteRegistrationForm_useForm",
              "value": "useForm (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_InviteRegistrationForm_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_InviteRegistrationForm_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_InviteRegistrationForm_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_InviteRegistrationForm_children",
          "name": "Children",
          "items": [
            {
              "id": "child_InviteRegistrationForm_InviteSuccessCard",
              "value": "InviteSuccessCard",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-registration-form.tsx",
        "name": "InviteRegistrationForm"
      }
    },
    {
      "id": "comp_InvitePageClient",
      "title": "InvitePageClient",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_InvitePageClient_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_InvitePageClient_props",
              "value": "props: InvitePageClientProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InvitePageClient_inviteDetails",
              "value": "inviteDetails: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InvitePageClient_inviteToken",
              "value": "inviteToken: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_InvitePageClient_state",
          "name": "State",
          "items": [
            {
              "id": "state_InvitePageClient_animationStage",
              "value": "animationStage: number = 0",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_InvitePageClient_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_InvitePageClient_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_InvitePageClient_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_InvitePageClient_children",
          "name": "Children",
          "items": [
            {
              "id": "child_InvitePageClient_InviteRegistrationForm",
              "value": "InviteRegistrationForm",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-page-client.tsx",
        "name": "InvitePageClient"
      }
    },
    {
      "id": "comp_InviteHeader",
      "title": "InviteHeader",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_InviteHeader_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_InviteHeader_props",
              "value": "props: InviteHeaderProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteHeader_animationStage",
              "value": "animationStage: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteHeader_creatorName",
              "value": "creatorName: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteHeader_department",
              "value": "department: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_InviteHeader_role",
              "value": "role: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_InviteHeader_children",
          "name": "Children",
          "items": [
            {
              "id": "child_InviteHeader_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-header.tsx",
        "name": "InviteHeader"
      }
    },
    {
      "id": "comp_getRoleIcon",
      "title": "getRoleIcon",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-header.tsx",
        "name": "getRoleIcon"
      }
    },
    {
      "id": "comp_InviteErrorState",
      "title": "InviteErrorState",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_InviteErrorState_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_InviteErrorState_error",
              "value": "error: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/invite/[inviteToken]/_components/invite-error-state.tsx",
        "name": "InviteErrorState"
      }
    },
    {
      "id": "comp_RegistrationPage",
      "title": "RegistrationPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RegistrationPage_state",
          "name": "State",
          "items": [
            {
              "id": "state_RegistrationPage_departments",
              "value": "departments: array = []",
              "icon": "state"
            },
            {
              "id": "state_RegistrationPage_application",
              "value": "application: undefined",
              "icon": "state"
            },
            {
              "id": "state_RegistrationPage_isReapplying",
              "value": "isReapplying: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_RegistrationPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_RegistrationPage_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RegistrationPage_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RegistrationPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RegistrationPage_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_RegistrationPage_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_RegistrationPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_RegistrationPage_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/registration/page.tsx",
        "name": "RegistrationPage"
      }
    },
    {
      "id": "comp_UploadPage",
      "title": "UploadPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_UploadPage_state",
          "name": "State",
          "items": [
            {
              "id": "state_UploadPage_bilFile",
              "value": "bilFile: null = null",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_hdrFile",
              "value": "hdrFile: null = null",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_category",
              "value": "category: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_location",
              "value": "location: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_showSuccess",
              "value": "showSuccess: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_name",
              "value": "name: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_isDragging",
              "value": "isDragging: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_UploadPage_uploadStatus",
              "value": "uploadStatus: string = \"\"",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_UploadPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_UploadPage_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_UploadPage_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_UploadPage_useRef",
              "value": "useRef",
              "icon": "hook"
            },
            {
              "id": "hook_UploadPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_UploadPage_useFileUpload",
              "value": "useFileUpload (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_UploadPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_UploadPage_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/upload/page.tsx",
        "name": "UploadPage"
      }
    },
    {
      "id": "comp_ProfilePage",
      "title": "ProfilePage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ProfilePage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_ProfilePage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_ProfilePage_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_ProfilePage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ProfilePage_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/profile/page.tsx",
        "name": "ProfilePage"
      }
    },
    {
      "id": "comp_AdminPage",
      "title": "AdminPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_AdminPage_state",
          "name": "State",
          "items": [
            {
              "id": "state_AdminPage_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_AdminPage_approvalStats",
              "value": "approvalStats: null = null",
              "icon": "state"
            },
            {
              "id": "state_AdminPage_approvals",
              "value": "approvals: object = {}",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_AdminPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_AdminPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_AdminPage_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_AdminPage_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_AdminPage_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_AdminPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_AdminPage_Badge",
              "value": "Badge",
              "icon": "component"
            },
            {
              "id": "child_AdminPage_ApprovalCard",
              "value": "ApprovalCard",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/page.tsx",
        "name": "AdminPage"
      }
    },
    {
      "id": "comp_ApprovalCard",
      "title": "ApprovalCard",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ApprovalCard_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ApprovalCard_approval",
              "value": "approval: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ApprovalCard_showActions",
              "value": "showActions: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/page.tsx",
        "name": "ApprovalCard"
      }
    },
    {
      "id": "comp_DepartmentsPage",
      "title": "DepartmentsPage",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/page.tsx",
        "name": "DepartmentsPage"
      }
    },
    {
      "id": "comp_DashboardPage",
      "title": "DashboardPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DashboardPage_state",
          "name": "State",
          "items": [
            {
              "id": "state_DashboardPage_compareResults",
              "value": "compareResults: array = []",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_DashboardPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DashboardPage_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_DashboardPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DashboardPage_useMediaQuery",
              "value": "useMediaQuery (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DashboardPage_useAnalysis",
              "value": "useAnalysis (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DashboardPage_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DashboardPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DashboardPage_DashboardPageSkeleton",
              "value": "DashboardPageSkeleton",
              "icon": "component"
            },
            {
              "id": "child_DashboardPage_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/page.tsx",
        "name": "DashboardPage"
      }
    },
    {
      "id": "comp_DashboardPageSkeleton",
      "title": "DashboardPageSkeleton",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DashboardPageSkeleton_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DashboardPageSkeleton_itemCount",
              "value": "itemCount: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_DashboardPageSkeleton_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DashboardPageSkeleton_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/page.tsx",
        "name": "DashboardPageSkeleton"
      }
    },
    {
      "id": "comp_StatusCard",
      "title": "StatusCard",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_StatusCard_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_StatusCard_status",
              "value": "status: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_role",
              "value": "role: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_appliedAt",
              "value": "appliedAt: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_departmentName",
              "value": "departmentName: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_rejectionReason",
              "value": "rejectionReason: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_processedAt",
              "value": "processedAt: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_StatusCard_onReapply",
              "value": "onReapply: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_StatusCard_children",
          "name": "Children",
          "items": [
            {
              "id": "child_StatusCard_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/registration/_components/status-card.tsx",
        "name": "StatusCard"
      }
    },
    {
      "id": "comp_RegistrationForm",
      "title": "RegistrationForm",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RegistrationForm_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_RegistrationForm_onSubmit",
              "value": "onSubmit: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RegistrationForm_initialRole",
              "value": "initialRole: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RegistrationForm_departments",
              "value": "departments: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RegistrationForm_initialDepartment",
              "value": "initialDepartment: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_RegistrationForm_state",
          "name": "State",
          "items": [
            {
              "id": "state_RegistrationForm_role",
              "value": "role: initialRole",
              "icon": "state"
            },
            {
              "id": "state_RegistrationForm_departmentId",
              "value": "departmentId: undefined",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_RegistrationForm_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_RegistrationForm_useState",
              "value": "useState",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/registration/_components/registration-form.tsx",
        "name": "RegistrationForm"
      }
    },
    {
      "id": "comp_UsersPage",
      "title": "UsersPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_UsersPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_UsersPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_UsersPage_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_UsersPage_usePaginatedUsers",
              "value": "usePaginatedUsers (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_UsersPage_dependencies",
          "name": "Dependencies",
          "items": [
            {
              "id": "dep_UsersPage_Card",
              "value": "Card from '../../../../../components/ui/card'",
              "icon": "dependency"
            },
            {
              "id": "dep_UsersPage_CardContent",
              "value": "CardContent from '../../../../../components/ui/card'",
              "icon": "dependency"
            },
            {
              "id": "dep_UsersPage_CardDescription",
              "value": "CardDescription from '../../../../../components/ui/card'",
              "icon": "dependency"
            },
            {
              "id": "dep_UsersPage_CardHeader",
              "value": "CardHeader from '../../../../../components/ui/card'",
              "icon": "dependency"
            },
            {
              "id": "dep_UsersPage_CardTitle",
              "value": "CardTitle from '../../../../../components/ui/card'",
              "icon": "dependency"
            },
            {
              "id": "dep_UsersPage_DataTable",
              "value": "DataTable from './_components/data-table'",
              "icon": "dependency"
            }
          ]
        },
        {
          "id": "sec_comp_UsersPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_UsersPage_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/users/page.tsx",
        "name": "UsersPage"
      }
    },
    {
      "id": "comp_RequestsPage",
      "title": "RequestsPage",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/requests/page.tsx",
        "name": "RequestsPage"
      }
    },
    {
      "id": "comp_DepartmentList",
      "title": "DepartmentList",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DepartmentList_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DepartmentList_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentList_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentList_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DepartmentList_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/departments/_components/department-list.tsx",
        "name": "DepartmentList"
      }
    },
    {
      "id": "comp_DepartmentCard",
      "title": "DepartmentCard",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DepartmentCard_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DepartmentCard_department",
              "value": "department: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentCard_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DepartmentCard_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentCard_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentCard_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentCard_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DepartmentCard_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/_components/department-card.tsx",
        "name": "DepartmentCard"
      }
    },
    {
      "id": "comp_CreateDepartmentButton",
      "title": "CreateDepartmentButton",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_CreateDepartmentButton_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_CreateDepartmentButton_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_CreateDepartmentButton_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_CreateDepartmentButton_children",
          "name": "Children",
          "items": [
            {
              "id": "child_CreateDepartmentButton_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/_components/create-department-button.tsx",
        "name": "CreateDepartmentButton"
      }
    },
    {
      "id": "comp_EmptyState",
      "title": "EmptyState",
      "type": "component",
      "sections": [],
              "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/empty-state.tsx",
        "name": "EmptyState"
      }
    },
    {
      "id": "comp_DepartmentDetailPage",
      "title": "DepartmentDetailPage",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DepartmentDetailPage_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DepartmentDetailPage_params",
              "value": "params: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentDetailPage_state",
          "name": "State",
          "items": [
            {
              "id": "state_DepartmentDetailPage_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentDetailPage_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DepartmentDetailPage_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentDetailPage_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentDetailPage_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentDetailPage_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentDetailPage_useMemo",
              "value": "useMemo",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentDetailPage_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentDetailPage_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DepartmentDetailPage_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/page.tsx",
        "name": "DepartmentDetailPage"
      }
    },
    {
      "id": "comp_DataTable",
      "title": "DataTable",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DataTable_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DataTable_props",
              "value": "props: DataTableProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DataTable_columns",
              "value": "columns: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DataTable_data",
              "value": "data: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DataTable_pagination",
              "value": "pagination: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DataTable_onPaginationChange",
              "value": "onPaginationChange: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DataTable_totalPages",
              "value": "totalPages: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_DataTable_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DataTable_useDepartment",
              "value": "useDepartment (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DataTable_useReactTable",
              "value": "useReactTable (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/users/_components/data-table.tsx",
        "name": "DataTable"
      }
    },
    {
      "id": "comp_RequestList",
      "title": "RequestList",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RequestList_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_RequestList_props",
              "value": "props: RequestListProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestList_requests",
              "value": "requests: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_RequestList_state",
          "name": "State",
          "items": [
            {
              "id": "state_RequestList_requests",
              "value": "requests: requestList",
              "icon": "state"
            },
            {
              "id": "state_RequestList_loading",
              "value": "loading: boolean = true",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_RequestList_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_RequestList_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_RequestList_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RequestList_useRouter",
              "value": "useRouter (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RequestList_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_RequestList_useEffect",
              "value": "useEffect",
              "icon": "hook"
            },
            {
              "id": "hook_RequestList_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_RequestList_children",
          "name": "Children",
          "items": [
            {
              "id": "child_RequestList_RequestsLoading",
              "value": "RequestsLoading",
              "icon": "component"
            },
            {
              "id": "child_RequestList_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/admin/requests/_components/request-list.tsx",
        "name": "RequestList"
      }
    },
    {
      "id": "comp_RequestsLoading",
      "title": "RequestsLoading",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RequestsLoading_children",
          "name": "Children",
          "items": [
            {
              "id": "child_RequestsLoading_Skeleton",
              "value": "Skeleton",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/requests/_components/request-list.tsx",
        "name": "RequestsLoading"
      }
    },
    {
      "id": "comp_RequestCard",
      "title": "RequestCard",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_RequestCard_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_RequestCard_props",
              "value": "props: RequestCardProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestCard_request",
              "value": "request: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestCard_appliedAt",
              "value": "appliedAt: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestCard_processedAt",
              "value": "processedAt: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestCard_onApprove",
              "value": "onApprove: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_RequestCard_onReject",
              "value": "onReject: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_RequestCard_children",
          "name": "Children",
          "items": [
            {
              "id": "child_RequestCard_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/admin/requests/_components/request-card.tsx",
        "name": "RequestCard"
      }
    },
    {
      "id": "comp_PieChartComparison",
      "title": "PieChartComparison",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PieChartComparison_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PieChartComparison_props",
              "value": "props: ComparisonElementProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PieChartComparison_result1",
              "value": "result1: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PieChartComparison_result2",
              "value": "result2: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/comparison/pie-chart-comparison.tsx",
        "name": "PieChartComparison"
      }
    },
    {
      "id": "comp_renderCustomizedLabel",
      "title": "renderCustomizedLabel",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_renderCustomizedLabel_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_renderCustomizedLabel_cx",
              "value": "cx: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_cy",
              "value": "cy: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_midAngle",
              "value": "midAngle: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_innerRadius",
              "value": "innerRadius: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_outerRadius",
              "value": "outerRadius: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_percent",
              "value": "percent: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_name",
              "value": "name: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_renderCustomizedLabel_index",
              "value": "index: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/comparison/pie-chart-comparison.tsx",
        "name": "renderCustomizedLabel"
      }
    },
    {
      "id": "comp_ComparisonTable",
      "title": "ComparisonTable",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ComparisonTable_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ComparisonTable_props",
              "value": "props: ComparisonTableProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonTable_result1",
              "value": "result1: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonTable_result2",
              "value": "result2: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/comparison/comparison-table.tsx",
        "name": "ComparisonTable"
      }
    },
    {
      "id": "comp_ComparisonItem",
      "title": "ComparisonItem",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_ComparisonItem_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_ComparisonItem_props",
              "value": "props: ComparisonItemProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonItem_type",
              "value": "type: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonItem_title",
              "value": "title: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonItem_description",
              "value": "description: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_ComparisonItem_resultData",
              "value": "resultData: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_ComparisonItem_children",
          "name": "Children",
          "items": [
            {
              "id": "child_ComparisonItem_ComparisonTable",
              "value": "ComparisonTable",
              "icon": "component"
            },
            {
              "id": "child_ComparisonItem_PieChartComparison",
              "value": "PieChartComparison",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/comparison/comparison-item.tsx",
        "name": "ComparisonItem"
      }
    },
    {
      "id": "comp_BarChartComparison",
      "title": "BarChartComparison",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_BarChartComparison_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_BarChartComparison_props",
              "value": "props: ComparisonElementProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_BarChartComparison_result1",
              "value": "result1: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_BarChartComparison_result2",
              "value": "result2: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/dashboard/_components/comparison/bar-chart-comparison.tsx",
        "name": "BarChartComparison"
      }
    },
    {
      "id": "comp_PaginationControls",
      "title": "PaginationControls",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_PaginationControls_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_PaginationControls_props",
              "value": "props: PaginationControlProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationControls_pagination",
              "value": "pagination: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationControls_totalElements",
              "value": "totalElements: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_PaginationControls_onPaginationChange",
              "value": "onPaginationChange: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_PaginationControls_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_PaginationControls_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/_components/pagination-controls.tsx",
        "name": "PaginationControls"
      }
    },
    {
      "id": "comp_MemberList",
      "title": "MemberList",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_MemberList_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_MemberList_props",
              "value": "props: MemberListProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_MemberList_members",
              "value": "members: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_MemberList_onRemove",
              "value": "onRemove: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_MemberList_isAdmin",
              "value": "isAdmin: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_MemberList_isLoading",
              "value": "isLoading: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_MemberList_children",
          "name": "Children",
          "items": [
            {
              "id": "child_MemberList_Badge",
              "value": "Badge",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/_components/member-list.tsx",
        "name": "MemberList"
      }
    },
    {
      "id": "comp_FilterControls",
      "title": "FilterControls",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_FilterControls_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_FilterControls_props",
              "value": "props: FilterControlProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_FilterControls_searchQuery",
              "value": "searchQuery: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_FilterControls_onQueryChange",
              "value": "onQueryChange: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_FilterControls_onFilterChange",
              "value": "onFilterChange: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_FilterControls_roleFilter",
              "value": "roleFilter: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/_components/filter-controls.tsx",
        "name": "FilterControls"
      }
    },
    {
      "id": "comp_DepartmentMembers",
      "title": "DepartmentMembers",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DepartmentMembers_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DepartmentMembers_props",
              "value": "props: DepartmentMembersProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DepartmentMembers_department",
              "value": "department: any (required)",
              "icon": "prop"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentMembers_state",
          "name": "State",
          "items": [
            {
              "id": "state_DepartmentMembers_members",
              "value": "members: array = []",
              "icon": "state"
            },
            {
              "id": "state_DepartmentMembers_searchQuery",
              "value": "searchQuery: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_DepartmentMembers_roleFilter",
              "value": "roleFilter: string = \"\"",
              "icon": "state"
            },
            {
              "id": "state_DepartmentMembers_loading",
              "value": "loading: boolean = false",
              "icon": "state"
            },
            {
              "id": "state_DepartmentMembers_pagination",
              "value": "pagination: object = {}",
              "icon": "state"
            },
            {
              "id": "state_DepartmentMembers_totalElements",
              "value": "totalElements: number = 0",
              "icon": "state"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentMembers_hooks",
          "name": "Hooks",
          "items": [
            {
              "id": "hook_DepartmentMembers_useState",
              "value": "useState",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useAuth",
              "value": "useAuth (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useToast",
              "value": "useToast (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useModal",
              "value": "useModal (custom)",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useMemo",
              "value": "useMemo",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useCallback",
              "value": "useCallback",
              "icon": "hook"
            },
            {
              "id": "hook_DepartmentMembers_useEffect",
              "value": "useEffect",
              "icon": "hook"
            }
          ]
        },
        {
          "id": "sec_comp_DepartmentMembers_children",
          "name": "Children",
          "items": [
            {
              "id": "child_DepartmentMembers_FilterControls",
              "value": "FilterControls",
              "icon": "component"
            },
            {
              "id": "child_DepartmentMembers_MemberList",
              "value": "MemberList",
              "icon": "component"
            },
            {
              "id": "child_DepartmentMembers_PaginationControls",
              "value": "PaginationControls",
              "icon": "component"
            }
          ]
        }
      ],
      "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/_components/department-members.tsx",
        "name": "DepartmentMembers"
      }
    },
    {
      "id": "comp_DepartmentInfo",
      "title": "DepartmentInfo",
      "type": "component",
      "sections": [
        {
          "id": "sec_comp_DepartmentInfo_props",
          "name": "Props",
          "items": [
            {
              "id": "prop_DepartmentInfo_props",
              "value": "props: DepartmentInfoProps (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DepartmentInfo_description",
              "value": "description: any (required)",
              "icon": "prop"
            },
            {
              "id": "prop_DepartmentInfo_createdAt",
              "value": "createdAt: any (required)",
              "icon": "prop"
            }
          ]
        }
      ],
              "metadata": {
        "filePath": "app/(main)/(auth)/departments/[id]/_components/department-info.tsx",
        "name": "DepartmentInfo"
      }
    }
  ],
  "edges": [
    {
      "source": "comp_MainLayout",
      "target": "comp_AuthProvider",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_PaginationPrevious",
      "target": "comp_PaginationLink",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_PaginationNext",
      "target": "comp_PaginationLink",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ChartStyle",
      "target": "comp_ChartStyle",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ResultDetailsModal",
      "target": "comp_DialogHeader",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RemoveMemberModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RemoveMemberModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_InviteMemberModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_InviteMemberModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ImagePreviewModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditUserModal",
      "target": "comp_DialogHeader",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditUserModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditProfileModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditProfileModal",
      "target": "comp_DialogFooter",
      "type": "renders",
              "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditDepartmentModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_EditDepartmentModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DeleteUserModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DeleteUserModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DeleteDepartmentModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DeleteDepartmentModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_CreateDepartmentModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_CreateDepartmentModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ApplicationRejectionModal",
      "target": "comp_DialogHeader",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ApplicationRejectionModal",
      "target": "comp_DialogFooter",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_ImagePreviewModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_ResultDetailsModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_ApplicationRejectionModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_CreateDepartmentModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_EditDepartmentModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_DeleteDepartmentModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_EditUserModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_DeleteUserModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_EditProfileModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_InviteMemberModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ModalProvider",
      "target": "comp_RemoveMemberModal",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_AuthLayout",
      "target": "comp_SidebarSkeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_AuthLayout",
      "target": "comp_Sidebar",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_SidebarSkeleton",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_Sidebar",
      "target": "comp_ThemeToggle",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_InviteRegistrationForm",
      "target": "comp_InviteSuccessCard",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_InvitePageClient",
      "target": "comp_InviteRegistrationForm",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_InviteHeader",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RegistrationPage",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_UploadPage",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ProfilePage",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_AdminPage",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_AdminPage",
      "target": "comp_ApprovalCard",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DashboardPage",
      "target": "comp_DashboardPageSkeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DashboardPage",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DashboardPageSkeleton",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_StatusCard",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_UsersPage",
      "target": "comp_DataTable",
      "type": "dependency",
      "metadata": {
        "path": "./_components/data-table",
        "isExternal": false
      }
    },
    {
      "source": "comp_UsersPage",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentList",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentCard",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_CreateDepartmentButton",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentDetailPage",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RequestList",
      "target": "comp_RequestsLoading",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RequestList",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RequestsLoading",
      "target": "comp_Skeleton",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_RequestCard",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ComparisonItem",
      "target": "comp_ComparisonTable",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_ComparisonItem",
      "target": "comp_PieChartComparison",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_MemberList",
      "target": "comp_Badge",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentMembers",
      "target": "comp_FilterControls",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentMembers",
      "target": "comp_MemberList",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    },
    {
      "source": "comp_DepartmentMembers",
      "target": "comp_PaginationControls",
      "type": "renders",
      "metadata": {
        "relationship": "parent-child"
      }
    }
  ],
  "metadata": {
    "projectType": "typescript",
    "projectName": "React TypeScript Project",
    "convertedAt": "2025-04-08T01:01:45.358Z",
    "originalFormat": {}
  }
};

// Sample for Java project
export const javaProjectSample: GraphData = {
  "nodes": [
    {
      "id": "java_com_sample_book_TextBook",
      "title": "TextBook",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_book_TextBook_info",
          "name": "Class Info",
          "items": [
            {
              "id": "extends_com_sample_book_TextBook_extends",
              "value": "extends Book",
              "icon": "inheritance"
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_TextBook_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_book_TextBook_subject",
              "value": "private String subject",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_TextBook_edition",
              "value": "private String edition",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_TextBook_usedInCourses",
              "value": "private Course> usedInCourses",
              "icon": "field",
              "metadata": {
                "type": "java.util.List<com.sample.book.Course>"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_TextBook_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_book_TextBook__init_",
              "value": "public TextBook(String, String, String, int, String, String, String)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_book_TextBook_calculateLateFee",
              "value": "public calculateLateFee(int): double",
              "icon": "method",
              "metadata": {
                "returnType": "double",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_TextBook_addCourseReference",
              "value": "public addCourseReference(Course): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_TextBook_isCurrentEdition",
              "value": "public isCurrentEdition(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_TextBook_generateBookOrder",
              "value": "public generateBookOrder(int): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_TextBook_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_book_TextBook_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_book_TextBook_java_util",
              "value": "java.util",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.book.TextBook",
        "packageName": "com.sample.book",
        "sourceFile": "TextBook.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "com.sample.book.Book",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.book.Course"
        ],
        "incomingDependencies": [
          "com.sample.user.Faculty",
          "com.sample.book.Course"
        ]
      }
    },
    {
      "id": "java_com_sample_book_BookReview",
      "title": "BookReview",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_book_BookReview_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_book_BookReview_reviewId",
              "value": "private String reviewId",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_BookReview_reviewer",
              "value": "private User reviewer",
              "icon": "field",
              "metadata": {
                "type": "com.sample.user.User"
              }
            },
            {
              "id": "field_com_sample_book_BookReview_book",
              "value": "private Book book",
              "icon": "field",
              "metadata": {
                "type": "com.sample.book.Book"
              }
            },
            {
              "id": "field_com_sample_book_BookReview_content",
              "value": "private String content",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_BookReview_rating",
              "value": "private int rating",
              "icon": "field",
              "metadata": {
                "type": "int"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_BookReview_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_book_BookReview__init_",
              "value": "public BookReview(String, User, Book, String, int)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_book_BookReview_updateReview",
              "value": "public updateReview(String, int): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_BookReview_isValidRating",
              "value": "public isValidRating(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_BookReview_formatReview",
              "value": "public formatReview(): String",
              "icon": "method",
              "metadata": {
                "returnType": "java.lang.String",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_BookReview_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_book_BookReview_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_book_BookReview_com_sample_user",
              "value": "com.sample.user",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.book.BookReview",
        "packageName": "com.sample.book",
        "sourceFile": "BookReview.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.user.User",
          "com.sample.book.Book"
        ],
        "incomingDependencies": [
          "com.sample.book.Book"
        ]
      }
    },
    {
      "id": "java_com_sample_book_Department",
      "title": "Department",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_book_Department_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_book_Department_departmentId",
              "value": "private String departmentId",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_Department_name",
              "value": "private String name",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_Department_head",
              "value": "private Faculty head",
              "icon": "field",
              "metadata": {
                "type": "com.sample.user.Faculty"
              }
            },
            {
              "id": "field_com_sample_book_Department_courses",
              "value": "private Course> courses",
              "icon": "field",
              "metadata": {
                "type": "java.util.List<com.sample.book.Course>"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_Department_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_book_Department__init_",
              "value": "public Department(String, String)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_book_Department_assignDepartmentHead",
              "value": "public assignDepartmentHead(Faculty): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_Department_addCourse",
              "value": "public addCourse(Course): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_Department_getAllFacultyMembers",
              "value": "public getAllFacultyMembers(): Faculty>",
              "icon": "method",
              "metadata": {
                "returnType": "java.util.List<com.sample.user.Faculty>",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_Department_generateDepartmentReport",
              "value": "public generateDepartmentReport(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_Department_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_book_Department_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_book_Department_java_util",
              "value": "java.util",
              "icon": "package"
            },
            {
              "id": "import_com_sample_book_Department_com_sample_user",
              "value": "com.sample.user",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.book.Department",
        "packageName": "com.sample.book",
        "sourceFile": "Department.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.user.Faculty",
          "com.sample.book.Course"
        ],
        "incomingDependencies": [
          "com.sample.user.Student",
          "com.sample.user.Faculty"
        ]
      }
    },
    {
      "id": "java_com_sample_book_LibraryItem",
      "title": "LibraryItem",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_book_LibraryItem_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_book_LibraryItem_itemId",
              "value": "protected String itemId",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_LibraryItem_title",
              "value": "protected String title",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_LibraryItem_publisher",
              "value": "protected String publisher",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_LibraryItem_year",
              "value": "protected int year",
              "icon": "field",
              "metadata": {
                "type": "int"
              }
            },
            {
              "id": "field_com_sample_book_LibraryItem_status",
              "value": "protected ItemStatus status",
              "icon": "field",
              "metadata": {
                "type": "com.sample.book.ItemStatus"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_LibraryItem_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_book_LibraryItem__init_",
              "value": "public LibraryItem(String, String, String, int)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_book_LibraryItem_updateStatus",
              "value": "public updateStatus(ItemStatus): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_LibraryItem_isAvailable",
              "value": "public isAvailable(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_LibraryItem_generateItemBarcode",
              "value": "public generateItemBarcode(): String",
              "icon": "method",
              "metadata": {
                "returnType": "java.lang.String",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_LibraryItem_calculateLateFee",
              "value": "public abstract calculateLateFee(int): double",
              "icon": "method",
              "metadata": {
                "returnType": "double",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_LibraryItem_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_book_LibraryItem_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_book_LibraryItem_java_lang_invoke",
              "value": "java.lang.invoke",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.book.LibraryItem",
        "packageName": "com.sample.book",
        "sourceFile": "LibraryItem.java",
        "isAbstract": true,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.book.ItemStatus"
        ],
        "incomingDependencies": [
          "com.sample.Library",
          "com.sample.loan.Loan"
        ]
      }
    },
    {
      "id": "java_com_sample_book_ItemStatus",
      "title": "ItemStatus",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_book_ItemStatus_info",
          "name": "Class Info",
          "items": [
            {
              "id": "extends_com_sample_book_ItemStatus_extends",
              "value": "extends Enum",
              "icon": "inheritance"
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_ItemStatus_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_book_ItemStatus_AVAILABLE",
              "value": "public static final ItemStatus AVAILABLE",
              "icon": "field",
              "metadata": {
                "type": "com.sample.book.ItemStatus"
              }
            },
            {
              "id": "field_com_sample_book_ItemStatus_BORROWED",
              "value": "public static final ItemStatus BORROWED",
              "icon": "field",
              "metadata": {
                "type": "com.sample.book.ItemStatus"
              }
            },
            {
              "id": "field_com_sample_book_ItemStatus_RESERVED",
              "value": "public static final ItemStatus RESERVED",
              "icon": "field",
              "metadata": {
                "type": "com.sample.book.ItemStatus"
              }
            },
            {
              "id": "field_com_sample_book_ItemStatus_MAINTENANCE",
              "value": "public static final ItemStatus MAINTENANCE",
              "icon": "field",
              "metadata": {
                "type": "com.sample.book.ItemStatus"
              }
            },
            {
              "id": "field_com_sample_book_ItemStatus_ENUM_VALUES",
              "value": "private static final ItemStatus[] ENUM$VALUES",
              "icon": "field",
              "metadata": {
                "type": "com.sample.book.ItemStatus[]"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_ItemStatus_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_book_ItemStatus__clinit_",
              "value": "default static <clinit>(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_ItemStatus__init_",
              "value": "private ItemStatus(String, int)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_book_ItemStatus_values",
              "value": "public static values(): ItemStatus[]",
              "icon": "method",
              "metadata": {
                "returnType": "com.sample.book.ItemStatus[]",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_ItemStatus_valueOf",
              "value": "public static valueOf(String): ItemStatus",
              "icon": "method",
              "metadata": {
                "returnType": "com.sample.book.ItemStatus",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_ItemStatus_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_book_ItemStatus_java_lang",
              "value": "java.lang",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.book.ItemStatus",
        "packageName": "com.sample.book",
        "sourceFile": "ItemStatus.java",
        "isAbstract": false,
        "isFinal": true,
        "superClassName": "java.lang.Enum",
        "interfaces": [],
        "outGoingDependencies": [],
        "incomingDependencies": [
          "com.sample.book.LibraryItem"
        ]
      }
    },
    {
      "id": "java_com_sample_book_Course",
      "title": "Course",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_book_Course_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_book_Course_courseId",
              "value": "private String courseId",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_Course_name",
              "value": "private String name",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_Course_instructor",
              "value": "private Faculty instructor",
              "icon": "field",
              "metadata": {
                "type": "com.sample.user.Faculty"
              }
            },
            {
              "id": "field_com_sample_book_Course_requiredBooks",
              "value": "private TextBook> requiredBooks",
              "icon": "field",
              "metadata": {
                "type": "java.util.List<com.sample.book.TextBook>"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_Course_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_book_Course__init_",
              "value": "public Course(String, String, Faculty)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_book_Course_addRequiredBook",
              "value": "public addRequiredBook(TextBook): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_Course_updateInstructor",
              "value": "public updateInstructor(Faculty): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_Course_getEnrolledStudents",
              "value": "public getEnrolledStudents(): Student>",
              "icon": "method",
              "metadata": {
                "returnType": "java.util.List<com.sample.user.Student>",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_Course_generateSyllabus",
              "value": "public generateSyllabus(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_Course_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_book_Course_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_book_Course_java_util",
              "value": "java.util",
              "icon": "package"
            },
            {
              "id": "import_com_sample_book_Course_com_sample_user",
              "value": "com.sample.user",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.book.Course",
        "packageName": "com.sample.book",
        "sourceFile": "Course.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.book.TextBook",
          "com.sample.user.Student",
          "com.sample.user.Faculty"
        ],
        "incomingDependencies": [
          "com.sample.book.TextBook",
          "com.sample.book.Department",
          "com.sample.user.Student",
          "com.sample.user.Faculty"
        ]
      }
    },
    {
      "id": "java_com_sample_book_Book",
      "title": "Book",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_book_Book_info",
          "name": "Class Info",
          "items": [
            {
              "id": "extends_com_sample_book_Book_extends",
              "value": "extends LibraryItem",
              "icon": "inheritance"
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_Book_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_book_Book_author",
              "value": "private String author",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_Book_isbn",
              "value": "private String isbn",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_book_Book_reviews",
              "value": "private BookReview> reviews",
              "icon": "field",
              "metadata": {
                "type": "java.util.List<com.sample.book.BookReview>"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_Book_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_book_Book__init_",
              "value": "public Book(String, String, String, int, String)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_book_Book_calculateLateFee",
              "value": "public calculateLateFee(int): double",
              "icon": "method",
              "metadata": {
                "returnType": "double",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_Book_addReview",
              "value": "public addReview(BookReview): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_Book_getAverageRating",
              "value": "public getAverageRating(): double",
              "icon": "method",
              "metadata": {
                "returnType": "double",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_book_Book_generateCatalogEntry",
              "value": "public generateCatalogEntry(): String",
              "icon": "method",
              "metadata": {
                "returnType": "java.lang.String",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_book_Book_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_book_Book_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_book_Book_java_util",
              "value": "java.util",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.book.Book",
        "packageName": "com.sample.book",
        "sourceFile": "Book.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "com.sample.book.LibraryItem",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.book.BookReview"
        ],
        "incomingDependencies": [
          "com.sample.book.BookReview",
          "com.sample.user.Student",
          "com.sample.user.Faculty"
        ]
      }
    },
    {
      "id": "java_com_sample_Library",
      "title": "Library",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_Library_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_Library_name",
              "value": "private String name",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_Library_address",
              "value": "private Address address",
              "icon": "field",
              "metadata": {
                "type": "com.sample.user.Address"
              }
            },
            {
              "id": "field_com_sample_Library_items",
              "value": "private LibraryItem> items",
              "icon": "field",
              "metadata": {
                "type": "java.util.List<com.sample.book.LibraryItem>"
              }
            },
            {
              "id": "field_com_sample_Library_users",
              "value": "private User> users",
              "icon": "field",
              "metadata": {
                "type": "java.util.List<com.sample.user.User>"
              }
            },
            {
              "id": "field_com_sample_Library_activeLoans",
              "value": "private Loan> activeLoans",
              "icon": "field",
              "metadata": {
                "type": "java.util.List<com.sample.loan.Loan>"
              }
            },
            {
              "id": "field_com_sample_Library_outstandingFines",
              "value": "private Fine> outstandingFines",
              "icon": "field",
              "metadata": {
                "type": "java.util.List<com.sample.fine.Fine>"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_Library_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_Library__init_",
              "value": "public Library(String, Address)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_Library_addNewItem",
              "value": "public addNewItem(LibraryItem): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_Library_registerUser",
              "value": "public registerUser(User): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_Library_createLoan",
              "value": "public createLoan(User, LibraryItem): Loan",
              "icon": "method",
              "metadata": {
                "returnType": "com.sample.loan.Loan",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_Library_processReturn",
              "value": "public processReturn(Loan): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_Library_generateLoanId",
              "value": "private generateLoanId(): String",
              "icon": "method",
              "metadata": {
                "returnType": "java.lang.String",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_Library_generateFineId",
              "value": "private generateFineId(): String",
              "icon": "method",
              "metadata": {
                "returnType": "java.lang.String",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_Library_searchCatalog",
              "value": "public searchCatalog(String): LibraryItem>",
              "icon": "method",
              "metadata": {
                "returnType": "java.util.List<com.sample.book.LibraryItem>",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_Library_generateDailyReport",
              "value": "public generateDailyReport(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_Library_sendOverdueNotifications",
              "value": "public sendOverdueNotifications(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_Library_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_Library_com_sample_book",
              "value": "com.sample.book",
              "icon": "package"
            },
            {
              "id": "import_com_sample_Library_com_sample_loan",
              "value": "com.sample.loan",
              "icon": "package"
            },
            {
              "id": "import_com_sample_Library_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_Library_java_util",
              "value": "java.util",
              "icon": "package"
            },
            {
              "id": "import_com_sample_Library_com_sample_fine",
              "value": "com.sample.fine",
              "icon": "package"
            },
            {
              "id": "import_com_sample_Library_com_sample_user",
              "value": "com.sample.user",
              "icon": "package"
            },
            {
              "id": "import_com_sample_Library_java_lang_invoke",
              "value": "java.lang.invoke",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.Library",
        "packageName": "com.sample",
        "sourceFile": "Library.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.fine.Fine",
          "com.sample.book.LibraryItem",
          "com.sample.loan.Loan",
          "com.sample.user.User",
          "com.sample.user.Address"
        ],
        "incomingDependencies": []
      }
    },
    {
      "id": "java_com_sample_loan_LoanStatus",
      "title": "LoanStatus",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_loan_LoanStatus_info",
          "name": "Class Info",
          "items": [
            {
              "id": "extends_com_sample_loan_LoanStatus_extends",
              "value": "extends Enum",
              "icon": "inheritance"
            }
          ]
        },
        {
          "id": "sec_java_com_sample_loan_LoanStatus_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_loan_LoanStatus_ACTIVE",
              "value": "public static final LoanStatus ACTIVE",
              "icon": "field",
              "metadata": {
                "type": "com.sample.loan.LoanStatus"
              }
            },
            {
              "id": "field_com_sample_loan_LoanStatus_RETURNED",
              "value": "public static final LoanStatus RETURNED",
              "icon": "field",
              "metadata": {
                "type": "com.sample.loan.LoanStatus"
              }
            },
            {
              "id": "field_com_sample_loan_LoanStatus_OVERDUE",
              "value": "public static final LoanStatus OVERDUE",
              "icon": "field",
              "metadata": {
                "type": "com.sample.loan.LoanStatus"
              }
            },
            {
              "id": "field_com_sample_loan_LoanStatus_ENUM_VALUES",
              "value": "private static final LoanStatus[] ENUM$VALUES",
              "icon": "field",
              "metadata": {
                "type": "com.sample.loan.LoanStatus[]"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_loan_LoanStatus_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_loan_LoanStatus__clinit_",
              "value": "default static <clinit>(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_loan_LoanStatus__init_",
              "value": "private LoanStatus(String, int)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_loan_LoanStatus_values",
              "value": "public static values(): LoanStatus[]",
              "icon": "method",
              "metadata": {
                "returnType": "com.sample.loan.LoanStatus[]",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_loan_LoanStatus_valueOf",
              "value": "public static valueOf(String): LoanStatus",
              "icon": "method",
              "metadata": {
                "returnType": "com.sample.loan.LoanStatus",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_loan_LoanStatus_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_loan_LoanStatus_java_lang",
              "value": "java.lang",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.loan.LoanStatus",
        "packageName": "com.sample.loan",
        "sourceFile": "LoanStatus.java",
        "isAbstract": false,
        "isFinal": true,
        "superClassName": "java.lang.Enum",
        "interfaces": [],
        "outGoingDependencies": [],
        "incomingDependencies": []
      }
    },
    {
      "id": "java_com_sample_loan_Loan",
      "title": "Loan",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_loan_Loan_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_loan_Loan_loanId",
              "value": "private String loanId",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_loan_Loan_borrower",
              "value": "private User borrower",
              "icon": "field",
              "metadata": {
                "type": "com.sample.user.User"
              }
            },
            {
              "id": "field_com_sample_loan_Loan_item",
              "value": "private LibraryItem item",
              "icon": "field",
              "metadata": {
                "type": "com.sample.book.LibraryItem"
              }
            },
            {
              "id": "field_com_sample_loan_Loan_borrowDate",
              "value": "private LocalDate borrowDate",
              "icon": "field",
              "metadata": {
                "type": "java.time.LocalDate"
              }
            },
            {
              "id": "field_com_sample_loan_Loan_dueDate",
              "value": "private LocalDate dueDate",
              "icon": "field",
              "metadata": {
                "type": "java.time.LocalDate"
              }
            },
            {
              "id": "field_com_sample_loan_Loan_status",
              "value": "private LoanStatus status",
              "icon": "field",
              "metadata": {
                "type": "com.sample.loan.LoanStatus"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_loan_Loan_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_loan_Loan__init_",
              "value": "public Loan(String, User, LibraryItem)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_loan_Loan_extendLoan",
              "value": "public extendLoan(int): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_loan_Loan_isOverdue",
              "value": "public isOverdue(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_loan_Loan_returnItem",
              "value": "public returnItem(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_loan_Loan_calculateOverdueFee",
              "value": "public calculateOverdueFee(): double",
              "icon": "method",
              "metadata": {
                "returnType": "double",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_loan_Loan_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_loan_Loan_com_sample_book",
              "value": "com.sample.book",
              "icon": "package"
            },
            {
              "id": "import_com_sample_loan_Loan_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_loan_Loan_java_time",
              "value": "java.time",
              "icon": "package"
            },
            {
              "id": "import_com_sample_loan_Loan_com_sample_user",
              "value": "com.sample.user",
              "icon": "package"
            },
            {
              "id": "import_com_sample_loan_Loan_java_time_temporal",
              "value": "java.time.temporal",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.loan.Loan",
        "packageName": "com.sample.loan",
        "sourceFile": "Loan.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.loan.LoanStatus",
          "com.sample.book.LibraryItem",
          "com.sample.user.User"
        ],
        "incomingDependencies": [
          "com.sample.Library",
          "com.sample.fine.Fine"
        ]
      }
    },
    {
      "id": "java_com_sample_fine_Fine",
      "title": "Fine",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_fine_Fine_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_fine_Fine_fineId",
              "value": "private String fineId",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_fine_Fine_loan",
              "value": "private Loan loan",
              "icon": "field",
              "metadata": {
                "type": "com.sample.loan.Loan"
              }
            },
            {
              "id": "field_com_sample_fine_Fine_amount",
              "value": "default double amount",
              "icon": "field",
              "metadata": {
                "type": "double"
              }
            },
            {
              "id": "field_com_sample_fine_Fine_isPaid",
              "value": "private boolean isPaid",
              "icon": "field",
              "metadata": {
                "type": "boolean"
              }
            },
            {
              "id": "field_com_sample_fine_Fine_issueDate",
              "value": "private LocalDate issueDate",
              "icon": "field",
              "metadata": {
                "type": "java.time.LocalDate"
              }
            },
            {
              "id": "field_com_sample_fine_Fine_payment",
              "value": "private Payment payment",
              "icon": "field",
              "metadata": {
                "type": "com.sample.fine.Payment"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_fine_Fine_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_fine_Fine__init_",
              "value": "public Fine(String, Loan, double)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_fine_Fine_processPayment",
              "value": "public processPayment(Payment): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_fine_Fine_calculateLateFee",
              "value": "public calculateLateFee(): double",
              "icon": "method",
              "metadata": {
                "returnType": "double",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_fine_Fine_sendReminderNotification",
              "value": "public sendReminderNotification(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_fine_Fine_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_fine_Fine_com_sample_loan",
              "value": "com.sample.loan",
              "icon": "package"
            },
            {
              "id": "import_com_sample_fine_Fine_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_fine_Fine_java_time",
              "value": "java.time",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.fine.Fine",
        "packageName": "com.sample.fine",
        "sourceFile": "Fine.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.loan.Loan",
          "com.sample.fine.Payment"
        ],
        "incomingDependencies": [
          "com.sample.Library",
          "com.sample.fine.Payment"
        ]
      }
    },
    {
      "id": "java_com_sample_fine_PaymentMethod",
      "title": "PaymentMethod",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_fine_PaymentMethod_info",
          "name": "Class Info",
          "items": [
            {
              "id": "extends_com_sample_fine_PaymentMethod_extends",
              "value": "extends Enum",
              "icon": "inheritance"
            }
          ]
        },
        {
          "id": "sec_java_com_sample_fine_PaymentMethod_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_fine_PaymentMethod_CASH",
              "value": "public static final PaymentMethod CASH",
              "icon": "field",
              "metadata": {
                "type": "com.sample.fine.PaymentMethod"
              }
            },
            {
              "id": "field_com_sample_fine_PaymentMethod_CREDIT_CARD",
              "value": "public static final PaymentMethod CREDIT_CARD",
              "icon": "field",
              "metadata": {
                "type": "com.sample.fine.PaymentMethod"
              }
            },
            {
              "id": "field_com_sample_fine_PaymentMethod_DEBIT_CARD",
              "value": "public static final PaymentMethod DEBIT_CARD",
              "icon": "field",
              "metadata": {
                "type": "com.sample.fine.PaymentMethod"
              }
            },
            {
              "id": "field_com_sample_fine_PaymentMethod_ONLINE_TRANSFER",
              "value": "public static final PaymentMethod ONLINE_TRANSFER",
              "icon": "field",
              "metadata": {
                "type": "com.sample.fine.PaymentMethod"
              }
            },
            {
              "id": "field_com_sample_fine_PaymentMethod_ENUM_VALUES",
              "value": "private static final PaymentMethod[] ENUM$VALUES",
              "icon": "field",
              "metadata": {
                "type": "com.sample.fine.PaymentMethod[]"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_fine_PaymentMethod_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_fine_PaymentMethod__clinit_",
              "value": "default static <clinit>(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_fine_PaymentMethod__init_",
              "value": "private PaymentMethod(String, int)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_fine_PaymentMethod_values",
              "value": "public static values(): PaymentMethod[]",
              "icon": "method",
              "metadata": {
                "returnType": "com.sample.fine.PaymentMethod[]",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_fine_PaymentMethod_valueOf",
              "value": "public static valueOf(String): PaymentMethod",
              "icon": "method",
              "metadata": {
                "returnType": "com.sample.fine.PaymentMethod",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_fine_PaymentMethod_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_fine_PaymentMethod_java_lang",
              "value": "java.lang",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.fine.PaymentMethod",
        "packageName": "com.sample.fine",
        "sourceFile": "PaymentMethod.java",
        "isAbstract": false,
        "isFinal": true,
        "superClassName": "java.lang.Enum",
        "interfaces": [],
        "outGoingDependencies": [],
        "incomingDependencies": [
          "com.sample.fine.Payment"
        ]
      }
    },
    {
      "id": "java_com_sample_fine_Payment",
      "title": "Payment",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_fine_Payment_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_fine_Payment_paymentId",
              "value": "private String paymentId",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_fine_Payment_fine",
              "value": "private Fine fine",
              "icon": "field",
              "metadata": {
                "type": "com.sample.fine.Fine"
              }
            },
            {
              "id": "field_com_sample_fine_Payment_amount",
              "value": "private double amount",
              "icon": "field",
              "metadata": {
                "type": "double"
              }
            },
            {
              "id": "field_com_sample_fine_Payment_paymentDate",
              "value": "private LocalDateTime paymentDate",
              "icon": "field",
              "metadata": {
                "type": "java.time.LocalDateTime"
              }
            },
            {
              "id": "field_com_sample_fine_Payment_method",
              "value": "private PaymentMethod method",
              "icon": "field",
              "metadata": {
                "type": "com.sample.fine.PaymentMethod"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_fine_Payment_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_fine_Payment__init_",
              "value": "public Payment(String, Fine, double)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_fine_Payment_validatePayment",
              "value": "public validatePayment(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_fine_Payment_generateReceipt",
              "value": "public generateReceipt(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_fine_Payment_recordTransaction",
              "value": "public recordTransaction(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_fine_Payment_processRefund",
              "value": "public processRefund(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_fine_Payment_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_fine_Payment_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_fine_Payment_java_time",
              "value": "java.time",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.fine.Payment",
        "packageName": "com.sample.fine",
        "sourceFile": "Payment.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.fine.Fine",
          "com.sample.fine.PaymentMethod"
        ],
        "incomingDependencies": [
          "com.sample.fine.Fine"
        ]
      }
    },
    {
      "id": "java_com_sample_Main",
      "title": "Main",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_Main_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_Main__init_",
              "value": "public Main()",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_Main_main",
              "value": "public static main(String[]): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_Main_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_Main_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_Main_java_io",
              "value": "java.io",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.Main",
        "packageName": "com.sample",
        "sourceFile": "Main.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [],
        "incomingDependencies": []
      }
    },
    {
      "id": "java_com_sample_user_Student",
      "title": "Student",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_user_Student_info",
          "name": "Class Info",
          "items": [
            {
              "id": "extends_com_sample_user_Student_extends",
              "value": "extends User",
              "icon": "inheritance"
            }
          ]
        },
        {
          "id": "sec_java_com_sample_user_Student_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_user_Student_studentId",
              "value": "private String studentId",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_user_Student_department",
              "value": "private Department department",
              "icon": "field",
              "metadata": {
                "type": "com.sample.book.Department"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_user_Student_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_user_Student__init_",
              "value": "public Student(String, String, String, Address, String, Department)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_user_Student_canBorrowBooks",
              "value": "public canBorrowBooks(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_Student_getCheckedOutBooks",
              "value": "public getCheckedOutBooks(): Book>",
              "icon": "method",
              "metadata": {
                "returnType": "java.util.List<com.sample.book.Book>",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_Student_isEligibleForNewLoan",
              "value": "public isEligibleForNewLoan(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_Student_enrollInCourse",
              "value": "public enrollInCourse(Course): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_Student_generateStudentLibraryCard",
              "value": "public generateStudentLibraryCard(): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_user_Student_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_user_Student_com_sample_book",
              "value": "com.sample.book",
              "icon": "package"
            },
            {
              "id": "import_com_sample_user_Student_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_user_Student_java_util",
              "value": "java.util",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.user.Student",
        "packageName": "com.sample.user",
        "sourceFile": "Student.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "com.sample.user.User",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.book.Department",
          "com.sample.book.Course",
          "com.sample.book.Book",
          "com.sample.user.Address"
        ],
        "incomingDependencies": [
          "com.sample.user.Faculty"
        ]
      }
    },
    {
      "id": "java_com_sample_user_Faculty",
      "title": "Faculty",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_user_Faculty_info",
          "name": "Class Info",
          "items": [
            {
              "id": "extends_com_sample_user_Faculty_extends",
              "value": "extends User",
              "icon": "inheritance"
            }
          ]
        },
        {
          "id": "sec_java_com_sample_user_Faculty_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_user_Faculty_facultyId",
              "value": "private String facultyId",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_user_Faculty_department",
              "value": "private Department department",
              "icon": "field",
              "metadata": {
                "type": "com.sample.book.Department"
              }
            },
            {
              "id": "field_com_sample_user_Faculty_courses",
              "value": "private Course> courses",
              "icon": "field",
              "metadata": {
                "type": "java.util.List<com.sample.book.Course>"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_user_Faculty_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_user_Faculty__init_",
              "value": "public Faculty(String, String, String, Address, String, Department)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_user_Faculty_canBorrowBooks",
              "value": "public canBorrowBooks(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_Faculty_assignCourse",
              "value": "public assignCourse(Course): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_Faculty_getRequestedTextBooks",
              "value": "public getRequestedTextBooks(): TextBook>",
              "icon": "method",
              "metadata": {
                "returnType": "java.util.List<com.sample.book.TextBook>",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_Faculty_submitBookRequest",
              "value": "public submitBookRequest(Book): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_Faculty_getEnrolledStudents",
              "value": "public getEnrolledStudents(): Student>",
              "icon": "method",
              "metadata": {
                "returnType": "java.util.List<com.sample.user.Student>",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_user_Faculty_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_user_Faculty_com_sample_book",
              "value": "com.sample.book",
              "icon": "package"
            },
            {
              "id": "import_com_sample_user_Faculty_java_lang",
              "value": "java.lang",
              "icon": "package"
            },
            {
              "id": "import_com_sample_user_Faculty_java_util",
              "value": "java.util",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.user.Faculty",
        "packageName": "com.sample.user",
        "sourceFile": "Faculty.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "com.sample.user.User",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.book.TextBook",
          "com.sample.book.Department",
          "com.sample.user.Student",
          "com.sample.book.Course",
          "com.sample.book.Book",
          "com.sample.user.Address"
        ],
        "incomingDependencies": []
      }
    },
    {
      "id": "java_com_sample_user_User",
      "title": "User",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_user_User_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_user_User_id",
              "value": "protected String id",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_user_User_name",
              "value": "public String name",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_user_User_email",
              "value": "protected String email",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_user_User_address",
              "value": "protected Address address",
              "icon": "field",
              "metadata": {
                "type": "com.sample.user.Address"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_user_User_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_user_User__init_",
              "value": "public User(String, String, String, Address)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_user_User_generateUserReport",
              "value": "public generateUserReport(): String",
              "icon": "method",
              "metadata": {
                "returnType": "java.lang.String",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_User_updateContactInfo",
              "value": "public updateContactInfo(String, Address): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_User_validateUserCredentials",
              "value": "public validateUserCredentials(String, String): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_User_getName",
              "value": "public getName(): String",
              "icon": "method",
              "metadata": {
                "returnType": "java.lang.String",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_User_canBorrowBooks",
              "value": "public abstract canBorrowBooks(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_user_User_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_user_User_java_lang",
              "value": "java.lang",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.user.User",
        "packageName": "com.sample.user",
        "sourceFile": "User.java",
        "isAbstract": true,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [
          "com.sample.user.Address"
        ],
        "incomingDependencies": []
      }
    },
    {
      "id": "java_com_sample_user_Address",
      "title": "Address",
      "type": "class",
      "sections": [
        {
          "id": "sec_java_com_sample_user_Address_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_com_sample_user_Address_street",
              "value": "private String street",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_user_Address_city",
              "value": "private String city",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_user_Address_state",
              "value": "private String state",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            },
            {
              "id": "field_com_sample_user_Address_zipCode",
              "value": "private String zipCode",
              "icon": "field",
              "metadata": {
                "type": "java.lang.String"
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_user_Address_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_com_sample_user_Address__init_",
              "value": "public Address(String, String, String, String)",
              "icon": "constructor",
              "metadata": {
                "returnType": "void",
                "isConstructor": true
              }
            },
            {
              "id": "method_com_sample_user_Address_getFormattedAddress",
              "value": "public getFormattedAddress(): String",
              "icon": "method",
              "metadata": {
                "returnType": "java.lang.String",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_Address_isValidZipCode",
              "value": "public isValidZipCode(): boolean",
              "icon": "method",
              "metadata": {
                "returnType": "boolean",
                "isConstructor": false
              }
            },
            {
              "id": "method_com_sample_user_Address_updateAddress",
              "value": "public updateAddress(String, String, String, String): void",
              "icon": "method",
              "metadata": {
                "returnType": "void",
                "isConstructor": false
              }
            }
          ]
        },
        {
          "id": "sec_java_com_sample_user_Address_imports",
          "name": "Imports",
          "items": [
            {
              "id": "import_com_sample_user_Address_java_lang",
              "value": "java.lang",
              "icon": "package"
            }
          ]
        }
      ],
      "metadata": {
        "fullName": "com.sample.user.Address",
        "packageName": "com.sample.user",
        "sourceFile": "Address.java",
        "isAbstract": false,
        "isFinal": false,
        "superClassName": "java.lang.Object",
        "interfaces": [],
        "outGoingDependencies": [],
        "incomingDependencies": [
          "com.sample.user.Student",
          "com.sample.user.Faculty",
          "com.sample.user.User"
        ]
      }
    }
  ],
  "edges": [
    {
      "source": "java_com_sample_book_TextBook",
      "target": "java_com_sample_book_Book",
      "type": "inheritance",
      "metadata": {
        "relationship": "extends"
      }
    },
    {
      "source": "java_com_sample_book_TextBook",
      "target": "java_com_sample_book_Course",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_book_BookReview",
      "target": "java_com_sample_user_User",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_book_BookReview",
      "target": "java_com_sample_book_Book",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_book_Department",
      "target": "java_com_sample_user_Faculty",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_book_Department",
      "target": "java_com_sample_book_Course",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_book_LibraryItem",
      "target": "java_com_sample_book_ItemStatus",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_book_Course",
      "target": "java_com_sample_book_TextBook",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_book_Course",
      "target": "java_com_sample_user_Student",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_book_Course",
      "target": "java_com_sample_user_Faculty",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_book_Book",
      "target": "java_com_sample_book_LibraryItem",
      "type": "inheritance",
      "metadata": {
        "relationship": "extends"
      }
    },
    {
      "source": "java_com_sample_book_Book",
      "target": "java_com_sample_book_BookReview",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_Library",
      "target": "java_com_sample_fine_Fine",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_Library",
      "target": "java_com_sample_book_LibraryItem",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_Library",
      "target": "java_com_sample_loan_Loan",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_Library",
      "target": "java_com_sample_user_User",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_Library",
      "target": "java_com_sample_user_Address",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_loan_Loan",
      "target": "java_com_sample_loan_LoanStatus",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_loan_Loan",
      "target": "java_com_sample_book_LibraryItem",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_loan_Loan",
      "target": "java_com_sample_user_User",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_fine_Fine",
      "target": "java_com_sample_loan_Loan",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_fine_Fine",
      "target": "java_com_sample_fine_Payment",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_fine_Payment",
      "target": "java_com_sample_fine_Fine",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_fine_Payment",
      "target": "java_com_sample_fine_PaymentMethod",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_Student",
      "target": "java_com_sample_user_User",
      "type": "inheritance",
      "metadata": {
        "relationship": "extends"
      }
    },
    {
      "source": "java_com_sample_user_Student",
      "target": "java_com_sample_book_Department",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_Student",
      "target": "java_com_sample_book_Course",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_Student",
      "target": "java_com_sample_book_Book",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_Student",
      "target": "java_com_sample_user_Address",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_Faculty",
      "target": "java_com_sample_user_User",
      "type": "inheritance",
      "metadata": {
        "relationship": "extends"
      }
    },
    {
      "source": "java_com_sample_user_Faculty",
      "target": "java_com_sample_book_TextBook",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_Faculty",
      "target": "java_com_sample_book_Department",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_Faculty",
      "target": "java_com_sample_user_Student",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_Faculty",
      "target": "java_com_sample_book_Course",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_Faculty",
      "target": "java_com_sample_book_Book",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_Faculty",
      "target": "java_com_sample_user_Address",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    },
    {
      "source": "java_com_sample_user_User",
      "target": "java_com_sample_user_Address",
      "type": "dependency",
      "metadata": {
        "direction": "outgoing"
      }
    }
  ],
  "metadata": {
    "projectType": "java",
    "projectName": "Java Project",
    "convertedAt": "2025-04-08T00:45:55.496Z",
    "originalFormat": {}
  }
};

// Sample for Django project
export const djangoProjectSample: GraphData = {
  projectName: "Django Project",
  projectType: "django",
  language: "Python",
  version: "1.0.0",
  analyzedAt: new Date().toISOString(),
  nodes: [
    {
      "id": "django_app_auth_test",
      "title": "auth_test",
      "type": "app",
      "sections": [
        {
          "id": "sec_django_app_auth_test_info",
          "name": "App Info",
          "items": [
            {
              "id": "path_auth_test_path",
              "value": "Path: auth_test",
              "icon": "path"
            },
            {
              "id": "project_app_auth_test_project_app",
              "value": "Project app: true",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "path": "auth_test",
        "is_project_app": true,
        "note": "Found by directory structure, not in INSTALLED_APPS"
      }
    },
    {
      "id": "django_app_blog",
      "title": "blog",
      "type": "app",
      "sections": [
        {
          "id": "sec_django_app_blog_info",
          "name": "App Info",
          "items": [
            {
              "id": "path_blog_path",
              "value": "Path: blog",
              "icon": "path"
            },
            {
              "id": "project_app_blog_project_app",
              "value": "Project app: true",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "path": "blog",
        "is_project_app": true,
        "note": "Found by directory structure, not in INSTALLED_APPS"
      }
    },
    {
      "id": "django_app_api",
      "title": "api",
      "type": "app",
      "sections": [
        {
          "id": "sec_django_app_api_info",
          "name": "App Info",
          "items": [
            {
              "id": "path_api_path",
              "value": "Path: api",
              "icon": "path"
            },
            {
              "id": "project_app_api_project_app",
              "value": "Project app: true",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "path": "api",
        "is_project_app": true,
        "note": "Found by directory structure, not in INSTALLED_APPS"
      }
    },
    {
      "id": "django_app_authsys",
      "title": "authsys",
      "type": "app",
      "sections": [
        {
          "id": "sec_django_app_authsys_info",
          "name": "App Info",
          "items": [
            {
              "id": "path_authsys_path",
              "value": "Path: authsys",
              "icon": "path"
            },
            {
              "id": "project_app_authsys_project_app",
              "value": "Project app: true",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "path": "authsys",
        "is_project_app": true,
        "note": "Found by directory structure, not in INSTALLED_APPS"
      }
    },
    {
      "id": "django_model_blog_Tag",
      "title": "Tag",
      "type": "model",
      "sections": [
        {
          "id": "sec_django_model_blog_Tag_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_Tag_name",
              "value": "name: CharField (max_length=20)",
              "icon": "field",
              "metadata": {
                "max_length": 20
              }
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "meta": {}
      }
    },
    {
      "id": "django_model_blog_Post",
      "title": "Post",
      "type": "model",
      "sections": [
        {
          "id": "sec_django_model_blog_Post_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_Post_title",
              "value": "title: CharField (max_length=50)",
              "icon": "field",
              "metadata": {
                "max_length": 50
              }
            },
            {
              "id": "field_Post_content",
              "value": "content: TextField",
              "icon": "field",
              "metadata": {}
            },
            {
              "id": "field_Post_user",
              "value": "user: ForeignKey (on_delete=\"models.CASCADE\", null=true)",
              "icon": "field",
              "metadata": {
                "on_delete": "models.CASCADE",
                "null": true
              }
            },
            {
              "id": "field_Post_liked_by",
              "value": "liked_by: ManyToManyField (related_name=\"liked_posts\", blank=true)",
              "icon": "field",
              "metadata": {
                "related_name": "liked_posts",
                "blank": true
              }
            },
            {
              "id": "field_Post_disliked_by",
              "value": "disliked_by: ManyToManyField (related_name=\"disliked_posts\", blank=true)",
              "icon": "field",
              "metadata": {
                "related_name": "disliked_posts",
                "blank": true
              }
            },
            {
              "id": "field_Post_image",
              "value": "image: ImageField (blank=true)",
              "icon": "field",
              "metadata": {
                "blank": true
              }
            },
            {
              "id": "field_Post_tags",
              "value": "tags: ManyToManyField",
              "icon": "field",
              "metadata": {}
            },
            {
              "id": "field_Post_created",
              "value": "created: DateTimeField (auto_now=true)",
              "icon": "field",
              "metadata": {
                "auto_now": true
              }
            },
            {
              "id": "field_Post_updated",
              "value": "updated: DateTimeField (auto_now=true)",
              "icon": "field",
              "metadata": {
                "auto_now": true
              }
            }
          ]
        },
        {
          "id": "sec_django_model_blog_Post_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_Post___str__",
              "value": "__str__()",
              "icon": "method"
            }
          ]
        },
        {
          "id": "sec_django_model_blog_Post_relationships",
          "name": "Relationships",
          "items": [
            {
              "id": "rel_Post_user",
              "value": "user → User (ForeignKey)",
              "icon": "relationship",
              "metadata": {
                "type": "ForeignKey",
                "related_model": "User",
                "related_name": null
              }
            },
            {
              "id": "rel_Post_liked_by",
              "value": "liked_by → User (as liked_posts) (ManyToManyField)",
              "icon": "relationship",
              "metadata": {
                "type": "ManyToManyField",
                "related_model": "User",
                "related_name": "liked_posts"
              }
            },
            {
              "id": "rel_Post_disliked_by",
              "value": "disliked_by → User (as disliked_posts) (ManyToManyField)",
              "icon": "relationship",
              "metadata": {
                "type": "ManyToManyField",
                "related_model": "User",
                "related_name": "disliked_posts"
              }
            },
            {
              "id": "rel_Post_tags",
              "value": "tags → Tag (ManyToManyField)",
              "icon": "relationship",
              "metadata": {
                "type": "ManyToManyField",
                "related_model": "Tag",
                "related_name": null
              }
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "meta": {}
      }
    },
    {
      "id": "django_model_blog_Comment",
      "title": "Comment",
      "type": "model",
      "sections": [
        {
          "id": "sec_django_model_blog_Comment_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_Comment_content",
              "value": "content: CharField (max_length=200)",
              "icon": "field",
              "metadata": {
                "max_length": 200
              }
            },
            {
              "id": "field_Comment_post",
              "value": "post: ForeignKey (on_delete=\"models.CASCADE\", related_name=\"comments\")",
              "icon": "field",
              "metadata": {
                "on_delete": "models.CASCADE",
                "related_name": "comments"
              }
            },
            {
              "id": "field_Comment_user",
              "value": "user: ForeignKey (on_delete=\"models.CASCADE\")",
              "icon": "field",
              "metadata": {
                "on_delete": "models.CASCADE"
              }
            }
          ]
        },
        {
          "id": "sec_django_model_blog_Comment_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_Comment___str__",
              "value": "__str__()",
              "icon": "method"
            }
          ]
        },
        {
          "id": "sec_django_model_blog_Comment_relationships",
          "name": "Relationships",
          "items": [
            {
              "id": "rel_Comment_post",
              "value": "post → Post (as comments) (ForeignKey)",
              "icon": "relationship",
              "metadata": {
                "type": "ForeignKey",
                "related_model": "Post",
                "related_name": "comments"
              }
            },
            {
              "id": "rel_Comment_user",
              "value": "user → User (ForeignKey)",
              "icon": "relationship",
              "metadata": {
                "type": "ForeignKey",
                "related_model": "User",
                "related_name": null
              }
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "meta": {
          "constraints": [
            null
          ]
        }
      }
    },
    {
      "id": "django_model_authsys_Profile",
      "title": "Profile",
      "type": "model",
      "sections": [
        {
          "id": "sec_django_model_authsys_Profile_fields",
          "name": "Fields",
          "items": [
            {
              "id": "field_Profile_user",
              "value": "user: OneToOneField (on_delete=\"models.CASCADE\")",
              "icon": "field",
              "metadata": {
                "on_delete": "models.CASCADE"
              }
            },
            {
              "id": "field_Profile_bio",
              "value": "bio: TextField (blank=true)",
              "icon": "field",
              "metadata": {
                "blank": true
              }
            }
          ]
        },
        {
          "id": "sec_django_model_authsys_Profile_methods",
          "name": "Methods",
          "items": [
            {
              "id": "method_Profile___str__",
              "value": "__str__()",
              "icon": "method"
            }
          ]
        },
        {
          "id": "sec_django_model_authsys_Profile_relationships",
          "name": "Relationships",
          "items": [
            {
              "id": "rel_Profile_user",
              "value": "user → User (OneToOneField)",
              "icon": "relationship",
              "metadata": {
                "type": "OneToOneField",
                "related_model": "User",
                "related_name": null
              }
            }
          ]
        }
      ],
      "metadata": {
        "app": "authsys",
        "meta": {}
      }
    },
    {
      "id": "django_view_blog_index",
      "title": "index",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_index_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_index_type",
              "value": "Type: function",
              "icon": "info"
            },
            {
              "id": "template_index_template",
              "value": "Template: blog/index.html",
              "icon": "template"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": "blog/index.html"
      }
    },
    {
      "id": "django_view_blog_create_post",
      "title": "create_post",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_create_post_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_create_post_type",
              "value": "Type: function",
              "icon": "info"
            },
            {
              "id": "template_create_post_template",
              "value": "Template: blog/newpost.html",
              "icon": "template"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": "blog/newpost.html"
      }
    },
    {
      "id": "django_view_blog_delete_post",
      "title": "delete_post",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_delete_post_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_delete_post_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_blog_update_post",
      "title": "update_post",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_update_post_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_update_post_type",
              "value": "Type: function",
              "icon": "info"
            },
            {
              "id": "template_update_post_template",
              "value": "Template: blog/updatepost.html",
              "icon": "template"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": "blog/updatepost.html"
      }
    },
    {
      "id": "django_view_blog_SearchPost",
      "title": "SearchPost",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_SearchPost_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_SearchPost_type",
              "value": "Type: class",
              "icon": "info"
            },
            {
              "id": "template_SearchPost_template",
              "value": "Template: blog/index.html",
              "icon": "template"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "class",
        "template": "blog/index.html"
      }
    },
    {
      "id": "django_view_blog_detail",
      "title": "detail",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_detail_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_detail_type",
              "value": "Type: function",
              "icon": "info"
            },
            {
              "id": "template_detail_template",
              "value": "Template: blog/detail.html",
              "icon": "template"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": "blog/detail.html"
      }
    },
    {
      "id": "django_view_blog_add_comment",
      "title": "add_comment",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_add_comment_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_add_comment_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_blog_like_post",
      "title": "like_post",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_like_post_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_like_post_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_blog_dislike_post",
      "title": "dislike_post",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_dislike_post_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_dislike_post_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_blog_user_profile",
      "title": "user_profile",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_user_profile_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_user_profile_type",
              "value": "Type: function",
              "icon": "info"
            },
            {
              "id": "template_user_profile_template",
              "value": "Template: blog/profile.html",
              "icon": "template"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": "blog/profile.html"
      }
    },
    {
      "id": "django_view_blog_get",
      "title": "get",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_get_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_get_type",
              "value": "Type: function",
              "icon": "info"
            },
            {
              "id": "template_get_template",
              "value": "Template: blog/index.html",
              "icon": "template"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": "blog/index.html"
      }
    },
    {
      "id": "django_view_blog_items",
      "title": "items",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_items_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_items_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_blog_item_title",
      "title": "item_title",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_item_title_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_item_title_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_blog_item_description",
      "title": "item_description",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_item_description_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_item_description_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_blog_item_link",
      "title": "item_link",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_blog_item_link_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_item_link_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "blog",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_api_api_overview",
      "title": "api_overview",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_api_api_overview_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_api_overview_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "api",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_api_list_blog",
      "title": "list_blog",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_api_list_blog_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_list_blog_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "api",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_api_blog_detail",
      "title": "blog_detail",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_api_blog_detail_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_blog_detail_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "api",
        "type": "function",
        "template": null
      }
    },
    {
      "id": "django_view_authsys_index",
      "title": "index",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_authsys_index_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_index_type",
              "value": "Type: function",
              "icon": "info"
            },
            {
              "id": "template_index_template",
              "value": "Template: authsys/index.html",
              "icon": "template"
            }
          ]
        }
      ],
      "metadata": {
        "app": "authsys",
        "type": "function",
        "template": "authsys/index.html"
      }
    },
    {
      "id": "django_view_authsys_register_user",
      "title": "register_user",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_authsys_register_user_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_register_user_type",
              "value": "Type: function",
              "icon": "info"
            },
            {
              "id": "template_register_user_template",
              "value": "Template: authsys/register.html",
              "icon": "template"
            }
          ]
        }
      ],
      "metadata": {
        "app": "authsys",
        "type": "function",
        "template": "authsys/register.html"
      }
    },
    {
      "id": "django_view_authsys_logout_user",
      "title": "logout_user",
      "type": "view",
      "sections": [
        {
          "id": "sec_django_view_authsys_logout_user_info",
          "name": "View Info",
          "items": [
            {
              "id": "type_logout_user_type",
              "value": "Type: function",
              "icon": "info"
            }
          ]
        }
      ],
      "metadata": {
        "app": "authsys",
        "type": "function",
        "template": null
      }
    }
  ],
  "edges": [
    {
      "source": "django_app_blog",
      "target": "django_model_blog_Tag",
      "type": "contains",
      "metadata": {
        "relationship": "app_model"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_model_blog_Post",
      "type": "contains",
      "metadata": {
        "relationship": "app_model"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_model_blog_Comment",
      "type": "contains",
      "metadata": {
        "relationship": "app_model"
      }
    },
    {
      "source": "django_app_authsys",
      "target": "django_model_authsys_Profile",
      "type": "contains",
      "metadata": {
        "relationship": "app_model"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_index",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_create_post",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_delete_post",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_update_post",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_SearchPost",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_detail",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_add_comment",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_like_post",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_dislike_post",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_user_profile",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_get",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_items",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_item_title",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_item_description",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_blog",
      "target": "django_view_blog_item_link",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_api",
      "target": "django_view_api_api_overview",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_api",
      "target": "django_view_api_list_blog",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_api",
      "target": "django_view_api_blog_detail",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_authsys",
      "target": "django_view_authsys_index",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_authsys",
      "target": "django_view_authsys_register_user",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_app_authsys",
      "target": "django_view_authsys_logout_user",
      "type": "contains",
      "metadata": {
        "relationship": "app_view"
      }
    },
    {
      "source": "django_model_blog_Post",
      "target": "django_model_blog_Tag",
      "type": "manytomanyfield",
      "metadata": {
        "field_name": "tags",
        "related_name": null
      }
    },
    {
      "source": "django_model_blog_Comment",
      "target": "django_model_blog_Post",
      "type": "foreignkey",
      "metadata": {
        "field_name": "post",
        "related_name": "comments"
      }
    }
  ],
  "metadata": {
    "projectType": "django",
    "projectName": "djanger",
    "convertedAt": "2025-04-08T00:14:32.475Z",
    "originalFormat": {
      "projectName": "djanger",
      "totalApps": 4,
      "totalModels": 4,
      "totalViews": 21,
      "analyzedAt": "2025-03-06T15:31:20.626188",
      "django": {
        "version": "5.1.2",
        "debug": true
      }
    }
  }
};