from django.urls import path

from .views import ContentBlockListView

urlpatterns = [
    path("content/", ContentBlockListView.as_view(), name="content-list"),
]
