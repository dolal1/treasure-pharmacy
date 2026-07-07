from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Branch, Product, Service, ServiceCategory


@admin.register(Branch)
class BranchAdmin(ModelAdmin):
    list_display = ["name", "address", "phone", "is_active"]
    list_editable = ["is_active"]
    search_fields = ["name", "address"]


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(ModelAdmin):
    list_display = ["name", "slug", "ordering"]
    prepopulated_fields = {"slug": ["name"]}


@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ["name", "category", "price", "is_active"]
    list_editable = ["price", "is_active"]
    list_filter = ["category", "is_active"]
    search_fields = ["name", "short_description"]
    prepopulated_fields = {"slug": ["name"]}


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ["name", "category", "price", "stock_qty", "is_active"]
    list_editable = ["price", "stock_qty", "is_active"]
    list_filter = ["category", "is_active"]
    search_fields = ["name"]
