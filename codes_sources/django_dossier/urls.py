from django.contrib import admin
from django.urls import path, re_path
from django_project.views import ask_view, react_app_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/ask/', ask_view),
    re_path(r'^.*$', react_app_view),  # toutes les autres routes → React
]

