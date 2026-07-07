from rest_framework import generics, viewsets

from .models import Branch, Product, Service, ServiceCategory
from .serializers import (
    BranchSerializer,
    ProductSerializer,
    ServiceCategorySerializer,
    ServiceSerializer,
)


class BranchListView(generics.ListAPIView):
    queryset = Branch.objects.filter(is_active=True)
    serializer_class = BranchSerializer


class ServiceCategoryListView(generics.ListAPIView):
    queryset = ServiceCategory.objects.prefetch_related("services")
    serializer_class = ServiceCategorySerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True).select_related("category")
    serializer_class = ServiceSerializer
    lookup_field = "slug"


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
