from rest_framework import serializers

from .models import Branch, Product, Service, ServiceCategory


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["id", "name", "address", "phone", "maps_embed_url"]


class ServiceSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Service
        fields = [
            "id",
            "slug",
            "name",
            "category",
            "category_name",
            "short_description",
            "description",
            "price",
            "image",
        ]


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="get_category_display", read_only=True)
    in_stock = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "category", "price", "in_stock", "image"]

    def get_in_stock(self, obj) -> bool:
        return obj.stock_qty > 0


class ServiceCategorySerializer(serializers.ModelSerializer):
    services = serializers.SerializerMethodField()

    class Meta:
        model = ServiceCategory
        fields = ["id", "slug", "name", "blurb", "services"]

    def get_services(self, obj) -> list[dict]:
        active = [s for s in obj.services.all() if s.is_active]
        return ServiceSerializer(active, many=True, context=self.context).data
