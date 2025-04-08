#!/usr/bin/env python3
import os
import sys
import json
import re
import ast
import importlib
import inspect
from pathlib import Path
from collections import defaultdict
import datetime
# Remove django import to avoid dependency
# import django
# from django.conf import settings

class DjangoProjectParser:
    def __init__(self, project_path):
        self.project_path = Path(project_path)
        self.project_name = self.project_path.name
        self.apps = []
        self.models = []
        self.views = []
        self.urls = []
        self.forms = []
        self.serializers = []
        self.dependencies = []
        self.external_dependencies = []
        self.settings_data = {}
        self.middleware = []
        self.templates = []
        self.static_files = []
        self.errors = {"parsing": [], "validation": []}
        self.django_version = "Unknown"
        self.debug_mode = None
        
        # Initialize Django settings
        self._setup_django()
        
    def _setup_django(self):
        """Set up Django environment to access project settings"""
        try:
            # Find settings module
            settings_files = list(self.project_path.glob("**/settings.py"))
            if not settings_files:
                self.errors["parsing"].append("Could not find settings.py file")
                return
                
            # Get the settings module path
            settings_file = settings_files[0]
            
            # Parse settings file directly instead of importing it
            self._parse_settings_file(settings_file)
            
            # Try to determine Django version
            try:
                import django
                self.django_version = django.get_version()
            except ImportError:
                self.django_version = "Unknown (Django not installed)"
                
        except Exception as e:
            self.errors["parsing"].append(f"Error setting up Django environment: {str(e)}")
    
    def _parse_settings_file(self, settings_file):
        """Parse Django settings file directly using AST"""
        try:
            with open(settings_file, "r") as f:
                file_content = f.read()
            
            tree = ast.parse(file_content)
            
            # Extract settings values
            installed_apps = []
            middleware = []
            databases = {}
            static_url = None
            media_url = None
            templates = []
            root_urlconf = None
            debug_mode = None
            
            for node in ast.walk(tree):
                if isinstance(node, ast.Assign):
                    for target in node.targets:
                        if isinstance(target, ast.Name):
                            # Extract INSTALLED_APPS
                            if target.id == "INSTALLED_APPS":
                                if isinstance(node.value, ast.List):
                                    for item in node.value.elts:
                                        if isinstance(item, ast.Str):
                                            installed_apps.append(item.s)
                                        elif isinstance(item, ast.Constant) and isinstance(item.value, str):
                                            installed_apps.append(item.value)
                            
                            # Extract MIDDLEWARE
                            elif target.id == "MIDDLEWARE":
                                if isinstance(node.value, ast.List):
                                    for item in node.value.elts:
                                        if isinstance(item, ast.Str):
                                            middleware.append(item.s)
                                        elif isinstance(item, ast.Constant) and isinstance(item.value, str):
                                            middleware.append(item.value)
                            
                            # Extract STATIC_URL
                            elif target.id == "STATIC_URL":
                                if isinstance(node.value, ast.Str):
                                    static_url = node.value.s
                                elif isinstance(node.value, ast.Constant) and isinstance(node.value.value, str):
                                    static_url = node.value.value
                            
                            # Extract MEDIA_URL
                            elif target.id == "MEDIA_URL":
                                if isinstance(node.value, ast.Str):
                                    media_url = node.value.s
                                elif isinstance(node.value, ast.Constant) and isinstance(node.value.value, str):
                                    media_url = node.value.value
                            
                            # Extract ROOT_URLCONF
                            elif target.id == "ROOT_URLCONF":
                                if isinstance(node.value, ast.Str):
                                    root_urlconf = node.value.s
                                elif isinstance(node.value, ast.Constant) and isinstance(node.value.value, str):
                                    root_urlconf = node.value.value
                            
                            # Extract DEBUG
                            elif target.id == "DEBUG":
                                if isinstance(node.value, ast.NameConstant):
                                    debug_mode = node.value.value
                                elif isinstance(node.value, ast.Constant):
                                    debug_mode = node.value.value
                            
                            # Extract DATABASES (simplified)
                            elif target.id == "DATABASES":
                                if isinstance(node.value, ast.Dict):
                                    for i, key in enumerate(node.value.keys):
                                        if (isinstance(key, ast.Str) and key.s == "default") or \
                                           (isinstance(key, ast.Constant) and key.value == "default"):
                                            databases["default"] = {"engine": "Unknown"}
                                            if isinstance(node.value.values[i], ast.Dict):
                                                for j, db_key in enumerate(node.value.values[i].keys):
                                                    if (isinstance(db_key, ast.Str) and db_key.s == "ENGINE") or \
                                                       (isinstance(db_key, ast.Constant) and db_key.value == "ENGINE"):
                                                        if isinstance(node.value.values[i].values[j], ast.Str):
                                                            databases["default"]["engine"] = node.value.values[i].values[j].s
                                                        elif isinstance(node.value.values[i].values[j], ast.Constant) and isinstance(node.value.values[i].values[j].value, str):
                                                            databases["default"]["engine"] = node.value.values[i].values[j].value
            
            # Extract TEMPLATES (simplified)
            for node in ast.walk(tree):
                if isinstance(node, ast.Assign):
                    for target in node.targets:
                        if isinstance(target, ast.Name) and target.id == "TEMPLATES":
                            if isinstance(node.value, ast.List):
                                for item in node.value.elts:
                                    if isinstance(item, ast.Dict):
                                        template = {}
                                        for i, key in enumerate(item.keys):
                                            if isinstance(key, ast.Str) or isinstance(key, ast.Constant):
                                                key_name = key.s if isinstance(key, ast.Str) else key.value
                                                if key_name == "BACKEND":
                                                    if isinstance(item.values[i], ast.Str):
                                                        template["backend"] = item.values[i].s
                                                    elif isinstance(item.values[i], ast.Constant) and isinstance(item.values[i].value, str):
                                                        template["backend"] = item.values[i].value
                                                elif key_name == "DIRS":
                                                    template["dirs"] = []
                                        templates.append(template)
            
            # Store settings data
            self.settings_data = {
                "installed_apps": installed_apps,
                "middleware": middleware,
                "databases": databases,
                "static_url": static_url,
                "media_url": media_url,
                "templates": templates,
                "root_urlconf": root_urlconf,
            }
            
            # Store debug mode
            self.debug_mode = debug_mode
            
            # Extract middleware
            self.middleware = [
                {
                    "name": middleware_path.split(".")[-1],
                    "path": middleware_path,
                }
                for middleware_path in middleware
            ]
        except Exception as e:
            self.errors["parsing"].append(f"Error parsing settings file: {str(e)}")
    
    def parse_project(self):
        """Parse the entire Django project"""
        self._find_apps()
        self._parse_apps()
        self._find_dependencies()
        return self._generate_output()
    
    def _find_apps(self):
        """Find all Django apps in the project"""
        try:
            # Get installed apps from settings
            installed_apps = self.settings_data.get("installed_apps", [])
            
            # Filter out Django and third-party apps
            project_apps = []
            for app in installed_apps:
                if not app.startswith("django."):
                    if "." in app:
                        # Handle apps with config classes (e.g., 'blog.apps.BlogConfig')
                        if app.endswith("Config"):
                            app_name = app.split(".")[-2]
                        else:
                            app_name = app.split(".")[-1]
                    else:
                        # Handle simple app names (e.g., 'blog')
                        app_name = app
                    
                    project_apps.append(app_name)
            
            # Find app directories
            for app_name in project_apps:
                app_dir = self.project_path / app_name
                if app_dir.exists() and app_dir.is_dir():
                    self.apps.append({
                        "name": app_name,
                        "path": str(app_dir.relative_to(self.project_path)),
                        "is_project_app": True
                    })
                    
            # If no apps were found, try to find apps by directory structure
            if not self.apps:
                for item in self.project_path.iterdir():
                    if item.is_dir() and not item.name.startswith('.') and not item.name.startswith('_'):
                        # Check if it looks like a Django app (has models.py, views.py, etc.)
                        if any((item / f).exists() for f in ['models.py', 'views.py', 'urls.py', 'apps.py']):
                            self.apps.append({
                                "name": item.name,
                                "path": item.name,
                                "is_project_app": True,
                                "note": "Found by directory structure, not in INSTALLED_APPS"
                            })
                            
        except Exception as e:
            self.errors["parsing"].append(f"Error finding apps: {str(e)}")
    
    def _parse_apps(self):
        """Parse each app to extract models, views, urls, etc."""
        for app in self.apps:
            app_path = self.project_path / app["path"]
            
            # Parse models
            self._parse_models(app["name"], app_path)
            
            # Parse views
            self._parse_views(app["name"], app_path)
            
            # Parse urls
            self._parse_urls(app["name"], app_path)
            
            # Parse forms
            self._parse_forms(app["name"], app_path)
            
            # Parse serializers (for REST API)
            self._parse_serializers(app["name"], app_path)
    
    def _parse_models(self, app_name, app_path):
        """Parse models.py to extract model definitions"""
        models_file = app_path / "models.py"
        if not models_file.exists():
            return
        
        try:
            with open(models_file, "r") as f:
                file_content = f.read()
            
            tree = ast.parse(file_content)
            
            for node in ast.walk(tree):
                if isinstance(node, ast.ClassDef):
                    # Check if it's a Django model (inherits from models.Model)
                    is_model = False
                    for base in node.bases:
                        if isinstance(base, ast.Attribute) and base.attr == "Model":
                            is_model = True
                            break
                    
                    if is_model:
                        model = {
                            "name": node.name,
                            "app": app_name,
                            "fields": [],
                            "methods": [],
                            "meta": {},
                            "relationships": []
                        }
                        
                        # Extract fields and methods
                        for item in node.body:
                            if isinstance(item, ast.Assign):
                                for target in item.targets:
                                    if isinstance(target, ast.Name):
                                        field_name = target.id
                                        field_type = None
                                        field_attrs = {}
                                        
                                        # Try to extract field type and attributes
                                        if isinstance(item.value, ast.Call):
                                            if isinstance(item.value.func, ast.Attribute):
                                                field_type = item.value.func.attr
                                            
                                            # Extract field attributes
                                            for keyword in item.value.keywords:
                                                field_attrs[keyword.arg] = self._extract_value(keyword.value)
                                        
                                        if field_type:
                                            field = {
                                                "name": field_name,
                                                "type": field_type,
                                                "attributes": field_attrs
                                            }
                                            
                                            # Check for relationships
                                            if field_type in ["ForeignKey", "OneToOneField", "ManyToManyField"]:
                                                rel_model = None
                                                if item.value.args and isinstance(item.value.args[0], ast.Name):
                                                    rel_model = item.value.args[0].id
                                                
                                                relationship = {
                                                    "field_name": field_name,
                                                    "type": field_type,
                                                    "related_model": rel_model,
                                                    "related_name": field_attrs.get("related_name")
                                                }
                                                model["relationships"].append(relationship)
                                            
                                            model["fields"].append(field)
                            
                            elif isinstance(item, ast.FunctionDef):
                                method = {
                                    "name": item.name,
                                    "parameters": [arg.arg for arg in item.args.args if arg.arg != "self"]
                                }
                                model["methods"].append(method)
                            
                            # Extract Meta class
                            elif isinstance(item, ast.ClassDef) and item.name == "Meta":
                                for meta_item in item.body:
                                    if isinstance(meta_item, ast.Assign):
                                        for target in meta_item.targets:
                                            if isinstance(target, ast.Name):
                                                meta_name = target.id
                                                meta_value = self._extract_value(meta_item.value)
                                                model["meta"][meta_name] = meta_value
                        
                        self.models.append(model)
        except Exception as e:
            self.errors["parsing"].append(f"Error parsing models in {app_name}: {str(e)}")
    
    def _parse_views(self, app_name, app_path):
        """Parse views.py to extract view definitions"""
        views_file = app_path / "views.py"
        if not views_file.exists():
            return
        
        try:
            with open(views_file, "r") as f:
                file_content = f.read()
            
            tree = ast.parse(file_content)
            
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef):
                    # Function-based view
                    view = {
                        "name": node.name,
                        "app": app_name,
                        "type": "function",
                        "parameters": [arg.arg for arg in node.args.args],
                        "decorators": [],
                        "models_used": [],
                        "template": None
                    }
                    
                    # Extract decorators
                    for decorator in node.decorator_list:
                        if isinstance(decorator, ast.Call) and isinstance(decorator.func, ast.Name):
                            view["decorators"].append(decorator.func.id)
                        elif isinstance(decorator, ast.Name):
                            view["decorators"].append(decorator.id)
                    
                    # Try to find template usage
                    for item in ast.walk(node):
                        if isinstance(item, ast.Call) and isinstance(item.func, ast.Name) and item.func.id == "render":
                            if len(item.args) > 1 and isinstance(item.args[1], ast.Str):
                                view["template"] = item.args[1].s
                    
                    # Try to find model usage
                    for item in ast.walk(node):
                        if isinstance(item, ast.Attribute) and isinstance(item.value, ast.Name):
                            for model in self.models:
                                if item.value.id == model["name"] or (
                                    item.value.id == model["name"].lower() + "_set"
                                ):
                                    if model["name"] not in view["models_used"]:
                                        view["models_used"].append(model["name"])
                    
                    self.views.append(view)
                
                elif isinstance(node, ast.ClassDef):
                    # Class-based view
                    is_view = False
                    parent_views = []
                    
                    # Check if it's a Django view (inherits from View or a view mixin)
                    for base in node.bases:
                        if isinstance(base, ast.Name):
                            if base.id == "View" or "View" in base.id:
                                is_view = True
                                parent_views.append(base.id)
                    
                    if is_view:
                        view = {
                            "name": node.name,
                            "app": app_name,
                            "type": "class",
                            "parent_views": parent_views,
                            "methods": [],
                            "models_used": [],
                            "template": None
                        }
                        
                        # Extract methods
                        for item in node.body:
                            if isinstance(item, ast.FunctionDef):
                                method = {
                                    "name": item.name,
                                    "parameters": [arg.arg for arg in item.args.args if arg.arg != "self"]
                                }
                                view["methods"].append(method)
                                
                                # Try to find template usage
                                for method_item in ast.walk(item):
                                    if isinstance(method_item, ast.Call) and isinstance(method_item.func, ast.Name) and method_item.func.id == "render":
                                        if len(method_item.args) > 1 and isinstance(method_item.args[1], ast.Str):
                                            view["template"] = method_item.args[1].s
                        
                        # Try to find model usage
                        for item in ast.walk(node):
                            if isinstance(item, ast.Attribute) and isinstance(item.value, ast.Name):
                                for model in self.models:
                                    if item.value.id == model["name"] or (
                                        item.value.id == model["name"].lower() + "_set"
                                    ):
                                        if model["name"] not in view["models_used"]:
                                            view["models_used"].append(model["name"])
                        
                        self.views.append(view)
        except Exception as e:
            self.errors["parsing"].append(f"Error parsing views in {app_name}: {str(e)}")
    
    def _parse_urls(self, app_name, app_path):
        """Parse urls.py to extract URL patterns"""
        urls_file = app_path / "urls.py"
        if not urls_file.exists():
            return
        
        try:
            with open(urls_file, "r") as f:
                file_content = f.read()
            
            tree = ast.parse(file_content)
            
            # Find urlpatterns list
            for node in ast.walk(tree):
                if isinstance(node, ast.Assign):
                    for target in node.targets:
                        if isinstance(target, ast.Name) and target.id == "urlpatterns":
                            if isinstance(node.value, ast.List):
                                for item in node.value.elts:
                                    if isinstance(item, ast.Call):
                                        url_pattern = {
                                            "app": app_name,
                                            "path": None,
                                            "view": None,
                                            "name": None,
                                            "include": None
                                        }
                                        
                                        # Extract path
                                        if item.args and isinstance(item.args[0], ast.Str):
                                            url_pattern["path"] = item.args[0].s
                                        
                                        # Extract view or include
                                        if len(item.args) > 1:
                                            if isinstance(item.args[1], ast.Call) and isinstance(item.args[1].func, ast.Name) and item.args[1].func.id == "include":
                                                if item.args[1].args and isinstance(item.args[1].args[0], ast.Str):
                                                    url_pattern["include"] = item.args[1].args[0].s
                                            elif isinstance(item.args[1], ast.Attribute):
                                                url_pattern["view"] = item.args[1].attr
                                            elif isinstance(item.args[1], ast.Name):
                                                url_pattern["view"] = item.args[1].id
                                        
                                        # Extract name
                                        for keyword in item.keywords:
                                            if keyword.arg == "name" and isinstance(keyword.value, ast.Str):
                                                url_pattern["name"] = keyword.value.s
                                        
                                        self.urls.append(url_pattern)
        except Exception as e:
            self.errors["parsing"].append(f"Error parsing urls in {app_name}: {str(e)}")
    
    def _parse_forms(self, app_name, app_path):
        """Parse forms.py to extract form definitions"""
        forms_file = app_path / "forms.py"
        if not forms_file.exists():
            return
        
        try:
            with open(forms_file, "r") as f:
                file_content = f.read()
            
            tree = ast.parse(file_content)
            
            for node in ast.walk(tree):
                if isinstance(node, ast.ClassDef):
                    # Check if it's a Django form
                    is_form = False
                    parent_forms = []
                    
                    for base in node.bases:
                        if isinstance(base, ast.Name):
                            if base.id in ["Form", "ModelForm"]:
                                is_form = True
                                parent_forms.append(base.id)
                    
                    if is_form:
                        form = {
                            "name": node.name,
                            "app": app_name,
                            "parent_forms": parent_forms,
                            "fields": [],
                            "meta": {}
                        }
                        
                        # Extract fields and meta
                        for item in node.body:
                            if isinstance(item, ast.Assign):
                                for target in item.targets:
                                    if isinstance(target, ast.Name):
                                        field_name = target.id
                                        field_type = None
                                        
                                        # Try to extract field type
                                        if isinstance(item.value, ast.Call):
                                            if isinstance(item.value.func, ast.Attribute):
                                                field_type = item.value.func.attr
                                            elif isinstance(item.value.func, ast.Name):
                                                field_type = item.value.func.id
                                        
                                        if field_type:
                                            form["fields"].append({
                                                "name": field_name,
                                                "type": field_type
                                            })
                            
                            # Extract Meta class
                            elif isinstance(item, ast.ClassDef) and item.name == "Meta":
                                for meta_item in item.body:
                                    if isinstance(meta_item, ast.Assign):
                                        for target in meta_item.targets:
                                            if isinstance(target, ast.Name):
                                                meta_name = target.id
                                                meta_value = self._extract_value(meta_item.value)
                                                form["meta"][meta_name] = meta_value
                        
                        self.forms.append(form)
        except Exception as e:
            self.errors["parsing"].append(f"Error parsing forms in {app_name}: {str(e)}")
    
    def _parse_serializers(self, app_name, app_path):
        """Parse serializers.py to extract serializer definitions (for REST API)"""
        serializers_file = app_path / "serializers.py"
        if not serializers_file.exists():
            return
        
        try:
            with open(serializers_file, "r") as f:
                file_content = f.read()
            
            tree = ast.parse(file_content)
            
            for node in ast.walk(tree):
                if isinstance(node, ast.ClassDef):
                    # Check if it's a Django REST Framework serializer
                    is_serializer = False
                    parent_serializers = []
                    
                    for base in node.bases:
                        if isinstance(base, ast.Name) and "Serializer" in base.id:
                            is_serializer = True
                            parent_serializers.append(base.id)
                        elif isinstance(base, ast.Attribute) and "Serializer" in base.attr:
                            is_serializer = True
                            parent_serializers.append(base.attr)
                    
                    if is_serializer:
                        serializer = {
                            "name": node.name,
                            "app": app_name,
                            "parent_serializers": parent_serializers,
                            "fields": [],
                            "meta": {}
                        }
                        
                        # Extract fields and meta
                        for item in node.body:
                            if isinstance(item, ast.Assign):
                                for target in item.targets:
                                    if isinstance(target, ast.Name):
                                        field_name = target.id
                                        field_type = None
                                        
                                        # Try to extract field type
                                        if isinstance(item.value, ast.Call):
                                            if isinstance(item.value.func, ast.Attribute):
                                                field_type = item.value.func.attr
                                            elif isinstance(item.value.func, ast.Name):
                                                field_type = item.value.func.id
                                        
                                        if field_type:
                                            serializer["fields"].append({
                                                "name": field_name,
                                                "type": field_type
                                            })
                            
                            # Extract Meta class
                            elif isinstance(item, ast.ClassDef) and item.name == "Meta":
                                for meta_item in item.body:
                                    if isinstance(meta_item, ast.Assign):
                                        for target in meta_item.targets:
                                            if isinstance(target, ast.Name):
                                                meta_name = target.id
                                                meta_value = self._extract_value(meta_item.value)
                                                serializer["meta"][meta_name] = meta_value
                        
                        self.serializers.append(serializer)
        except Exception as e:
            self.errors["parsing"].append(f"Error parsing serializers in {app_name}: {str(e)}")
    
    def _find_dependencies(self):
        """Find dependencies between components"""
        # Model to model dependencies (through relationships)
        for model in self.models:
            for relationship in model["relationships"]:
                if relationship["related_model"]:
                    self.dependencies.append({
                        "source": model["name"],
                        "source_app": model["app"],
                        "target": relationship["related_model"],
                        "type": "model_relationship",
                        "relationship_type": relationship["type"],
                        "field_name": relationship["field_name"]
                    })
        
        # View to model dependencies
        for view in self.views:
            for model_name in view["models_used"]:
                self.dependencies.append({
                    "source": view["name"],
                    "source_app": view["app"],
                    "target": model_name,
                    "type": "view_uses_model"
                })
        
        # URL to view dependencies
        for url in self.urls:
            if url["view"]:
                self.dependencies.append({
                    "source": url["path"],
                    "source_app": url["app"],
                    "target": url["view"],
                    "type": "url_maps_to_view",
                    "url_name": url["name"]
                })
        
        # Form to model dependencies (for ModelForm)
        for form in self.forms:
            if "ModelForm" in form["parent_forms"] and "model" in form["meta"]:
                self.dependencies.append({
                    "source": form["name"],
                    "source_app": form["app"],
                    "target": form["meta"]["model"],
                    "type": "form_uses_model"
                })
        
        # Serializer to model dependencies
        for serializer in self.serializers:
            if "model" in serializer["meta"]:
                self.dependencies.append({
                    "source": serializer["name"],
                    "source_app": serializer["app"],
                    "target": serializer["meta"]["model"],
                    "type": "serializer_uses_model"
                })
    
    def _extract_value(self, node):
        """Extract value from AST node"""
        if isinstance(node, ast.Str):
            return node.s
        elif isinstance(node, ast.Num):
            return node.n
        elif isinstance(node, ast.NameConstant):
            return node.value
        elif isinstance(node, ast.Constant):  # Python 3.8+
            return node.value
        elif isinstance(node, ast.List):
            return [self._extract_value(item) for item in node.elts]
        elif isinstance(node, ast.Dict):
            return {self._extract_value(key): self._extract_value(value) for key, value in zip(node.keys, node.values)}
        elif isinstance(node, ast.Name):
            return node.id
        elif isinstance(node, ast.Attribute):
            return f"{node.value.id}.{node.attr}" if isinstance(node.value, ast.Name) else None
        return None
    
    def _generate_output(self):
        """Generate JSON output"""
        return {
            "metadata": {
                "projectName": self.project_name,
                "totalApps": len(self.apps),
                "totalModels": len(self.models),
                "totalViews": len(self.views),
                "analyzedAt": datetime.datetime.now().isoformat(),
                "django": {
                    "version": self.django_version,
                    "debug": self.debug_mode
                }
            },
            "apps": self.apps,
            "models": self.models,
            "views": self.views,
            "urls": self.urls,
            "forms": self.forms,
            "serializers": self.serializers,
            "middleware": self.middleware,
            "dependencies": self.dependencies,
            "settings": {
                "databases": self.settings_data.get("databases", {}),
                "static_url": self.settings_data.get("static_url"),
                "media_url": self.settings_data.get("media_url"),
                "templates": self.settings_data.get("templates", [])
            },
            "errors": self.errors
        }

def main():
    if len(sys.argv) < 3:
        print("Usage: python django_parser.py <path_to_django_project> <output_file_path>")
        sys.exit(1)
    
    project_path = sys.argv[1]
    output_file_path = sys.argv[2]
    
    parser = DjangoProjectParser(project_path)
    result = parser.parse_project()
    
    # Print brief summary to stdout
    print(f"Project: {result['metadata']['projectName']}")
    print(f"Total Apps: {result['metadata']['totalApps']}")
    print(f"Total Models: {result['metadata']['totalModels']}")
    print(f"Total Views: {result['metadata']['totalViews']}")
    
    # Save to the specified output file
    with open(output_file_path, "w") as f:
        json.dump(result, f, indent=2, default=str)
    
    print(f"Django project structure saved to {output_file_path}")

if __name__ == "__main__":
    main()