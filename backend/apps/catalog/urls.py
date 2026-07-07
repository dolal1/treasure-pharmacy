from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import BranchListView, ProductListView, ServiceCategoryListView, ServiceViewSet

router = DefaultRouter()
router.register("services", ServiceViewSet, basename="service")

urlpatterns = [
    path("branches/", BranchListView.as_view(), name="branch-list"),
    path("service-categories/", ServiceCategoryListView.as_view(), name="service-category-list"),
    path("products/", ProductListView.as_view(), name="product-list"),
    *router.urls,
]
