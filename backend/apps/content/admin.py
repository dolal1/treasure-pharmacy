from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import ContentBlock


@admin.register(ContentBlock)
class ContentBlockAdmin(ModelAdmin):
    list_display = ["key", "label", "text", "updated_at"]
    search_fields = ["key", "label", "text"]
    readonly_fields = ["key", "updated_at"]

    def has_add_permission(self, request):
        # Blocks are provisioned by the developer; admins edit their content.
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser
